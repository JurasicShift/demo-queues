import AWS from "aws-sdk";
import { APIGatewayProxyEvent } from "aws-lambda";
import { Queue } from "sst/node/queue";
import { Table } from "sst/node/table";
import { createdAt } from "helpers/helpers";
import dynamoDb from "../../core/src/dynamodb";

const sqs = new AWS.SQS();

// const dynamoDb = new AWS.DynamoDB.DocumentClient();

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
        await dynamoDb.put(params);

    const notify = await sqs
            .sendMessage({
                QueueUrl: Queue.Queue.queueUrl,
                MessageBody: JSON.stringify({
                    order_notification: "pending",
                    order_ref: data.order_ref,
                }),
            })
            .promise()
            .then(() => {
               return sqs.sendMessage({
                    QueueUrl: Queue.Queue.queueUrl,
                    MessageBody: JSON.stringify({
                        billing: "pending",
                        order_ref: data.order_ref,
                    }),
                })
                .promise()
                .then(() => {
                    console.log("Both order_notification and billing messages sent");
                }) 
            });

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

