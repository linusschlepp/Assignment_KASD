<script>
    import TitleBar from "../components/TitleBar.svelte";
    import MainNavigator from "../components/MainNavigator.svelte";
    import {getContext, onMount} from "svelte";
    import {user} from "../stores";


    let placemarkList = []
    let filteredCategoryList = []
    let userMail = $user.email // gets mail of current user
    let filteredPlacemarkList = []


    const placemarkService = getContext("PlacemarkService");

    onMount(async () => {
        placemarkList = await placemarkService.getPlacemarks(); // get all placemarks
        filteredCategoryList = await placemarkService.getCategoriesByMail(userMail); // get all categories of the specific user
        filteredPlacemarkList = await placemarkService.getPlacemarksByMail(userMail, placemarkList) // get all placemarks of the specific user
    });

</script>

<div class="columns is-vcentered">
    <div class="column is-two-thirds">
        <TitleBar subTitle={"Discover your images"} title={"Placemark"}/>
    </div>
    <div class="column">
        <MainNavigator/>
    </div>
</div>
<div class="title">Discover the images of your favourite places</div>
<br>
{#if filteredPlacemarkList.length > 0 }
    {#each filteredPlacemarkList as placemark}
        <div class="columns">
            <div class="column">
                <img style="width: 400px; height: 400px" src="{placemark.img}" alt="">
            </div>
                <div class="column">
                    <div class="title">{placemark.name}</div>
                    <br>
                    <div class="subtitle">{placemark.description}</div>
                </div>
        </div>
    {/each}

{:else}

    <b>Oops, it seems like you didn't add any Placemarks or pictures yet.
        Start adding Placemarks right <a href="/#/add">here!</a></b>
{/if}
<style>


    img {
        border: 1px solid #6d00cc;
    }

</style>