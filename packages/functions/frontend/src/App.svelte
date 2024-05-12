<script lang="ts">
	import Header from "./lib/Header.svelte";
	import Form from "./lib/Form.svelte";
	import MessageModal from "./lib/MessageModal.svelte";
	import {
		NoticesStore,
		LoggedInStore,
	} from "./stores/noticeStore";
	import Login from "./lib/Login.svelte";
	import {
		launchSocket,
		closeSocket,
	} from "./sockets/index";
	import type { NoticeStoreType } from "../types";

	let showModal = false;
	let loggedIn = false;

	// type NoticeData = {
	// 	statusCode: number;
	// 	order_ref: string;
	// 	msg: string;
	// };

	// type NoticeStore = NoticeData[] | [];

	NoticesStore.subscribe(
		(notice: NoticeStoreType) => {
			if (notice.length > 1) showModal = true;
			else showModal = false;
		}
	);

	LoggedInStore.subscribe(
		(loggedInVal: boolean) => {
			loggedIn = loggedInVal;
		}
	);

	let socket: WebSocket | null = null;

	$: if (loggedIn && !socket) {
		socket = launchSocket();
	} else if (!loggedIn && socket) {
		closeSocket(socket);
		socket = null;
	}
</script>

<main>
	<MessageModal {showModal}></MessageModal>
	<Header />
	{#if loggedIn}
		<Form />
	{:else}
		<Login />
	{/if}
</main>

<style>
</style>
