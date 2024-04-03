import { StackContext, Queue, Api, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";



export function OrderApiStack({ stack }: StackContext) {

  const { table } = use(StorageStack);

   const queue = new Queue(stack, "Queue", {
    consumer: "packages/functions/src/consumer.main",
  });

  queue.bind([table]);

const api = new Api(stack, "Api", {
  defaults: {
    function: {
      bind: [queue, table],
    },
  },
  routes: {
    "POST /order": "packages/functions/src/lambda.main",
  },
});

stack.addOutputs({
  ApiEndpoint: api.url,
});
}