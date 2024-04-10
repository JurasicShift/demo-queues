import AWS from "aws-sdk";
import { Table } from "sst/node/table";
import { Queue } from "sst/node/queue";
import { SQSEvent, } from "aws-lambda";
import dynamoDb from "../../core/src/dynamodb";
import {  DynamoDBDocType } from "../types";
import { consumerRtnObj, messageObjFactory, proceedVerification } from "helpers/helpers";
const sqs = new AWS.SQS();

export async function main(event: SQSEvent) {
 console.log("hit billing...");
const records: any[] = event.Records;

const msg = JSON.parse(records[0].body);

    const params = {
        TableName: Table.Orders.tableName,
        Key: { order_ref: msg.order_ref, order_item: msg.order_item }
    }
    try {
         const { Item } = await dynamoDb.get(params);
         const document = Item as DynamoDBDocType;
        
         const verified = proceedVerification();
    
         const log = verified ? `BANKING DETAILS CONFIRMED FOR:\n ${document.first_name} ${document.surname}\n WITH AC NUMBER ${document.banking}.` : `INSUFFICIANT FUNDS:\n ${document.first_name} ${document.surname}\n WITH AC NUMBER ${document.banking}.`
         // const status = verified ? true : false;

         console.log(log);
        
         
         return consumerRtnObj("order_billing", true);
        } catch (error) {
        console.log("error: ", error);
    }

}