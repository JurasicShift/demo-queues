import { SSTConfig } from "sst";
import { OrderApiStack } from "./stacks/OrderApi";
import { StorageStack } from "./stacks/StorageStack";
import { OrderNoticeStack } from "./stacks/OrderNotice";
import { OrderBillingStack } from "./stacks/OrderBilling";
import { OrderProcessingStack } from "./stacks/OrderProcessing";
import { OrderDispatchStack } from "./stacks/OrderDispatch";
import { OrderErrorsStack } from "./stacks/OrderErrors";
import { FrontendStack } from "./stacks/FrontendStack";
import { AuthStack } from "./stacks/AuthStack";

export default {
  config(_input) {
    return {
      name: "queue",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(StorageStack).stack(OrderErrorsStack).stack(OrderDispatchStack).stack(OrderProcessingStack).stack(OrderBillingStack).stack(OrderNoticeStack).stack(OrderApiStack).stack(FrontendStack).stack(AuthStack);
  }
} satisfies SSTConfig;
