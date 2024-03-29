import { SSTConfig } from "sst";
import { OrderApiStack } from "./stacks/OrderApiStack";
import { StorageStack } from "./stacks/StorageStack";

export default {
  config(_input) {
    return {
      name: "queue",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(StorageStack).stack(OrderApiStack);
  }
} satisfies SSTConfig;
