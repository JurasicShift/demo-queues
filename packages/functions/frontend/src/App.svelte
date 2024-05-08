<script lang="ts">
	import Header from "./lib/Header.svelte";
	import Form from "./lib/Form.svelte";
	import Modal from "./lib/Modal.svelte";

	import {
		NoticeStore,
		LoggedInStore,
	} from "./stores/noticeStore";
	import Login from "./lib/Login.svelte";
	import type { NoticeData } from "../types";
	import {
		launchSocket,
		closeSocket,
	} from "./sockets/index";

	let showModal = false;
	let loggedIn = false;

	const handleModal = () => {
		showModal = !showModal;
	};

	NoticeStore.subscribe((notice: NoticeData) => {
		if (notice.msg.length > 0)
			showModal = !showModal;
	});

	LoggedInStore.subscribe(
		(loggedInVal: boolean) => {
			console.log(loggedIn);
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
	<Modal {showModal} on:click={handleModal}>
		<p slot="header">
			Order ref: {$NoticeStore.order_ref}
		</p>
		<p slot="content">
			Status: {$NoticeStore.msg}
		</p>
	</Modal>
	<Header />
	{#if loggedIn}
		<Form />
	{:else}
		<Login />
	{/if}
</main>

<style>
</style>
