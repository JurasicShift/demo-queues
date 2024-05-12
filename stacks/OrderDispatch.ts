import { StackContext, Queue, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";
import { OrderErrorsStack } from "./OrderErrors";

export function OrderDispatchStack({ stack }: StackContext) {

  const { table, socket, socketTable, } = use(StorageStack);
  const { queue: errorQueue } = use(OrderErrorsStack);

  const queue = new Queue(stack, "OrderDispatchQueue", {
    consumer: "packages/functions/src/consumers/orderDispatch.main",
  });

  queue.bind([table, socket, socketTable, errorQueue]);

  return {
    queue
  }
}