import { StackContext, Queue, Api } from "sst/constructs";

export function ExampleStack({ stack }: StackContext) {

  const queue = new Queue(stack, "Queue", {
    consumer: "packages/functions/src/consumer.main",
  });

const api = new Api(stack, "Api", {
  defaults: {
    function: {
      bind: [queue],
    },
  },
  routes: {
    "POST /": "packages/functions/src/lambda.main",
  },
});

stack.addOutputs({
  ApiEndpoint: api.url,
});
}