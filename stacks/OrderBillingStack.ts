import { StackContext, Queue, use} from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function OrderBillingStack({ stack }: StackContext) {

    const { table } = use(StorageStack);


    const queue = new Queue(stack, "OrderBillingQueue", {
        consumer: "packages/functions/src/orderBillingConsumer.main",
      });

      queue.bind([table]);

      return {
        queue
      }
}