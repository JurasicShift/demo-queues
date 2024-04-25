<script lang="ts">
	import { API } from "aws-amplify";
	import { uniqueOrderRef } from "../helpers";

	let first_name: string,
		surname: string,
		banking: number,
		email: string,
		save_data: boolean = false,
		order_item: number = 3771900800,
		order_ref: string;

	const handleSubmit = async () => {
		order_ref = uniqueOrderRef(surname);

		try {
			const response = await API.post(
				"queueApi",
				"/order",
				{
					body: {
						first_name,
						surname,
						banking,
						email,
						save_data,
						order_item,
						order_ref,
					},
				}
			);
			console.log("RESPONSE: ", response);
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
			bind:value={first_name}
		/>
		<input
			type="text"
			placeholder="surname"
			bind:value={surname}
		/>
		<input
			type="number"
			placeholder="account number"
			bind:value={banking}
		/>
		<input
			type="text"
			placeholder="email"
			bind:value={email}
		/>
		<label for="remember_me"
			>Remember me? <input
				type="checkbox"
				id="remember_me"
				class="shop__form--checkbox"
				bind:checked={save_data}
			/></label
		>

		<button>Buy now</button>
	</form>
</div>

<style>
	h2 {
		color: #838383;
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
		color: #838383;
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
