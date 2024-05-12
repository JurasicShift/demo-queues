import AWS from "aws-sdk";
import { Table } from "sst/node/table";
import { Queue } from "sst/node/queue";
import { DynamoDBDocType } from "../../types";
import { socketMessage } from "src/sockets/sendMessage";
import { messageObjFactory, dataAvailable, shippingVerification, socketObjFactory } from "../../helpers/helpers";
import handler from "../../../core/src/handler";
import { customError } from "helpers/error";

const sqs = new AWS.SQS();
const tableUrl = Table.OrdersDB.tableName;


export const main = await handler(tableUrl, async (dbData: DynamoDBDocType) => {

    const dataChecked = dataAvailable(dbData);
    let verified;

    if (dataChecked) {
        verified = shippingVerification(8);
    }

    if (verified) {
        console.log(`ORDER SUCCESSFULLY PROCESSED FOR ORDER REF: ${dbData.order_ref}`);
        socketMessage(socketObjFactory("Order Processed", dbData.order_ref));
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
        return customError("Shipping failed. Out of stock", "order_processing");
    }

});

