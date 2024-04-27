<script lang="ts">
	import { API } from "aws-amplify";
	import { uniqueOrderRef } from "../helpers";
	import type { FormDBDocType } from "../../types";
	export let notification;

	const formData: FormDBDocType = {
		first_name: "",
		surname: "",
		banking: "",
		email: "",
		save_data: false,
		order_item: 3771900800,
		order_ref: "",
	};

	const handleSubmit = async () => {
		formData.order_ref = uniqueOrderRef(
			formData.surname
		);

		try {
			const response = await API.post(
				"queueApi",
				"/order",
				{
					body: formData,
				}
			);
			notification.set(response.order);
		} catch (e) {
			console.log("ERROR: ", e);
		}
	};
</script>

<h2>Purchase something</h2>
<div class="shop">
	<form
		action="/order"
		method="POST"
		class="shop__form"
		on:submit|preventDefault={handleSubmit}
	>
		<input
			type="text"
			placeholder="firstname"
			bind:value={formData.first_name}
		/>
		<input
			type="text"
			placeholder="surname"
			bind:value={formData.surname}
		/>
		<input
			type="number"
			placeholder="account number"
			bind:value={formData.banking}
		/>
		<input
			type="text"
			placeholder="email"
			bind:value={formData.email}
		/>
		<label for="remember_me"
			>Remember me? <input
				type="checkbox"
				id="remember_me"
				class="shop__form--checkbox"
				bind:checked={formData.save_data}
			/></label
		>

		<button>Buy now</button>
	</form>
</div>

<style>
	h2 {
		margin-left: 20px;
		margin-top: 30px;
	}

	.shop {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: 50px;
	}

	.shop__form {
		display: flex;
		flex-direction: column;
	}

	.shop__form input {
		width: 250px;
		margin: 10px;
		border-radius: 5px;
		border: none;
		padding: 10px;
	}

	.shop__form label {
		margin-left: 10px;
		font-weight: bold;
	}

	input.shop__form--checkbox {
		width: 20px;
	}

	.shop__form button {
		width: 100px;
		color: aliceblue;
		background-color: orangered;
		padding: 10px 20px;
		border: none;
		border-radius: 40px;
		margin-top: 20px;
		margin-left: 10px;
	}
</style>
