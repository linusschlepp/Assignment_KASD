<script>
    import {createEventDispatcher, getContext} from "svelte";
    import SinglePlacemark from "./SinglePlacemark.svelte";

    let openSubTable = false;
    var isOpen;
    let dispatch = createEventDispatcher();
    export let category;
    export let placemarkList;
    let newName = "";


    const placemarkService = getContext("PlacemarkService");

    /**
     * Deletes category by id, uses the api to delete out of the database
     *
     * @param _id id of the category, which is going to be deleted
     * @returns {Promise<void>}
     * @private
     */
    async function deleteCategoryById(_id) {

        // Api call
        await placemarkService.deleteCategoryById(_id)
        // page is reloaded after deletion to show changes
        location.reload()
    }

    /**
     * Updates a category, uses the api to update the placemark in the database
     *
     * @param category Category object, which is getting updated
     * @returns {Promise<void>}
     */
    async function updateCategoryById(category) {

        // TODO: Remove commented out code:
        // openSubTable = !openSubTable

        /**
         * Creates new category object, if the values differ from the original they are reassigned
         * if not, they stay the same
         */
        const newCategory = {
            name: newName.length === 0 ? category.name : newName,
            userid: category.userid,
            _id: category._id

        }
        // Api call
        await placemarkService.updateCategoryById(category._id, newCategory);
        // page is reloaded after edit to show changes
        location.reload()

    }


    /**
     * If the user clicks on the name of the placemark, an event gets dispatched and details of the placemark
     * are shown on the screen
     *
     * @param placemark Placemark, which is shown on screen
     */
    async function showPlacemarkDetails(placemark){

        dispatch("showPlacemark", placemark)
    }

    async function dispatchDestroy(){
        dispatch("hidePlacemark", isOpen)
    }

    async function changeIsOpen() {
        isOpen = !isOpen

        dispatch("hidePlacemark", isOpen)
    }

    /**
     * Filters the table (my-table) according to the input (my-input) of the user in the input field
     */
    function filterTable() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("my-input");
        filter = input.value.toUpperCase();
        table = document.getElementById("my-table");
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
            <button class="button is-rounded" on:click={() => deleteCategoryById(category._id)}>Delete</button>
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
                <button class="button is-rounded" on:click={() => updateCategoryById(category)}>Ok</button>
            </div>
        </div>

    {/if}


    {#if placemarkList.filter(placemark => placemark.categoryid === category._id).length > 0 }
        <b style="font-size: 19px">Placemarks of {category.name}: </b>
        <input style="width: 350px" id="my-input" class="input" type="text" on:keyup={filterTable}
               placeholder="Search for placemark by name...">
        <table class="table is-fullwidth" id="my-table">
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
                    <SinglePlacemark {placemark} {category} on:hidePlacemark={dispatchDestroy} on:showPlacemark={showPlacemarkDetails(placemark)}/>
                {/if}
            {/each}
        </table>
    {:else}
        <b>Oops, it seems like {category.name} is empty,
            start adding placemarks right <a href="/#/add">here!</a> </b>
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