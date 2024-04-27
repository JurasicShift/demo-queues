import { SQSEvent } from "aws-lambda";

export interface MessageType {
    type: string,
    status: string,
    order_ref: string,
    order_item: number
}

export interface DynamoDBDocType {
    order_ref: string,
    order_item: number,
    surname: string,
    first_name: string,
    banking: number,
    email: string,
    createdAt: string,
    save_data: string,
}

export interface DynamoDBEmailType {
    order_ref: string,
    first_name: string,
    email: string,
}

export type ConsumerType = (dbData: DynamoDBDocType) => Promise<object | Error>;

export type ConsumerRtnType = (event: SQSEvent) => Promise<void>;

export interface ErrorBody extends DynamoDBDocType {
    error_msg: string,
    error_location: string
}

export type MsgBody = ErrorBody | DynamoDBDocType;
