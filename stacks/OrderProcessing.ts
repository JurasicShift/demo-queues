import { StackContext, Queue, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";
import { OrderDispatchStack } from "./OrderDispatch";
import { OrderErrorsStack } from "./OrderErrors";

export function OrderProcessingStack({ stack }: StackContext) {

  const { table, socket, socketTable, } = use(StorageStack);
  const { queue: dispatchQueue } = use(OrderDispatchStack);
  const { queue: errorQueue } = use(OrderErrorsStack);

  const queue = new Queue(stack, "OrderProcessingQueue", {
    consumer: "packages/functions/src/consumers/orderProcessing.main",
  });

  queue.bind([table, socket, socketTable, dispatchQueue, errorQueue]);

  return {
    queue
  }
}