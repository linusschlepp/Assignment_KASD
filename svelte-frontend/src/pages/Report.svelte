<script>

    import CategoryList from "../components/CategoryList.svelte";
    import TitleBar from "../components/TitleBar.svelte";
    import MainNavigator from "../components/MainNavigator.svelte";
    import PlacemarkMap from "../components/PlacemarkMap.svelte";
    let placemarkMap = null;
</script>

<div class="columns is-vcentered">
    <div class="column is-two-thirds">
        <TitleBar subTitle={"Mark your favourite places!"} title={"Placemark"}/>
    </div>
    <div class="column">
        <MainNavigator/>
    </div>
</div>

<div class="columns">
    <div class="column has-text-centered">
        <PlacemarkMap bind:this="{placemarkMap}"/>
    </div>
    <div class="column is-two-thirds">
        <CategoryList {placemarkMap}/>
    </div>
</div>