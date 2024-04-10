import AWS from "aws-sdk";
import { Table } from "sst/node/table";
import { Queue } from "sst/node/queue";
import { SQSEvent, } from "aws-lambda";
import dynamoDb from "../../core/src/dynamodb";
import {  DynamoDBDocType } from "../types";
import { consumerRtnObj, messageObjFactory } from "helpers/helpers";
import handler from "../../core/src/handler";

const sqs = new AWS.SQS();
const tableUrl = Table.Orders.tableName;

async function orderNotice(dbData: DynamoDBDocType) {
    console.log("hit order notice...");
        if(!dbData) {
            throw new Error("Data not available");
        }
        console.log(`ORDER RECIEVED\n NOTIFICATION SENT TO: ${dbData.first_name}\n AT ${dbData.email}.\n ORDER REFERENCE: ${dbData.order_ref}`)
        
        const msgData = await messageObjFactory("order_billing", "pending", dbData);
        
        const msgObj = {
                         QueueUrl: Queue.OrderBillingQueue.queueUrl,
                         ...msgData
                     }
                     const notify = await sqs
                        .sendMessage(msgObj)
                        .promise(); 
                        return notify;
        
} 

export const main = handler(tableUrl, orderNotice);

