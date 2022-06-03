<script>
    import Main from "./pages/Main.svelte"
    import Login from "./pages/Login.svelte"
    import Signup from "./pages/Signup.svelte"
    import Router from "svelte-spa-router";

    let routes = {
        "/": Main,
        "/login": Login,
        "/signup": Signup,
        "/main": Main
    }
</script>

<div class="container">
    <div class="notification is-primary">
        <p class="is-primary">Hello from Donation</p>
    </div>
    <Router {routes}/>
</div>