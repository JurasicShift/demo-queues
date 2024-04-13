import AWS from "aws-sdk";
import { Table } from "sst/node/table";
import {  DynamoDBDocType } from "../../types";
import { dataAvailable } from "../../helpers/helpers";
import handler from "../../../core/src/handler";

const sqs = new AWS.SQS();
const tableUrl = Table.Orders.tableName;

 
export const main = await handler(tableUrl, async (dbData: DynamoDBDocType) => {
    
    const dataChecked = dataAvailable(dbData);
 
    if(dataChecked) {
        console.log(`ORDER DISPATCHED\n NOTIFICATION SENT TO: ${dbData.first_name}\n AT ${dbData.email}.\n ORDER REFERENCE: ${dbData.order_ref}`)
        return dbData;
    } else {
        throw new Error("Dispatch notification failed");
    }      
});

