import AWS from "aws-sdk";
import { WebSocketApi } from "sst/node/websocket-api";
import { Table } from "sst/node/table";
import dynamoDb from "../../../core/src/dynamodb";
import { SocketIdType } from "types";

export const socketMessage = async (msg: string) => {

    const apigatewaymanagementapi = new AWS.ApiGatewayManagementApi({
        endpoint: WebSocketApi.Api.httpsUrl
    });

    const TableName = Table.SocketTable.tableName;

    try {
        const socketParams = {
            TableName: TableName,
            ProjectionExpression: "id"
        }

        const socketIds = await dynamoDb.scan(socketParams);

        const connections: SocketIdType[] = (socketIds.Items || []) as SocketIdType[];

        if (connections[0].id) {
            for (const connection of connections) {
                try {

                    const connectionParams = {
                        ConnectionId: connection.id,
                        Data: msg
                    }

                    await apigatewaymanagementapi.postToConnection(connectionParams).promise();
                } catch (e: any) {
                    if (e.statusCode === 410) {
                        await dynamoDb.delete({ TableName, Key: { id: connection.id } });
                    }
                }

            }

        }
    } catch (e) {
        console.error(e);
    }

}