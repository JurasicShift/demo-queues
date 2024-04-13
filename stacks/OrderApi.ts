import { StackContext, Api, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";
import { OrderNoticeStack } from "./OrderNotice";
import { OrderErrorsStack } from "./OrderErrors";


export function OrderApiStack({ stack }: StackContext) {

  const { table } = use(StorageStack);
  const { queue: noticeQueue } = use(OrderNoticeStack);
  const { queue: errorQueue } = use(OrderErrorsStack);
const api = new Api(stack, "Api", {
  defaults: {
    function: {
      bind: [table, noticeQueue, errorQueue],
    },
  },
  routes: {
    "POST /order": "packages/functions/src/lambdas/orderApiLambda.main",
  },
});

stack.addOutputs({
  ApiEndpoint: api.url,
});
}