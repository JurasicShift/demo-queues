import { StackContext, Queue, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function OrderErrorsStack({ stack }: StackContext) {

  const { table, socket, socketTable } = use(StorageStack);

  const queue = new Queue(stack, "OrderErrorsQueue", {
    consumer: "packages/functions/src/consumers/orderErrors.main",
  });

  queue.bind([table, socket, socketTable]);

  return {
    queue
  }
}