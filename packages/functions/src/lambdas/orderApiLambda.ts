import AWS from "aws-sdk";
import { APIGatewayProxyEvent } from "aws-lambda";
import { Queue } from "sst/node/queue";
import { Table } from "sst/node/table";
import { createdAt, messageObjFactory } from "../../helpers/helpers";
import dynamoDb from "../../../core/src/dynamodb";
import { customError } from "helpers/error";

const sqs = new AWS.SQS();

export async function main(event: APIGatewayProxyEvent) {
    console.log("event body:", event.body);
    let data = {
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
        data = JSON.parse(event.body);
    } else {
        return customError("Data unavailable", "order_api")
    }

    const params = {
        TableName: Table.Orders.tableName,
        Item: {
            order_ref: data.order_ref,
            order_item: data.order_item,
            surname: data.surname,
            first_name: data.first_name,
            banking: data.banking,
            email: data.email,
            createdAt: createdAt(),
            save_data: data.save_data,
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
            body: JSON.stringify({ order: true }),
        };
    } catch (error: any) {

        let body = {
            error_msg: error.message,
            error_location: error.location,
            ...data
        }

        const msgData = await messageObjFactory("order_errors", "error", body);

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

