<script>
    import map_dashboard from "/src/assets/map_dashboard.png";
    import WelcomeNavigator from "../components/WelcomeNavigator.svelte";
    import TitleBar from "../components/TitleBar.svelte";
    import {getContext} from "svelte";
    import {push} from "svelte-spa-router";

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
        <img width="300" src="{map_dashboard}" alt="mapdashboard" on:click={push("/")}>
    </div>
    <div class="column">
        <h1 class="title">Welcome to Placemark!</h1>
        <p>Mark your favourite places</p>
    </div>
</div>

<!--<div class="footer">-->
<!--    &copy  Linus Schlepp 2022-->
<!--</div>-->
<!--<footer class="has-text-centered is-flex-align-items-flex-end mt-auto">-->
<!--    <small>-->
<!--        <span>Copyright @2022</span>-->
<!--        <br />-->
<!--    </small>-->
<!--    <a href="/">About</a>-->
<!--</footer>-->
<style>

    /*.footer {*/
    /*    position: fixed;*/
    /*    left: 10px;*/
    /*    bottom: 5px;*/
    /*    right: 5px;*/
    /*    width: 95%;*/
    /*    color: #6d00cc;*/
    /*    text-align: center;*/
    /*    z-index: 950;*/
    /*}*/
</style>


