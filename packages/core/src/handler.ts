import { SQSEvent } from "aws-lambda";
import dynamoDb from "./dynamodb";
import { DynamoDBDocType, ConsumerType, ConsumerRtnType } from "../../functions/types";
import { Queue } from "sst/node/queue";

export default async function handler( table: string, consumer: ConsumerType):Promise<ConsumerRtnType> {
    return async (event: SQSEvent) => {
        const records: any[] = event.Records;
        let results: object[] = [];
        console.log("QUEUE IN HANDLER: ", Queue);
        for (let record of records) {
            const msg = JSON.parse(record.body);

            const params = {
                TableName: table,
                Key: { order_ref: msg.order_ref, order_item: msg.order_item }
            }
            let body, statusCode, document;

            try {

                const { Item } = await dynamoDb.get(params);
                document = Item as DynamoDBDocType || {};
                body = await consumer(document);
                statusCode = 200;

            } catch (error: any) {
                statusCode = error.statusCode;
                console.error(error);
                body ={
                    error_msg: error.message,
                    error_location: error.location
                }
            }
            results = [...results, {body, statusCode}]
            console.log("RESULTS: ", results);
        }
    }
}