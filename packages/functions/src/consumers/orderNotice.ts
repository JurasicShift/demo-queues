import AWS from "aws-sdk";
import { Table } from "sst/node/table";
import { Queue } from "sst/node/queue";
import { DynamoDBDocType } from "../../types";
import { messageObjFactory, dataAvailable } from "../../helpers/helpers";
import handler from "../../../core/src/handler";
import { customError } from "helpers/error";

const sqs = new AWS.SQS();
const tableUrl = Table.OrdersDB.tableName;


export const main = await handler(tableUrl, async (dbData: DynamoDBDocType) => {

    const dataChecked = dataAvailable(dbData);
    if (dataChecked) {
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
    } else {
        return customError("Notification failed. Data not avialable", "order_notification");
    }



});

