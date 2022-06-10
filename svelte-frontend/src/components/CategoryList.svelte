<script>
    import {getContext, onMount} from 'svelte'
    import {user} from "../stores.js"
    import SingleCategory from "./SingleCategory.svelte";
    import MapModal from "./MapModal.svelte";

    const placemarkService = getContext("PlacemarkService");
    const filterService = getContext("FilterService")
    let filteredCategoryList = [];
    let userMail = $user.email
    let placemarkList = []
    let continentMap = "";
    let modalShowing = false;


    onMount(async () => {
        placemarkList = await placemarkService.getPlacemarks();
        filteredCategoryList = await placemarkService.getFilteredCategoryList(userMail);
    });

    const showMap = () => {
        modalShowing = true;
    }
</script>

<header>
    <b>Your Categories: </b>
</header>

<!--<table class="table is-fullwidth">-->
<!--    <thead>-->
<!--    <th>Name</th>-->
<!--    </thead>-->
<!--    <tbody>-->
<!--    {#each filteredCategoryList as category}-->
<!--        <tr>-->
<!--            <td>-->
<!--                {category.name}-->
<!--            </td>-->
<!--        </tr>-->
<!--        <thead>-->
<!--        <th>Longtitude</th>-->
<!--        <th>Latitude</th>-->
<!--        <th>Name</th>-->
<!--        <th>Description</th>-->
<!--        </thead>-->
<!--        <tbody>-->
<!--        {#each placemarkList as placemark}-->
<!--            {#if placemark.categoryid === category._id}-->
<!--                <tr>-->
<!--                    <td>-->
<!--                        {placemark.longitude}-->
<!--                    </td>-->
<!--                    <td>-->
<!--                        {placemark.latitude}-->
<!--                    </td>-->
<!--                    <td>-->
<!--                        {placemark.name}-->
<!--                    </td>-->
<!--                    <td>-->
<!--                        {placemark.description}-->
<!--                    </td>-->

<!--                </tr>-->
<!--            {/if}-->
<!--            {/each}-->
<!--        {/each}-->
<!--        </tbody>-->
<!--        </table>-->



<!--    <div class="accordion flex flex-col items-center justify-center">-->
<!--        {#each filteredCategoryList as category}-->
<!--            <div class="w-full">-->
<!--                <input type="checkbox" name="panel" id="{category.name}" class="hidden">-->
<!--                <label for="{category.name}"-->
<!--                       class="relative block  bg-neutral text-neutral-content p-3 shadow border-b border-grey">-->
<!--                    {category.name}-->
<!--                </label>-->
<!--                <div class="accordion__content overflow-hidden bg-grey-lighter px-4">-->
<!--                    <div class="mt-1"/>-->
<!--                    {#each placemarkList as placemark}-->
<!--                        {#if placemark.categoryid === category._id}-->
<!--                            <a class="text-sm font-thin" href="/#/poi/{placemark.name}"> {@html placemark.name }</a>-->
<!--                        {/if}-->
<!--                    {/each}-->
<!--                </div>-->
<!--            </div>-->
<!--        {/each}-->
<!--    </div>-->


{#if modalShowing}
    <MapModal mapurl={continentMap} on:click={() => modalShowing = false} />
{/if}

{#each filteredCategoryList as category}
    <SingleCategory {category}
               {placemarkList} on:click={() => showMap()}
       />
{/each}



<style>
    button.accordion {
        width: 100%;
        padding: 15px;
        margin: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #D9CDBF;
        text-align: left;
        color: #401E12;
        border: 1px solid black;
        cursor: pointer;
        transition: .3s;
    }

    header {
        width: 100%;
        color: black;
        margin-bottom: 20px;
        font-size: 23px

    }

    button.accordion:hover,
    button.accordion.active {
        background-color: #005F8C;
        color: white;
    }

    .heading {
        font-size: 1.5rem;
    }

    p {
        font-size: 1.2rem;
        text-align: justify;
        padding:10px 10px 5px;
        margin: auto 0;
    }
    span.icon {
        font-size: 1.8rem;
    }

    section.panel {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 0;
        overflow: auto;
        transition: all .5s;
    }

    section.open-panel {
        height: 170px;
        box-shadow: inset 0 0 5px black;
    }

    section.open-panel div {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    section div button {
        width: 150px;
        font-weight: bold;
        color: white;
        background-color: hsl(11, 63%, 40%);
        padding: 10px 0;
        margin: 10px 10px 20px;
        cursor: pointer;
    }

    div button:active {
        background-color: hsl(11, 63%, 34%);
    }
</style>