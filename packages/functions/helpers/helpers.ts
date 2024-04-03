import {  DynamoDBDocType } from "../types";
import { Queue } from "sst/node/queue";

export const createdAt = (): string => {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    return date.toISOString();
}

export const proceedVerification = () => {
    const result = Math.floor(Math.random() * 11);
    return result <= 8 ? true : false;
}


export const messageObjFactory = ( type: string, status: string, data: DynamoDBDocType) => {
    
        console.log("QUEUE.QUEUE: ", Queue.Queue);
    return {

        QueueUrl: Queue.Queue.queueUrl,
        MessageBody: JSON.stringify({
            type: type,
            status: status,
            order_ref: data.order_ref,
            order_item: data.order_item
        })
    }
}

export const consumerRtnObj = (consumer: string, status: boolean) => {
    return {
        consumer,
        status
    }
}
