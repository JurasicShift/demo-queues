import { StackContext, Table, WebSocketApi } from "sst/constructs";

export function StorageStack({ stack }: StackContext) {

  const table = new Table(stack, "OrdersDB", {
    fields: {
      user_id: "string",
      order_ref: "string",
      order_item: "number",
      surname: "string",
      first_name: "string",
      banking: "number",
      email: "string",
      createdAt: "string",
      save_data: "string",
    },
    primaryIndex: { partitionKey: "user_id", sortKey: "order_ref" },
  });

  const socketTable = new Table(stack, "SocketTable", {
    fields: {
      id: "string",
    },
    primaryIndex: { partitionKey: "id" },
  })

  const socket = new WebSocketApi(stack, "Api", {
    // authorizer: "iam",
    defaults: {
      function: {
        bind: [table, socketTable],
      },
    },
    routes: {
      $connect: "packages/functions/src/sockets/connect.main",
      $disconnect: "packages/functions/src/sockets/disconnect.main",
      $default: "packages/functions/src/sockets/default.main",
      sendmessage: "packages/functions/src/sockets/sendMessage.main"
    }
  });

  stack.addOutputs({
    ApiEndpoint: socket.url,
  })

  return {
    table,
    socketTable,
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

// aws cognito-idp sign-up \
//   --region us-east-1 \
//   --client-id 4v76hv8aknkvpp67ptj67eitv0 \
//   --username admin@example.com \
//   --password Passw0rd!

// aws cognito-idp admin-confirm-sign-up \
//   --region us-east-1 \
//   --user-pool-id us-east-1_d68KymcTC  \
//   --username admin@example.com