import AWS from "aws-sdk";
import { Table } from "sst/node/table";
import { Queue } from "sst/node/queue";
import { DynamoDBDocType } from "../../types";
import handler from "../../../core/src/handler";
import { dataAvailable, messageObjFactory, bankingVerification } from "../../helpers/helpers";
import { customError } from "../../helpers/error";

const sqs = new AWS.SQS();
const tableUrl = Table.Orders.tableName;

export const main = await handler(tableUrl, async (dbData: DynamoDBDocType) => {
 
    const dataChecked = dataAvailable(dbData);

    const verified = bankingVerification();

    const log = verified ? `BANKING DETAILS CONFIRMED FOR:\n ${dbData.first_name} ${dbData.surname}\n WITH AC NUMBER ${dbData.banking}.` : `INSUFFICIANT FUNDS:\n ${dbData.first_name} ${dbData.surname}\n WITH AC NUMBER ${dbData.banking}.`
   
    console.log(log);

    if(verified) {
        const msgData = await messageObjFactory("order_processing", "pending", dbData);

        const msgObj = {
            QueueUrl: Queue.OrderProcessingQueue.queueUrl,
            ...msgData
        }
        const notify = await sqs
            .sendMessage(msgObj)
            .promise();
        return notify;
    } else {
          return customError("Banking verification failed", "order_billing");
    }

});
