import { SQSEvent, } from "aws-lambda";
import { orderNotification } from "./orderNotification";
import { orderBilling } from "./orderBilling";
import { orderProcessing } from "./orderProcessing";



export async function main(event: SQSEvent) {

  const records: any[] = event.Records;

  for (let record of records) {

    const messageObj = JSON.parse(record.body);
    let call;

    switch (messageObj.type) {
      case "order_notification":
        call = await orderNotification(messageObj);
        break;
      case "order_billing":
        call = await orderBilling(messageObj);
        break;
      case "order_processing":
        call = await orderProcessing(messageObj);
        break;
      default:
        console.warn(`Unknown message type: ${messageObj.type}`);
        break;
    }
    console.log("call: ", call);
    return call;
  }

  // return {};
}