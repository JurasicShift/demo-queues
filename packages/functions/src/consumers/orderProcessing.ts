import AWS from "aws-sdk";
import { Table } from "sst/node/table";
import { Queue } from "sst/node/queue";
import {  DynamoDBDocType } from "../../types";
import {  messageObjFactory, dataAvailable, shippingVerification } from "../../helpers/helpers";
import handler from "../../../core/src/handler";

const sqs = new AWS.SQS();
const tableUrl = Table.Orders.tableName;

 
export const main = await handler(tableUrl, async (dbData: DynamoDBDocType) => {
    
    const dataChecked = dataAvailable(dbData);
    let verified;

    if(dataChecked) {
         verified = shippingVerification(9);
    }

    if(verified) {
        console.log(`ORDER SUCCESSFULLY PROCESSED FOR ORDER REF: ${dbData.order_ref}`);
        
        const msgData = await messageObjFactory("order_dispatch", "pending", dbData);
        
        const msgObj = {
                         QueueUrl: Queue.OrderDispatchQueue.queueUrl,
                         ...msgData
                     }
                     const notify = await sqs
                        .sendMessage(msgObj)
                        .promise(); 
                        return notify;
    } else {
        throw new Error("Shipping failed. Out of stock");
    }     
        
});

