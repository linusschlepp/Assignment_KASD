<script>

    import PlacemarkForm from "../components/PlacemarkForm.svelte";
    import CategoryForm from "../components/CategoryForm.svelte";
    import TitleBar from "../components/TitleBar.svelte";
    import MainNavigator from "../components/MainNavigator.svelte";
    import PlacemarkMap from "../components/PlacemarkMap.svelte";


    let placemarkMap = null;

    /**
     * Zooms in on recently added placemarks on the map and adds them to the map
     *
     * @param event Placemark, which is getting added
     */
    function placemarkGenerated(event) {

        // Adds placemark to the map and zooms to recently added placemark
        placemarkMap.addPlacemarkMarker(event.detail.placemark)
    }

</script>

<div class="columns is-vcentered">
    <div class="column is-two-thirds">
        <TitleBar subTitle={"Mark your favourite places!"} title={"Placemark"}/>
    </div>
    <div class="column">
        <MainNavigator/>
    </div>
</div>

<div class="columns is-vcentered">
    <div class="column has-text-centered">
        <PlacemarkMap bind:this="{placemarkMap}"/>
    </div>
    <div class="column box has-text-centered">
        <h1 class="title is-4">Place your marks!</h1>
        <PlacemarkForm on:message={placemarkGenerated}/>
        <div class="column box has-text-centered">
            <h1 class="title is-4">Add categories!</h1>
            <CategoryForm/>
        </div>
    </div>
</div>