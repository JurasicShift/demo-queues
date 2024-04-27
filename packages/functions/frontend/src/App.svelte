<script lang="ts">
	import Header from "./lib/Header.svelte";
	import Form from "./lib/Form.svelte";
	import Modal from "./lib/Modal.svelte";
	import { writable } from "svelte/store";
	const notification = writable("");
	let showModal = false;
	// let msg = "Order recieved!";
	let ref = "hydhiu6988939";
	const handleModal = () => {
		showModal = !showModal;
	};

	// notification.subscribe(
	// 	(msg: string) => ()
	// );
</script>

<main>
	<Modal
		{showModal}
		{ref}
		{notification}
		on:click={handleModal}
	/>
	<Header />
	<Form {notification} />
</main>

<style>
</style>
