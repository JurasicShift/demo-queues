import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyHandler } from "aws-lambda";


const dynamoDb = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandler = async (event) => {

    console.log("CLIENT MSG RECIEVED IN DEFAULT: ", event.body);

    return { statusCode: 200, body: "Connected WebSock" }
}