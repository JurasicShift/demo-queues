import { MessageType } from '../types';
import { consumerRtnObj } from 'helpers/helpers';

export async function orderProcessing(msg: MessageType) {
    console.log("hit orderProcessing with:", msg);
    return consumerRtnObj("order_processing", true);

}