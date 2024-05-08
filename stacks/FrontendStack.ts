import { StackContext, StaticSite, use } from "sst/constructs";
import { OrderApiStack } from "./OrderApi";
import { StorageStack } from "./StorageStack";
import { AuthStack } from "./AuthStack";

export function FrontendStack({ stack, app }: StackContext) {
    const { api } = use(OrderApiStack);
    const { socket } = use(StorageStack);
    const { auth } = use(AuthStack);

    const site = new StaticSite(stack, "SvelteSite", {
        path: "packages/functions/frontend",
        buildCommand: "npm run build",
        buildOutput: "dist",

        environment: {
            VITE_API_URL: api.url,
            VITE_REGION: app.region,
            VITE_SOCKET_URL: socket.url,
            VITE_USER_POOL_ID: auth.userPoolId,
            VITE_USER_POOL_CLIENT_ID: auth.userPoolClientId,
            VITE_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId || "",
        }
    });

    stack.addOutputs({
        SiteUrl: site.url
    });
}