import { OrderApiStack } from "./OrderApi";
// import * as iam from "aws-cdk-lib/aws-iam";
import { StorageStack } from "./StorageStack";
import { Cognito, StackContext, use } from "sst/constructs";

export function AuthStack({ stack, app }: StackContext) {
    const { api } = use(OrderApiStack);
    const { socket } = use(StorageStack);

    const auth = new Cognito(stack, "Auth", {
        login: ["email"],
    });

    auth.attachPermissionsForAuthUsers(stack, [
        api,
        socket,
        // new iam.PolicyStatement({
        //     actions: ["*"],
        //     effect: iam.Effect.ALLOW,
        //     resources: ["*"
        //     ],
        // }),
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