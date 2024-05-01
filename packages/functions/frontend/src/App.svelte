<script lang="ts">
	import Header from "./lib/Header.svelte";
	import Form from "./lib/Form.svelte";
	import Modal from "./lib/Modal.svelte";
	import NoticeStore from "./stores/noticeStore";
	import type { NoticeData } from "../types";
	import socket from "./sockets/index";

	let showModal = false;

	socket.onopen = event => {
		socket.send("test message from client");
		console.log("SOCKET OPEN");
	};

	const handleModal = () => {
		showModal = !showModal;
	};

	NoticeStore.subscribe((notice: NoticeData) => {
		if (notice.msg.length > 0)
			showModal = !showModal;
	});
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
	<Form />
</main>

<style>
</style>
