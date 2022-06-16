<script>
    import TitleBar from "../components/TitleBar.svelte";
    import MainNavigator from "../components/MainNavigator.svelte";
    import PlacemarkMap from "../components/PlacemarkMap.svelte";
    import {getContext, onMount} from "svelte";
    import {user} from "../stores";


    let placemarkList = []
    let filteredCategoryList = []
    let userMail = $user.email


    const placemarkService = getContext("PlacemarkService");

    onMount(async () => {
        placemarkList = await placemarkService.getPlacemarks();
        filteredCategoryList = await placemarkService.getFilteredCategoryList(userMail);
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
{#if filteredCategoryList.length > 0 }
{#each placemarkList as placemark}

    {#if filteredCategoryList.map(category => category._id).includes(placemark.categoryid)}
        <div class="columns">
            <div class="column">
                <img src="{placemark.img}" alt="">
            </div>
            {#if placemark.img.length > 5}
                <div class="column">
                    <div class="title">{placemark.name}</div>
                    <br>
                    <div class="subtitle">{placemark.description}</div>
                </div>
            {/if}
        </div>
    {/if}
{/each}

{:else}

    <b>Oops, it seems like you didn't add any Placemarks or pictures yet.
        Start adding Placemarks right <a href="/#/category">here!</a></b>


{/if}
<style>


    img {
        border: 1px solid #6d00cc;
    }

</style>