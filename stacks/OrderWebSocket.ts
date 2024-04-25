import { StackContext, use, WebSocketApi } from "sst/constructs";
import { StorageStack } from "./StorageStack";
import { OrderNoticeStack } from "./OrderNotice";
import { OrderErrorsStack } from "./OrderErrors";

export function OrderWebSocket({ stack }: StackContext) {

    const { table } = use(StorageStack);
    const { queue: noticeQueue } = use(OrderNoticeStack);
    const { queue: errorQueue } = use(OrderErrorsStack);

    const api = new WebSocketApi(stack, "Api", {
        defaults: {
            function: {
                bind: [table, noticeQueue, errorQueue],
            },
        },
        routes: {
            order: "packages/functions/src/lambdas/order.main"
        }
    });

    stack.addOutputs({
        ApiEndpoint: api.url,
    });

    return {
        api
    }

}