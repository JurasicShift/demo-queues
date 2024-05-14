<script lang="ts">
	import { onDestroy } from "svelte";
	import Header from "./lib/Header.svelte";
	import Form from "./lib/Form.svelte";
	import MessageModal from "./lib/MessageModal.svelte";
	import {
		notices,
		loggedIn,
	} from "./stores/noticeStore";
	import Login from "./lib/Login.svelte";
	import {
		launchSocket,
		closeSocket,
	} from "./sockets/index";
	import type { NoticeData } from "../types";

	type NoticeStoreType = NoticeData[] | [];

	let showModal = false;

	const unsubscribe = notices.subscribe(
		(notice: NoticeStoreType) => {
			if (notice.length > 1) showModal = true;
			else showModal = false;
		}
	);

	onDestroy(unsubscribe);

	let socket: WebSocket | null = null;

	$: if ($loggedIn && !socket) {
		socket = launchSocket();
	} else if (!$loggedIn && socket) {
		closeSocket(socket);
		socket = null;
	}
</script>

<main>
	<MessageModal {showModal}></MessageModal>
	<Header />
	{#if $loggedIn}
		<Form />
	{:else}
		<Login />
	{/if}
</main>

<style>
</style>
