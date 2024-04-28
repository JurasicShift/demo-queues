import { writable } from "svelte/store";

const NoticeStore = writable({ statusCode: 200, msg: "", order_ref: "" });

export default NoticeStore;