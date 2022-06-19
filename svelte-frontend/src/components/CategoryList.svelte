<script>
    import {getContext, onMount} from 'svelte'
    import {user} from "../stores.js"
    import SingleCategory from "./SingleCategory.svelte";
    import AccordionElement from "./AccordionElement.svelte";

    const placemarkService = getContext("PlacemarkService");
    let filteredCategoryList = [];
    let userMail = $user.email
    let placemarkList = []
    let accordionShowing = false;
    let description = ""
    export let placemarkMap = null
    let lng = "" // Represents longitude of specific placemark
    let lat = "" // Represents latitude of specific placemark
    let imgLink = "" // Represents img of specific placemark
    let name = ""
    let showPlacmemark = false; // If a placemark gets selected, this will be turned to true


    onMount(async () => {
        placemarkList = await placemarkService.getPlacemarks();
        filteredCategoryList = await placemarkService.getCategoriesByMail(userMail); // get all categories of the specific user
    });


    /**
     * Shows placemark-details on screen, if event gets triggered in SingleCategory
     *
     * @param e Placemark, which will be displayed
     */
    const showPlacemarkDetails = (e) => {

        // all variables get initialized
        description = e.detail.description
        lng = e.detail.longitude
        lat = e.detail.latitude
        imgLink = e.detail.img
        name = e.detail.name
        // Show placemark on map
        placemarkMap.addPlacemarkMarker(e.detail)
    };

    const hidePlacemarkDetails = (e) => {
        showPlacmemark = e.detail
    };



</script>
<header>
    <b>Your Categories: </b>
</header>

{#if accordionShowing}
    <AccordionElement  on:click={() => accordionShowing = !accordionShowing}/>
{/if}
<div class="columns">

{#if filteredCategoryList.length > 0}
    <div class="column is-four-fifths">
    {#each filteredCategoryList as category}
        <SingleCategory {category}
                        {placemarkList} on:click={() => accordionShowing = !accordionShowing} on:showPlacemark={showPlacemarkDetails}
                        on:hidePlacemark={hidePlacemarkDetails}
        />
    {/each}

    </div>
    <div class="column is-three-quarters">

    {#if description.length > 0 && showPlacmemark}
        <div class="title">You selected: {name}</div>
        <div class="columns">
            <div class="column">
               <input bind:value={lng} class="input" id="name"
                                                                name="name" placeholder="" type="text" readonly>
            </div>
            <div class="column">
           <input bind:value={lat} class="input" id=""
                                                                name="name" placeholder="" type="text" readonly>
            </div>
        </div>

        <textarea class="textarea has-fixed-size" bind:value={description}  id="description"
                  name="description" placeholder="" readonly></textarea>
        <br>
        <img src={imgLink} alt="">

    {/if}
    </div>
{:else}
    <b>Oops, it seems like you didn't add any Categories yet.
        Start adding Categories and placemarks right <a href="/#/add">here!</a></b>
{/if}

</div>


<style>

    img {
        border: 1px solid #6d00cc;
    }


    header {
        width: 100%;
        color: black;
        margin-bottom: 20px;
        font-size: 23px

    }

    input {
        border-color: #6d00cc;
    }

    textarea {
        border-color: #6d00cc;
    }


    p {
        font-size: 1.2rem;
        text-align: justify;
        padding: 10px 10px 5px;
        margin: auto 0;
    }

    section.open-panel div {
        width: 100%;
        display: flex;
        justify-content: center;
    }

</style>