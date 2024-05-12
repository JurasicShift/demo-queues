import { writable } from "svelte/store";

export const NoticesStore = writable([{ statusCode: 410, msg: "Order Pending", order_ref: "0998402002-jfjf" }]);

export const LoggedInStore = writable(false);


