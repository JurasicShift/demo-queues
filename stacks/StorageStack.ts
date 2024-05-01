import { StackContext, Table, WebSocketApi } from "sst/constructs";

export function StorageStack({ stack }: StackContext) {

  const table = new Table(stack, "Orders", {
    fields: {
      order_ref: "string",
      order_item: "number",
      surname: "string",
      first_name: "string",
      banking: "number",
      email: "string",
      createdAt: "string",
      save_data: "string",
    },
    primaryIndex: { partitionKey: "order_ref", sortKey: "order_item" },
  });

  const socket = new WebSocketApi(stack, "Api", {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      $connect: "packages/functions/src/sockets/connect.main",
      $disconnect: "packages/functions/src/sockets/disconnect.main",
      sendmessage: "packages/functions/src/sockets/sendMessage.main"
    }
  });

  stack.addOutputs({
    ApiEndpoint: socket.url,
  })

  return {
    table,
    socket
  };
}


// curl -X POST \
// -H 'Content-Type: application/json' \
// -d '{
//   "order_ref": "hhhy76767jf7y",
//   "order_item": 1676090900906,
//   "surname": "Bedpan",
//   "first_name": "Brian",
//   "banking": 47758757587,
//   "email": "jethro@tull.com",
//   "save_data": "false"
// }' \
// https://idh9hih0d5.execute-api.us-east-1.amazonaws.com/order
