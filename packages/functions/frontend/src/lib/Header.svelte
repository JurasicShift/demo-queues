<script lang="ts">
	import trolley from "../assets/shopping.png";
</script>

<header class="header">
	<div class="header__content">
		<h1>MyShop</h1>
		<img src={trolley} alt="shopping trolley" />
	</div>
</header>

<style>
	.header {
		display: flex;
		justify-content: flex-end;
		width: 100%;
		height: 150px;
		box-shadow:
			rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
			rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
	}

	.header__content {
		display: flex;
		align-items: flex-end;
	}

	.header__content h1 {
		margin: 10px;
		color: orangered;
	}

	.header__content img {
		height: 50px;
		width: 50px;
		margin: 10px;
	}
</style>
