import { StackContext, Queue, use} from "sst/constructs";
import { StorageStack } from "./StorageStack";
import { OrderBillingStack } from "./OrderBillingStack";

export function OrderNoticeStack({ stack }: StackContext) {

    const { table } = use(StorageStack);
    const { queue: billingQueue } = use(OrderBillingStack);

    const queue = new Queue(stack, "OrderNoticeQueue", {
        consumer: "packages/functions/src/orderNoticeConsumer.main",
      });

      queue.bind([table, billingQueue]);

      return {
        queue
      }
}