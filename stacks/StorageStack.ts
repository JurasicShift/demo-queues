import { StackContext, Table } from "sst/constructs";

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

  return {
    table,
  };
}


// curl -X POST \
// -H 'Content-Type: application/json' \
// -d '{
//   "order_ref": "nnhcripes48ty",
//   "order_item": 3959872,
//   "surname": "JJ",
//   "first_name": "Giles",
//   "banking": 47758757587,
//   "email": "jethro@tull.com",
//   "save_data": "false"
// }' \
// https://idh9hih0d5.execute-api.us-east-1.amazonaws.com/order
