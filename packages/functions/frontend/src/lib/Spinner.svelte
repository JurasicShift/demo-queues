<script lang="ts">
	export let spinActive = false;
</script>

{#if spinActive}
	<div class="spinner"></div>
{/if}

<style>
	.spinner {
		height: 20px;
		width: 20px;
		border: 3px solid orangered;
		border-top-color: #3498db;
		border-bottom-color: #3498db;
		border-radius: 50%;
		animation: spin infinite 1.5s linear;
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
