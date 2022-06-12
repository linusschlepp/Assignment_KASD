<script>
    import {createEventDispatcher, getContext} from "svelte";
import axios from "axios";
import {push} from "svelte-spa-router";
import PlacemarkMap from "../components/PlacemarkMap.svelte";
import CategoryList from "./CategoryList.svelte";


var isOpen;
let dispatch = createEventDispatcher();
export let category;
export let placemarkList
export let placemarkMap
export let description

    const placemarkStore = getContext("PlacemarkStore");

async function deletePlacemarkById_(_id) {
    console.log("hier drin")
   // await placemarkStore.deletePlacemarkById_(_id)
    const response = await axios.delete(`http://localhost:4000/api/placemarks/${_id}`)
    console.log(response)
}


async function deleteCategoryById_(_id) {
    console.log("hier drin")
    // await placemarkStore.deletePlacemarkById_(_id)
    const response = await axios.delete(`http://localhost:4000/api/categories/${_id}`)
}

function pushToTextArea(descriptionPlacemark){
        console.log(event.detail.placemark)
        // TODO: function does not work
    console.log(descriptionPlacemark)
    console.log(dispatch("addDescription", descriptionPlacemark))
    dispatch("addDescription", descriptionPlacemark)
}


</script>
<button class:active={isOpen} class="accordion" on:click={() => isOpen= !isOpen}>

    <span class="heading">{category.name}</span>
    {#if isOpen}
        <span class="icon">&minus;</span>
    {:else}
        <span class="icon">&plus;</span>
    {/if}

</button>

<section class:open-panel={isOpen} class="panel">
    <div class="columns is-vcentered content">
        <div class="column">
    <b style="font-size: 22px">{category.name}</b>
        </div>
        <div class="column">
    <button class="button is-rounded" on:click={() => deleteCategoryById_(category._id)} >Delete</button>
        </div>
    </div>
    {#if placemarkList.filter(placemark => placemark.categoryid === category._id).length > 0 }
        <b style="font-size: 19px">Placemarks of {category.name}: </b>
    <table class="table is-fullwidth">
        <thead>
        <th>Name</th>
        <th>Longtitude</th>
        <th>Latitude</th>
        <th></th>
        </thead>
        <tbody>
        {#each placemarkList as placemark}
            {#if placemark.categoryid === category._id}
                <tr>
                    <td>
                       <a on:click={() => pushToTextArea(placemark.description)}>{placemark.name}</a>

                    </td>
                    <td>
                        {placemark.longitude}
                    </td>
                    <td>
                        {placemark.latitude}
                    </td>
                    <td>
                        <button class="button is-rounded" on:click={() => deletePlacemarkById_(placemark._id)} >Delete</button>
                    </td>
                </tr>
            {/if}
        {/each}
    </table>
            {:else}
            <b>Oops, it seems like {category.name} is empty,
                start adding placemarks right <a href="/#/category">here!</a> </b>
            {/if}


</section>


<style>
    button.accordion {
        width: 100%;
        padding: 15px;
        margin: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        text-align: left;
        color: #401E12;
        border: 1px solid white;
        cursor: pointer;
        transition: .3s;
    }

    button.accordion:hover,
    button.accordion.active {
        background-color: #6d00cc;
        color: white;
    }

    .heading {
        font-size: 27px;
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
        height: 170px;
        box-shadow: inset 0 0 5px transparent;
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
        background-color: #6d00cc;
        padding: 10px 0;
        margin: 10px 10px 20px;
        cursor: pointer;
    }

    button {
        background-color: #6d00cc;
        color: white;
        font-weight: bold;
    }

    div button:active {
        background-color: #6d00cc;
    }
</style>