import AWS from "aws-sdk";
import { SQSEvent } from "aws-lambda";
import dynamoDb from "./dynamodb";
import { DynamoDBDocType, ConsumerType, ConsumerRtnType, } from "../../functions/types";
import { Queue } from "sst/node/queue";
import { messageObjFactory } from "../../functions/helpers/helpers";

const sqs = new AWS.SQS();

export default async function handler(table: string, consumer: ConsumerType): Promise<ConsumerRtnType> {

    return async (event: SQSEvent) => {

        const records: any[] = event.Records;
        let results: any[] = [];

        for (let record of records) {
            const msg = JSON.parse(record.body);

            const params = {
                TableName: table,
                Key: { user_id: msg.user_id, order_ref: msg.order_ref }
            }
            let body, statusCode, document;

            try {

                const { Item } = await dynamoDb.get(params);
                document = Item as DynamoDBDocType || {};
                body = await consumer(document);
                statusCode = 200;

            } catch (error: any) {
                statusCode = error.statusCode;
                body = {
                    error_msg: error.message,
                    error_location: error.location,
                    ...document
                }
            }
            results = [...results, { body, statusCode }]
        }

        for (let result of results) {
            if (result.statusCode === 500) {

                const msgData = await messageObjFactory("order_errors", "error", result.body);

                const msgObj = {
                    QueueUrl: Queue.OrderErrorsQueue.queueUrl,
                    ...msgData
                }
                const notify = await sqs
                    .sendMessage(msgObj)
                    .promise();
            }
            results = results.filter(item => item.body.order_ref !== result.body.order_ref);

        }
    }
}