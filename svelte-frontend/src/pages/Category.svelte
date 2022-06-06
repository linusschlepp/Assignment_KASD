<script>

    import CategoryForm from "../components/CategoryForm.svelte";
    import TitleBar from "../components/TitleBar.svelte";
    import MainNavigator from "../components/MainNavigator.svelte";
    import PlacemarkMap, {addPlacemarkMarker} from "../components/PlacemarkMap.svelte";


    let placemarkMap = null;

    function placemarkSet(event){
        console.log(event.detail.placemark)
        // TODO: function does not work
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
        <PlacemarkMap bin:this="{placemarkMap}"/>
    </div>
    <div class="column box has-text-centered">
        <h1 class="title is-4">Place your marks!</h1>
        <CategoryForm on:message={placemarkSet}/>
    </div>
</div>