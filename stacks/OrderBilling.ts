import { StackContext, Queue, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";
import { OrderProcessingStack } from "./OrderProcessing";
import { OrderErrorsStack } from "./OrderErrors";

export function OrderBillingStack({ stack }: StackContext) {

  const { table, socket, socketTable } = use(StorageStack);
  const { queue: processingQueue } = use(OrderProcessingStack);
  const { queue: errorQueue } = use(OrderErrorsStack);

  const queue = new Queue(stack, "OrderBillingQueue", {
    consumer: "packages/functions/src/consumers/orderBilling.main",
  });

  queue.bind([table, socket, socketTable, processingQueue, errorQueue]);

  return {
    queue
  }
}