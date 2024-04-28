<script lang="ts">
	import Header from "./lib/Header.svelte";
	import Form from "./lib/Form.svelte";
	import Modal from "./lib/Modal.svelte";
	import NoticeStore from "./stores/NoticeStore";
	import type { NoticeData } from "../types";
	let showModal = false;

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
