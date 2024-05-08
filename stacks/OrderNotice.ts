import { StackContext, Queue, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";
import { OrderBillingStack } from "./OrderBilling";
import { OrderErrorsStack } from "./OrderErrors";
// import { AuthStack } from "./AuthStack";

export function OrderNoticeStack({ stack }: StackContext) {

  const { table } = use(StorageStack);
  // const { auth } = use(AuthStack);
  const { queue: billingQueue } = use(OrderBillingStack);
  const { queue: errorQueue } = use(OrderErrorsStack);

  const queue = new Queue(stack, "OrderNoticeQueue", {
    consumer: "packages/functions/src/consumers/orderNotice.main",
  });

  // auth.attachPermissionsForAuthUsers(stack, [queue]);

  queue.bind([table, billingQueue, errorQueue]);
  return {
    queue
  }
}