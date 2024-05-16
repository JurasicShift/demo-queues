import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyHandler } from "aws-lambda";
import { Table } from "sst/node/table";
import { SocketIdType } from "types";

const dynamoDb = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandler = async (event) => {
    const TableName = Table.SocketTable.tableName;
    const params = {
        TableName: TableName,
        Key: {
            id: event.requestContext.connectionId,
        }
    }

    const disconnected = await dynamoDb.delete(params).promise();

    const socketParams = {
        TableName: TableName,
        ProjectionExpression: "id"
    }


    //In the case of our example remove all socket ids:

    const socketIds = await dynamoDb.scan(socketParams).promise();
    const connections: SocketIdType[] = (socketIds.Items || []) as SocketIdType[];

    if (connections.length > 0) {
        for (let connection of connections) {
            await dynamoDb.delete({ TableName, Key: { id: connection.id } }).promise();
        }
    }


    return { statusCode: 200, body: "Disconnected WebSock" }
}