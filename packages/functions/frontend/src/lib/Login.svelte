<script lang="ts">
	import { Auth } from "aws-amplify";
	import Spinner from "./Spinner.svelte";
	import { LoggedInStore } from "../stores/noticeStore";
	import Button from "./Button.svelte";

	let email = "";
	let password = "";
	let spinActive = false;

	const clearInputs = () => {
		email = "";
		password = "";
	};

	const handleSubmit = async () => {
		spinActive = !spinActive;
		try {
			const response = await Auth.signIn(
				email,
				password
			);
			console.log("FORM RESPONSE: ", response);
			LoggedInStore.set(true);
			spinActive = !spinActive;
			clearInputs();
		} catch (e: any) {
			spinActive = !spinActive;
			clearInputs();
			console.error("ERROR: ", e.message);
		}
	};
</script>

<h2>Login</h2>
<div class="login">
	<form class="login__form">
		<div class="login__form--spinner">
			<Spinner {spinActive} />
		</div>

		<input
			type="email"
			placeholder="email"
			bind:value={email}
		/>
		<input
			type="text"
			placeholder="password"
			bind:value={password}
		/>

		<Button content={"Login"} fn={handleSubmit} />
	</form>
</div>

<style>
	h2 {
		margin-left: 20px;
		margin-top: 30px;
	}

	.login {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: 50px;
	}

	.login__form {
		display: flex;
		flex-direction: column;
	}

	.login__form--spinner {
		width: 100%;
		height: 30px;
		display: flex;
		justify-content: flex-end;
	}

	.login__form input {
		width: 250px;
		margin: 10px;
		border-radius: 5px;
		border: none;
		padding: 10px;
	}
</style>
