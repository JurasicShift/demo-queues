import { StackContext, Api, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";
import { OrderNoticeStack } from "./OrderNotice";
import { OrderErrorsStack } from "./OrderErrors";
import { AuthStack } from "./AuthStack";

export function OrderApiStack({ stack }: StackContext) {
  // const { auth } = use(AuthStack);
  const { table } = use(StorageStack);
  const { queue: noticeQueue } = use(OrderNoticeStack);
  const { queue: errorQueue } = use(OrderErrorsStack);
  const api = new Api(stack, "Api", {
    defaults: {
      authorizer: "iam",
      function: {
        bind: [table, noticeQueue, errorQueue],
      },
    },
    routes: {
      "POST /order": "packages/functions/src/lambdas/orderApiLambda.main",
    },
  });
  // auth.attachPermissionsForAuthUsers(stack, [
  //   api,
  // ]);
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api
  }
}