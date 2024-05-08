import { writable } from "svelte/store";

export const NoticeStore = writable({ statusCode: 200, msg: "", order_ref: "" });

export const LoggedInStore = writable(false);


