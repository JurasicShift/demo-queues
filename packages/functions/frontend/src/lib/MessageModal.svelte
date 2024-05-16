<script lang="ts">
	export let showModal = false;
	import { notices } from "../stores/noticeStore";
	import { fade } from "svelte/transition";

	const handleDelete = (msg: string) => {
		notices.update(store =>
			store.filter(notice => notice.msg != msg)
		);
	};
</script>

{#if showModal}
	<div
		class="modal"
		transition:fade={{ duration: 200 }}
	>
		{#each $notices as notice}
			{#if notice.statusCode !== 410}
				<div
					class="modal__box"
					class:modal__box--error={notice.statusCode ===
					500
						? true
						: false}
				>
					<div class="modal__box--header">
						{notice.statusCode === 500
							? "Error location:"
							: "Order_ref:"}
						{notice.order_ref}
						<div class="modal__box--close">
							<button
								on:click={() =>
									handleDelete(notice.msg)}
							>
								<img
									src="/src/assets/close.png"
									alt="close"
								/>
							</button>
						</div>
					</div>

					<hr />
					<div class="modal__box--content">
						{notice.statusCode === 500
							? "Error Message: "
							: "Status: "}
						{notice.msg}
					</div>
				</div>
			{/if}
		{/each}
	</div>
{/if}

<style>
	.modal {
		height: 100%;
		width: 100%;
		position: fixed;
		background-color: rgba(0, 0, 0, 0.7);
		font-weight: bold;
		font-size: 17px;
	}

	.modal__box {
		height: 100px;
		max-width: 400px;
		background-color: white;
		border-radius: 10px;
		margin: 5% auto;
		padding: 15px 10px;
	}

	.modal__box--error {
		border: 3px solid red;
		color: red;
	}

	.modal__box--header {
		display: flex;
		justify-content: space-between;
	}

	hr {
		background-color: orangered;
		width: 100%;
		height: 1px;
		border: none;
	}

	.modal__box--content {
		text-align: center;
		margin-top: 20px;
	}

	.modal__box--close {
		height: 40px;
		position: relative;
		top: 5px;
	}

	img {
		height: 30px;
		width: 30px;
	}

	button {
		border: none;
		background: none;
		cursor: pointer;
		height: 40px;
	}
</style>
