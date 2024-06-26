import { OrderApiStack } from "./OrderApi";
import { Cognito, StackContext, use } from "sst/constructs";

export function AuthStack({ stack, app }: StackContext) {
    const { api } = use(OrderApiStack);
    const auth = new Cognito(stack, "Auth", {
        login: ["email"],
    });

    auth.attachPermissionsForAuthUsers(stack, [
        api,
    ]);

    stack.addOutputs({
        Region: app.region,
        UserPoolId: auth.userPoolId,
        UserPoolClientId: auth.userPoolClientId,
        IdentityPoolId: auth.cognitoIdentityPoolId,
    });

    return {
        auth,
    };
}