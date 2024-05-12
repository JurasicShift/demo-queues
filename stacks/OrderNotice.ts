import { StackContext, Queue, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";
import { OrderBillingStack } from "./OrderBilling";
import { OrderErrorsStack } from "./OrderErrors";


export function OrderNoticeStack({ stack }: StackContext) {

  const { table, socket, socketTable, } = use(StorageStack);
  const { queue: billingQueue } = use(OrderBillingStack);
  const { queue: errorQueue } = use(OrderErrorsStack);

  const queue = new Queue(stack, "OrderNoticeQueue", {
    consumer: "packages/functions/src/consumers/orderNotice.main",
  });


  queue.bind([table, socket, socketTable, billingQueue, errorQueue]);
  return {
    queue
  }
}