import { DynamoDB, ApiGatewayManagementApi } from "aws-sdk";
import { Table } from "sst/node/table";
import { APIGatewayProxyHandler } from "aws-lambda";

const TableName = Table.OrdersDB.tableName;
const dynamoDb = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandler = async (event) => {

    console.log("hit sendMessage with:", event);

    return { statusCode: 200, body: "Message sent" };
};