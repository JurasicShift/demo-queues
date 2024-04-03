import { Table } from "sst/node/table";
import dynamoDb from "../../core/src/dynamodb";
import { MessageType, DynamoDBDocType } from "../types";
import { consumerRtnObj } from "helpers/helpers";

export async function orderNotification(msg: MessageType) {

    const params = {
        TableName: Table.Orders.tableName,
        Key: { order_ref: msg.order_ref, order_item: msg.order_item }
    }
    try {
         const { Item } = await dynamoDb.get(params);
         const document = Item as DynamoDBDocType;
        
         console.log(`ORDER RECIEVED\n NOTIFICATION SENT TO: ${document.first_name}\n AT ${document.email}.\n ORDER REFERENCE NUMBER: ${document.order_ref}`)
            return consumerRtnObj("order_notification", true);
        } catch (error) {
        console.log("error: ", error);
    }

}