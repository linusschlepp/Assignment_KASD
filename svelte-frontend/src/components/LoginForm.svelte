<script>
    import {push} from "svelte-spa-router";
    import {getContext} from "svelte";

    let email = ""
    let password = "";
    let errorMessage = "";

    const placemarkService = getContext("PlacemarkService");


    /**
     * Logs in user, communicates with database via api. To check if user exists and if credentials are correct
     *
     * @returns {Promise<void>}
     */
    async function login() {
        // User login
        let success = await placemarkService.login(email, password)
        if(success) {
            // If the login went as planned, the user is redirected to /add
            push("/add")
        }else{
            // If the login was unsuccessful, name and password are resetted and errorMessage gets displayed on screen
            email = "";
            password = "";
            errorMessage = "Invalid Credentials";
        }
    }

</script>

<form on:submit|preventDefault={login}>
    <div class="field">
        <label class="label" for="email">Email</label>
        <input bind:value={email} class="input" id="email" name="email" placeholder="Enter email" type="email">
    </div>
    <div class="field">
        <label class="label" for="password">Password</label>
        <input bind:value={password} class="input" id="password" name="password" placeholder="Enter Password" type="password">
    </div>
    <div class="field is-grouped">
        <button class="button is-rounded">Log In</button>
    </div>
    {#if errorMessage}
        <div class="section">
            {errorMessage}
        </div>
    {/if}
</form>
<style>

    button {
        background-color: #6d00cc;
        color: white;
        font-weight: bold;
    }


    input {
        border-color: #6d00cc;
    }

    textarea {
        border-color: #6d00cc;
    }
</style>