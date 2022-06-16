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
    let description = ""
    export let placemarkMap = null
    let lng = ""
    let lat = ""
    let imgLink = ""
    let name = ""
    let show = false;


    onMount(async () => {
        placemarkList = await placemarkService.getPlacemarks();
        filteredCategoryList = await placemarkService.getFilteredCategoryList(userMail);
        console.log("hallo")
        console.log(placemarkMap)
    });

    const changeModal = () => {
        modalShowing = true;
        description = ""
    }
    const changeDescription = (e) => {

        description = e.detail.description
        lng = e.detail.longitude
        lat = e.detail.latitude
        imgLink = e.detail.img
        name = e.detail.name
        placemarkMap.addPlacemarkMarker(e.detail)
    };

    const destroyDescription = (e) => {

        show = e.detail

    };



</script>
<header>
    <b>Your Categories: </b>
</header>

{#if modalShowing}
    <MapModal mapurl={continentMap} on:click={() => {modalShowing = false; description=""}}/>
{/if}
<div class="columns">

{#if filteredCategoryList.length > 0}
    <div class="column is-four-fifths">
    {#each filteredCategoryList as category}
        <SingleCategory {category}
                        {placemarkList} on:click={() => changeModal()} on:addDescription={changeDescription}
                        on:destroyDescription={destroyDescription}
        />
    {/each}

    </div>
    <div class="column is-three-quarters">

    {#if description.length > 0 && show}
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
        Start adding Categories and placemarks right <a href="/#/category">here!</a></b>
{/if}

</div>


<style>

    img {
        border: 1px solid #6d00cc;
    }

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

    input {
        border-color: #6d00cc;
    }

    textarea {
        border-color: #6d00cc;
    }


    .heading {
        font-size: 1.5rem;
    }

    p {
        font-size: 1.2rem;
        text-align: justify;
        padding: 10px 10px 5px;
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
        height: 500px;
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