import AWS from "aws-sdk";
import { Table } from "sst/node/table";
import dynamoDb from "../../core/src/dynamodb";
import { MessageType, DynamoDBDocType } from "../types";
import { proceedVerification, consumerRtnObj, messageObjFactory } from "helpers/helpers";

const sqs = new AWS.SQS();

export async function orderBilling(msg: MessageType) {

    if(msg.status === "pending") {
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
           // =======================================================================
            //THE BELLOW DOESN'T WORK
            // RETURNS Error: Cannot use Queue.Queue. Please make sure it is bound to this function.
                await sqs
                .sendMessage(verified ? messageObjFactory("order_processing", "pending", document) : messageObjFactory("order_processing", "failed", document))
                .promise();
            
            //==========================================================================

            // return consumerRtnObj("order_billing", status);
        } catch (error) {
            console.log("error: ", error);
        }
    } else {
        // handle lack of funds
        console.log("hit order_billing:failed");
    }

} 

