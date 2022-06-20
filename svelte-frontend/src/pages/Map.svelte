<script>
    import TitleBar from "../components/TitleBar.svelte";
    import MainNavigator from "../components/MainNavigator.svelte";
    import PlacemarkMap from "../components/PlacemarkMap.svelte";
</script>

<div class="columns is-vcentered">
    <div class="column is-two-thirds">
        <TitleBar subTitle={"Discover your favourite places on the Map"} title={"Placemark"}/>
    </div>
    <div class="column">
        <MainNavigator/>
    </div>
</div>

<div class="title">Discover your favourite places on the Map</div>
<br>
<PlacemarkMap/>