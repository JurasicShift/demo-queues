
import { beforeAll } from "vitest";
import { initProject } from "sst/project.js";
import { App, getStack } from "sst/constructs";
import { StorageStack } from "../../../stacks/StorageStack";
import { Template } from "aws-cdk-lib/assertions";

let app, template: Template;

beforeAll(async () => {
    await initProject({});
    app = new App({ mode: "deploy" });
    app.stack(StorageStack);
    template = Template.fromStack(getStack(StorageStack));
})

describe("Test StorageStack", () => {
    it("check for OrdersDB DynamoDB resource", async () => {

        template.hasResourceProperties("AWS::DynamoDB::Table", {
            TableName: "dev-my-app-OrdersDB",
            AttributeDefinitions: [
                {
                    "AttributeName": "user_id",
                    "AttributeType": "S"
                },
                {
                    "AttributeName": "order_ref",
                    "AttributeType": "S"
                }
            ],
            KeySchema: [
                {
                    "AttributeName": "user_id",
                    "KeyType": "HASH"
                },
                {
                    "AttributeName": "order_ref",
                    "KeyType": "RANGE"
                }
            ],
            BillingMode: "PAY_PER_REQUEST",
            PointInTimeRecoverySpecification: {
                PointInTimeRecoveryEnabled: true,
            },
        })
    });

    it("check for SocketTable DynamoDB resource", async () => {

        template.hasResourceProperties("AWS::DynamoDB::Table", {
            TableName: "dev-my-app-SocketTable",
            AttributeDefinitions: [
                {
                    "AttributeName": "id",
                    "AttributeType": "S"
                }
            ],
            KeySchema: [
                {
                    "AttributeName": "id",
                    "KeyType": "HASH"
                }
            ],
            BillingMode: "PAY_PER_REQUEST",
            PointInTimeRecoverySpecification: {
                PointInTimeRecoveryEnabled: true,
            },
        })
    });

    it("check for WebSocket API", async () => {
        const hasWebSocketApi = template.hasResourceProperties("AWS::ApiGatewayV2::Api", {
            Name: "dev-my-app-Api",
            ProtocolType: "WEBSOCKET",

        });
    })


    it('should define the WebSocket $connect route', () => {
        template.hasResourceProperties('AWS::ApiGatewayV2::Route', {
            RouteKey: '$connect',
            Target: {
                'Fn::Join': ['', [
                    'integrations/',
                    { 'Ref': "ApiRouteconnectIntegrationconnect921690DB" }
                ]]
            }
        });
    });

    it('should define the WebSocket $disconnect route', () => {
        template.hasResourceProperties('AWS::ApiGatewayV2::Route', {
            RouteKey: '$disconnect',
            Target: {
                'Fn::Join': ['', [
                    'integrations/',
                    { 'Ref': "ApiRoutedisconnectIntegrationdisconnect79054E04" }
                ]]
            }
        });
    });

    it('should define the WebSocket $default route', () => {
        template.hasResourceProperties('AWS::ApiGatewayV2::Route', {
            RouteKey: '$default',
            Target: {
                'Fn::Join': ['', [
                    'integrations/',
                    { 'Ref': "ApiRoutedefaultIntegrationdefault2C904EB2" }
                ]]
            }
        });
    });

    // it('explore the resources', () => {
    //     // Print the entire template to console for inspection
    //     console.log(JSON.stringify(template.toJSON(), null, 2));
    // });


    it('should define the WebSocket sendMessage route', () => {
        template.hasResourceProperties('AWS::ApiGatewayV2::Route', {
            RouteKey: 'sendmessage',
            Target: {
                'Fn::Join': ['', [
                    'integrations/',
                    { 'Ref': "ApiRoutesendmessageIntegrationsendmessage2C5CF51C" }
                ]]
            }
        });
    });

})