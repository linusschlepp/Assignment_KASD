<script>
    import Main from "./pages/Main.svelte"
    import Login from "./pages/Login.svelte"
    import Signup from "./pages/Signup.svelte"
    import Add from "./pages/Add.svelte";
    import Report from "./pages/Report.svelte";
    import {PlacemarkService} from "./services/placemark-service.js";
    import {setContext} from "svelte";
    import Map from "./pages/Map.svelte";
    import About from "./pages/About.svelte"
    import Gallery from "./pages/Gallery.svelte";
    import Analytics from "./pages/Analytics.svelte";
    import Admin from "./components/Admin.svelte";
    import Router from "svelte-spa-router";


    setContext("PlacemarkService", new PlacemarkService("http://localhost:4000"));

    /*
    Please comment out the code above and uncomment the below to make api-request on the deployed vesion

     */

    // setContext("PlacemarkService", new PlacemarkService("https://polar-bayou-58717.herokuapp.com"));


    let routes = {
        "/": Main,
        "/login": Login,
        "/signup": Signup,
        "/add": Add,
        "/categories": Report,
        "/map": Map,
        "/logout": Main,
        "/about": About,
        "/gallery": Gallery,
        "/analytics": Analytics,
        "/adminform": Admin
    }
</script>

<div class="container">
    <Router {routes}/>
</div>