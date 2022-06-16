<script>
    import {createEventDispatcher, getContext, onMount} from "svelte";
    import axios from "axios";
    import {push} from "svelte-spa-router";
    import PlacemarkMap from "../components/PlacemarkMap.svelte";
    import CategoryList from "./CategoryList.svelte";
    import SinglePlacemark from "./SinglePlacemark.svelte";

    let openSubTable = false;
    var isOpen;
    let dispatch = createEventDispatcher();
    export let category;
    export let placemarkList


    const placemarkStore = getContext("PlacemarkStore");

    async function deletePlacemarkById_(_id) {
        console.log("hier drin")
        // await placemarkStore.deletePlacemarkById_(_id)
        const response = await axios.delete(`http://localhost:4000/api/placemarks/${_id}`)
        console.log(response)
    }


    // onMount(async () => {
    //     selectedPlacemark = false;
    // });

    async function deleteCategoryById_(_id) {
        console.log("hier drin")

        // await placemarkStore.deletePlacemarkById_(_id)
        const response = await axios.delete(`http://localhost:4000/api/categories/${_id}`)
    }


    async function updateCategoryById_(category) {
        openSubTable = !openSubTable


        const newCategory = {
            name: newName.length === 0 ? category.name : newName,
            userid: category.userid,
            _id: category._id

        }

        // const response = await placemarkService.updateCategoryById(category._id, newCategory)
        const response = await axios.put(`http://localhost:4000/api/categories/${category._id}`, newCategory)

        // await placemarkStore.deletePlacemarkById_(_id)
        //   const response = await axios.delete(`http://localhost:4000/api/categories/${_id}`)
    }

    function pushToTextArea(placemark) {

        // selectedPlacemark = true;
        dispatch("addDescription", placemark)

    }

    async function addDescription(placemark){

        dispatch("addDescription", placemark)
    }

    async function dispatchDestroy(){
        dispatch("destroyDescription", isOpen)
    }

    async function changeIsOpen() {
        isOpen = !isOpen

        dispatch("destroyDescription", isOpen)
    }


    function myFunction() {
        console.log("inside")
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    let newName = "";


</script>
<button class:active={isOpen} class="accordion" on:click={changeIsOpen}>

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
            <button class="button is-rounded" on:click={() => deleteCategoryById_(category._id)}>Delete</button>
        </div>
        <div class="column">
            <button class="button is-rounded" on:click={() => openSubTable = !openSubTable}>Edit</button>
        </div>
    </div>

    {#if openSubTable}
        <div class="columns">
            <div class="column">
                <div style="float:left;margin-right:20px;">
                    <label for="name" class="label">Name</label>
                    <input name="name" id="name" bind:value={newName} type="text" class="input"
                           placeholder="{category.name}">
                </div>
            </div>
            <div class="column">
                <button class="button is-rounded" on:click={() => updateCategoryById_(category)}>Ok</button>
            </div>
        </div>

    {/if}


    {#if placemarkList.filter(placemark => placemark.categoryid === category._id).length > 0 }
        <b style="font-size: 19px">Placemarks of {category.name}: </b>
        <input style="width: 350px" id="myInput" class="input" type="text" on:keyup={myFunction}
               placeholder="Search for placemark by name...">
        <table class="table is-fullwidth" id="myTable">
            <thead>
            <th>Name</th>
            <th>Longtitude</th>
            <th>Latitude</th>
            <th></th>
            <th></th>
            </thead>
            <tbody>
            {#each placemarkList as placemark}
                {#if placemark.categoryid === category._id}
<!--                    <tr>-->
<!--                        <td>-->
<!--                            <a on:click={() => pushToTextArea(placemark)}>{placemark.name}</a>-->

<!--                        </td>-->
<!--                        <td>-->
<!--                            {placemark.longitude}-->
<!--                        </td>-->
<!--                        <td>-->
<!--                            {placemark.latitude}-->
<!--                        </td>-->
<!--                        <td>-->
<!--                            <button class="button is-rounded" on:click={() => deletePlacemarkById_(placemark._id)}>-->
<!--                                Delete-->
<!--                            </button>-->
<!--                        </td>-->
<!--                        <td>-->
<!--                            <button class="button is-rounded" on:click={() => deletePlacemarkById_(placemark._id)}>-->
<!--                                Edit-->
<!--                            </button>-->
<!--                        </td>-->

<!--                    </tr>-->
                    <SinglePlacemark {placemark} {category} on:destroyDescription={dispatchDestroy} on:addDescription={addDescription(placemark)}/>
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

    button.accordion {
        border-color: #6d00cc;
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


    input, label {
        display: block;
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