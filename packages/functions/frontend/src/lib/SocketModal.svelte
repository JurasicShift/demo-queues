<script lang="ts">
	import { socketState } from "../stores/noticeStore";
	import { onDestroy } from "svelte";
	import { fly } from "svelte/transition";

	$: showModal =
		$socketState === WebSocket.CONNECTING ||
		$socketState === WebSocket.CLOSING ||
		$socketState === WebSocket.OPEN ||
		$socketState === WebSocket.CLOSED;

	let ellipses: string[] = [];

	const ellipsesAdder = () => {
		const interval = setInterval(() => {
			ellipses =
				ellipses.length === 3
					? []
					: [...ellipses, ". "];
		}, 500);

		onDestroy(() => clearInterval(interval));
	};

	const modalDisplayTimer = () => {
		const timer = setTimeout(() => {
			showModal = false;
		}, 3000);

		onDestroy(() => clearTimeout(timer));
	};

	$: if (
		$socketState === WebSocket.CONNECTING ||
		$socketState === WebSocket.CLOSING
	) {
		ellipsesAdder();
	} else if (
		$socketState === WebSocket.OPEN ||
		$socketState === WebSocket.CLOSED
	) {
		modalDisplayTimer();
	} else {
		showModal = false;
	}
</script>

{#if showModal}
	<div
		class="modal"
		in:fly={{ x: -300, duration: 500 }}
		out:fly={{ x: -300, duration: 500 }}
	>
		<div
			class="modal__box"
			class:open={$socketState ===
				WebSocket.OPEN ||
				$socketState === WebSocket.CLOSED}
		>
			<p>
				{#if $socketState === WebSocket.CONNECTING}
					WebSocket connecting
				{:else if $socketState === WebSocket.OPEN}
					WebSocket open !
				{:else if $socketState === WebSocket.CLOSING}
					WebSocket closing
				{:else}
					WebSocket closed
				{/if}
			</p>
			<div class="modal__box--span">
				{#if $socketState === WebSocket.CONNECTING || $socketState === WebSocket.CLOSING}
					{#each ellipses as ellipse}
						<span>{ellipse}</span>
					{/each}
				{:else if $socketState === WebSocket.OPEN}
					<img
						src="/src/assets/tick.png"
						alt="tick"
					/>
				{:else}
					<img
						src="/src/assets/cross.png"
						alt="cross"
					/>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.modal {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-end;
		position: fixed;
		bottom: 0;
		right: 0;
	}

	.modal__box {
		width: 260px;
		border: 4px solid #ff4500;
		border-radius: 5px;
		padding: 0px 20px;
		font-weight: bold;
		margin-right: 20px;
		margin-bottom: 20px;
		display: flex;
		font-size: 20px;
	}

	.modal__box--span {
		display: inline-block;
		width: 30px;
		margin: 16px 0;
		margin-left: 5px;
	}

	.open {
		justify-content: space-between;
	}

	.modal__box--span img {
		height: 30px;
		width: 30px;
		position: relative;
		top: 4px;
	}
</style>
