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