import { SQSEvent } from "aws-lambda";

export const main = async (event: SQSEvent) => {
  
    const records: any[] = event.Records;
    for (let record of records) {
        const msg = JSON.parse(record.body);
        console.log(`ORDER ERROR \n INITIATE ORDER AGAIN FROM:, ${msg.error_location}\n, OR NOTIFIY CUSTOMER OF ORDER FAILURE, "${msg.error_msg}"\n, AT: , ${msg.email}`);
    }
}