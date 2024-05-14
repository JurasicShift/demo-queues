import { writable } from "svelte/store";

export const notices = writable([{ statusCode: 410, msg: "Order Pending", order_ref: "0998402002-jfjf" }]);

export const loggedIn = writable(false);


