<script lang="ts">
	export let content;
	export let colour = "orangered";
	export let fn = () => {};
</script>

<button
	style="background-color: {colour};"
	on:click|preventDefault={fn}>{content}</button
>

<style>
	button {
		width: 100px;
		height: 35px;
		color: white;
		padding: 10px 20px;
		border: none;
		border-radius: 40px;
		margin-top: 20px;
		margin-left: 10px;
		cursor: pointer;
	}
</style>
