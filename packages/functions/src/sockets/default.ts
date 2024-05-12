import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyHandler } from "aws-lambda";
// import { Table } from "sst/node/table";

const dynamoDb = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandler = async (event) => {
    // const params = {
    //     TableName: Table.Orders.tableName,
    //     Item: {

    //     }
    // }
    console.log("SOCKET DEFAULT: ", event.body);

    return { statusCode: 200, body: "Connected WebSock" }
}