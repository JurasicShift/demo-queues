import AWS from "aws-sdk";
import { APIGatewayProxyEvent } from "aws-lambda";
import { Queue } from "sst/node/queue";
import { Table } from "sst/node/table";
import { createdAt, messageObjFactory, socketObjFactory } from "../../helpers/helpers";
import { socketMessage } from "../sockets/sendMessage";
import dynamoDb from "../../../core/src/dynamodb";
import { customError } from "helpers/error";

const sqs = new AWS.SQS();

export async function main(event: APIGatewayProxyEvent) {

    const cognitoId = event.requestContext.authorizer?.iam.cognitoIdentity.identityId;

    let data = {
        user_id: "",
        order_ref: "",
        order_item: 0,
        surname: "",
        first_name: "",
        banking: 0,
        email: "",
        createdAt: "",
        save_data: "",
    };

    if (event.body != null) {
        data = {
            ...JSON.parse(event.body),
            user_id: cognitoId,
            createdAt: createdAt(),
        }

        socketMessage(socketObjFactory("Order Processing", data.order_ref));
    } else {
        return customError("Data unavailable", "order_api")
    }

    const params = {
        TableName: Table.OrdersDB.tableName,
        Item: {
            ...data,
        }
    }

    try {
        const dataBase = await dynamoDb.put(params);

        if (!dataBase) throw customError("Database not responding", "order_api");

        const msgData = await messageObjFactory("order_notification", "pending", data);

        const msgObj = {
            QueueUrl: Queue.OrderNoticeQueue.queueUrl,
            ...msgData
        }
        const notify = await sqs
            .sendMessage(msgObj)
            .promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ statusCode: 200, msg: "Order recieved", order_ref: data.order_ref }),
        };
    } catch (error: any) {

        let body = {
            error_msg: error.message,
            error_location: error.location,
            ...data
        }

        const msgData = await messageObjFactory("order_errors", "error", body);
        socketMessage(socketObjFactory(error.message, error.location, 500));
        const msgObj = {
            QueueUrl: Queue.OrderErrorsQueue.queueUrl,
            ...msgData
        }
        const notify = await sqs
            .sendMessage(msgObj)
            .promise();
        return notify;
    }
}

