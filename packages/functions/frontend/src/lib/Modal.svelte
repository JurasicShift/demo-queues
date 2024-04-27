<script lang="ts">
	export let showModal = false;
	export let ref;
	export let notification;
	let msgValue = "";
	notification.subscribe((msg: string) => {
		msgValue = msg;
		if (msg.length > 0) showModal = !showModal;
	});
</script>

{#if showModal}
	<div class="modal">
		<div class="modal__box">
			<div class="modal__box--ref">
				<p>Order ref: {ref}</p>
				<div class="modal__box--close">
					<button on:click>
						<img
							src="/src/assets/close.png"
							alt="close"
						/>
					</button>
				</div>
			</div>

			<hr />
			<div class="modal__box--msg">
				<p>Status: {msgValue}</p>
			</div>
		</div>
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
		height: 150px;
		max-width: 450px;
		background-color: white;
		border-radius: 10px;
		margin: 10% auto;
		padding: 20px 10px;
	}

	.modal__box--ref {
		display: flex;
		justify-content: space-between;
	}

	hr {
		background-color: orangered;
		width: 100%;
		height: 1px;
		border: none;
	}

	.modal__box--msg {
		text-align: center;
		margin-top: 30px;
	}

	.modal__box--close {
		height: 40px;
		position: relative;
		top: 5px;
	}

	img {
		height: 40px;
		width: 40px;
	}

	button {
		border: none;
		background: none;
		cursor: pointer;
		height: 40px;
	}
</style>
