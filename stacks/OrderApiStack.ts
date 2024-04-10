import { StackContext, Api, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";
import { OrderNoticeStack } from "./OrderNoticeStack";



export function OrderApiStack({ stack }: StackContext) {

  const { table } = use(StorageStack);
  const { queue } = use(OrderNoticeStack);

const api = new Api(stack, "Api", {
  defaults: {
    function: {
      bind: [queue, table],
    },
  },
  routes: {
    "POST /order": "packages/functions/src/orderApiLambda.main",
  },
});

stack.addOutputs({
  ApiEndpoint: api.url,
});
}