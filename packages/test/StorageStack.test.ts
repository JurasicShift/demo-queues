import { it, describe } from "vitest";
import { initProject } from "sst/project.js";
import { App, getStack } from "sst/constructs";
import { StorageStack } from "../../stacks/StorageStack";
import { Template } from "aws-cdk-lib/assertions";

describe("Test StorageStack", () => {
    it("Test Stack Resources", async () => {

        await initProject({});

        const app = new App({ mode: "deploy" });

        app.stack(StorageStack);

        const template = Template.fromStack(getStack(StorageStack));

        template.hasResourceProperties("AWS::DynamoDB::Table", {
            BillingMode: "PAY_PER_REQUEST",
            PointInTimeRecoverySpecification: {
                PointInTimeRecoveryEnabled: true,
            },
        })
    });
})