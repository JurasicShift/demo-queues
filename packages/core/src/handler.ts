import { SQSEvent, } from "aws-lambda";
import dynamoDb from "./dynamodb";
import { DynamoDBDocType } from "../../functions/types";

type ConsumerType = (dbData: DynamoDBDocType) => Promise<object>;

export default async function handler( table: string, consumer: ConsumerType) {
    console.log("hit handler ...");
    return async function (event: SQSEvent) {
        console.log("hit handler return");
        const records: any[] = event.Records;
        let results: object[] = [];
        
        for (let record of records) {
            const msg = JSON.parse(record.body);

            const params = {
                TableName: table,
                Key: { order_ref: msg.order_ref, order_item: msg.order_item }
            }
            let body, statusCode;

            try {

                const { Item } = await dynamoDb.get(params);
                const document = Item as DynamoDBDocType;
                body = consumer(document);
                statusCode = 200;

            } catch (error) {
                statusCode = 500;
                console.error(error);
                body = JSON.stringify({
                    error: error instanceof Error ? error.message : String(error),
                });
            }
            results = [...results, {body, statusCode}]
             console.log("RETURNED FROM HANDLER, BODY: ", body, "AND STATUSCODE: ", statusCode); 

        }
    }
}