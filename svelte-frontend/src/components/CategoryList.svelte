<script>
    import {getContext, onMount} from 'svelte'
    import {user} from "../stores.js"
    import SingleCategory from "./SingleCategory.svelte";
    import MapModal from "./MapModal.svelte";

    const placemarkService = getContext("PlacemarkService");
    let filteredCategoryList = [];
    let userMail = $user.email
    let placemarkList = []
    let continentMap = "";
    let modalShowing = false;
    export let description = ""
    export let placemarkMap = null


    onMount(async () => {
        placemarkList = await placemarkService.getPlacemarks();
        filteredCategoryList = await placemarkService.getFilteredCategoryList(userMail);
        console.log("hallo")
        console.log(placemarkMap)
    });

    const changeModal = () => {
        modalShowing = true;
    }
</script>

<header>
    <b>Your Categories: </b>
</header>

{#if modalShowing}
    <MapModal mapurl={continentMap} on:click={() => modalShowing = false} />
{/if}
{#if filteredCategoryList.length > 0}
{#each filteredCategoryList as category}
    <SingleCategory {category} {placemarkMap}
               {placemarkList} on:click={() => changeModal()}
       />


{/each}
    {#if description.length > 0}
    <textarea bind:value={description} class="textarea" id="description"
              name="description" placeholder="" readonly></textarea>

        {/if}
    {:else}
    <b>Oops, it seems like you didn't add any Categories yet.
        Start adding Categories and placemarks right <a href="/#/category">here!</a></b>
    {/if}




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
        background-color: #6d00cc;
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