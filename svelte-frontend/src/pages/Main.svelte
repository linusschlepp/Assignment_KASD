<script>
    import map_dashboard from "/src/assets/map_dashboard.png";
    import WelcomeNavigator from "../components/WelcomeNavigator.svelte";
    import TitleBar from "../components/TitleBar.svelte";
    import {getContext} from "svelte";

    const placemarkService = getContext("PlacemarkService");
    placemarkService.logout()

</script>

<div class="columns is-vcentered">
    <div class="column is-two-thirds">
        <TitleBar title={"Placemark"} subTitle={"Mark your favourite places!"}/>
    </div>
    <div class="column">
        <WelcomeNavigator/>
    </div>
</div>

<div class="columns is-vcentered content">
    <div class="column has-text-centered">
        <img width="300" src="{map_dashboard}" alt="homer">
    </div>
    <div class="column">
        <h1 class="title">Welcome to Placemark!</h1>
        <p>Mark your favourite places</p>
    </div>
</div>