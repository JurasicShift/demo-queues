import AWS from "aws-sdk";
import { Table } from "sst/node/table";
import { DynamoDBDocType } from "../../types";
import { socketMessage } from "src/sockets/sendMessage";
import { dataAvailable, socketObjFactory } from "../../helpers/helpers";
import handler from "../../../core/src/handler";
import { customError } from "helpers/error";

const sqs = new AWS.SQS();
const tableUrl = Table.OrdersDB.tableName;


export const main = await handler(tableUrl, async (dbData: DynamoDBDocType) => {

    const dataChecked = dataAvailable(dbData);

    if (dataChecked) {
        socketMessage(socketObjFactory("Order Dispatched", dbData.order_ref));
        console.log(`ORDER DISPATCHED\n NOTIFICATION SENT TO: ${dbData.first_name}\n AT ${dbData.email}.\n ORDER REFERENCE: ${dbData.order_ref}`)
        return dbData;
    } else {
        return customError("Dispatch notification failed", "order_dispatch");
    }
});

