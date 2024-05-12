import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyHandler } from "aws-lambda";
import { Table } from "sst/node/table";

const dynamoDb = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandler = async (event) => {
    const params = {
        TableName: Table.SocketTable.tableName,
        Item: {
            id: event.requestContext.connectionId
        }
    }
    const connected = await dynamoDb.put(params).promise();


    return { statusCode: 200, body: "Connected WebSock" }
}