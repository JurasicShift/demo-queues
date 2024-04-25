import { StackContext, StaticSite, use } from "sst/constructs";
import { OrderApiStack } from "./OrderApi";

export function FrontendStack({ stack, app }: StackContext) {
    const { api } = use(OrderApiStack);

    const site = new StaticSite(stack, "SvelteSite", {
        path: "packages/functions/frontend",
        buildCommand: "npm run build",
        buildOutput: "dist",

        environment: {
            VITE_API_URL: api.url,
            VITE_REGION: app.region
        }
    });

    stack.addOutputs({
        SiteUrl: site.url
    });
}