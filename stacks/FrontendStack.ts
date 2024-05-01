import { StackContext, StaticSite, use } from "sst/constructs";
import { OrderApiStack } from "./OrderApi";
import { StorageStack } from "./StorageStack";

export function FrontendStack({ stack, app }: StackContext) {
    const { api } = use(OrderApiStack);
    const { socket } = use(StorageStack);

    const site = new StaticSite(stack, "SvelteSite", {
        path: "packages/functions/frontend",
        buildCommand: "npm run build",
        buildOutput: "dist",

        environment: {
            VITE_API_URL: api.url,
            VITE_REGION: app.region,
            VITE_SOCKET_URL: socket.url
        }
    });

    stack.addOutputs({
        SiteUrl: site.url
    });
}