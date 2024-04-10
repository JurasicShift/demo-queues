import { SSTConfig } from "sst";
import { OrderApiStack } from "./stacks/OrderApiStack";
import { StorageStack } from "./stacks/StorageStack";
import { OrderNoticeStack } from "./stacks/OrderNoticeStack";
import { OrderBillingStack } from "./stacks/OrderBillingStack";

export default {
  config(_input) {
    return {
      name: "queue",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(StorageStack).stack(OrderBillingStack).stack(OrderNoticeStack).stack(OrderApiStack);
  }
} satisfies SSTConfig;
