import { SQSEvent } from "aws-lambda";
import { socketMessage } from "src/sockets/sendMessage";
import { socketObjFactory } from "../../helpers/helpers";

export const main = async (event: SQSEvent) => {

    const records: any[] = event.Records;
    for (let record of records) {
        const msg = JSON.parse(record.body);
        socketMessage(socketObjFactory(msg.error_msg, msg.error_location, 500));
        console.log(`ORDER ERROR \n INITIATE ORDER AGAIN FROM:, ${msg.error_location}\n, OR NOTIFIY CUSTOMER OF ORDER FAILURE, "${msg.error_msg}"\n, AT: , ${msg.email}`);
    }
}