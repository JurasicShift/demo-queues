import AWS from "aws-sdk";
import { APIGatewayProxyEvent } from "aws-lambda";
import { Queue } from "sst/node/queue";
import { Table } from "sst/node/table";
import { createdAt, messageObjFactory } from "../../helpers/helpers";
import dynamoDb from "../../../core/src/dynamodb";

const sqs = new AWS.SQS();

export async function main(event: APIGatewayProxyEvent) {

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
        return {
            statusCode: 404,
            body: JSON.stringify({ error: true }),
        };
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
    } catch (error) {
        let message;
        if (error instanceof Error) {
            message = error.message;
        } else {
            message = String(error);
        }
        return {
            statusCode: 500,
            body: JSON.stringify({ error: message }),
        };
    }
}

