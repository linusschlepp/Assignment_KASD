<script>

    import {createEventDispatcher, getContext} from "svelte";
    import {push} from "svelte-spa-router";

    export let placemark;
    export let category;
    let dispatch = createEventDispatcher();
    let newName = "";
    let newDescription = "";
    let newLng = placemark.longitude;
    let newLat = placemark.latitude;
    let openSubTable = false // if true subTable (edit-menu) gets openened, if false subTable stays hidden

    let placemarkService = getContext("PlacemarkService")

    /**
     * Deletes placemark by id, uses the api to delete out of the database
     *
     * @param _id id of the placemark, which is going to be deleted
     * @returns {Promise<void>}
     * @private
     */
    async function deletePlacemarkById(_id) {
        // Api call
        await placemarkService.deletePlacemarkById(_id)
        // page is reloaded after deletion to show changes
        location.reload()
    }

    /**
     * If the user clicks on the name of the placemark, an event gets dispatched and details of the placemark
     * are shown on the screen
     *
     * @param placemark Placemark, which is shown on screen
     */
    function showPlacemarkDetails(placemark) {

        dispatch("showPlacemark", placemark)
    }

    /**
     * Updates a placemark, uses the api to update the placemark in the database
     *
     * @param placemark Placemark object, which is getting updated
     * @returns {Promise<void>}
     */
    async function updatePlacemarkById(placemark) {
        /**
         * Creates new placemark object, if the values differ from the original they are reassigned
         * if not, they stay the same
         */
        const newPlacemark = {
            name: newName.length === 0 ? placemark.name : newName,
            description: newDescription.length === 0 ? placemark.description : newDescription,
            longitude: newLng,
            latitude: newLat,
            categoryid: category._id,
            img: placemark.img,
            _id: placemark._id
        }

        // Api call
        await placemarkService.updatePlacemarkById(placemark._id, newPlacemark)
        // page is reloaded after edit to show changes
        location.reload()
    }

</script>


<tr>
    <td>
        <a on:click={() => showPlacemarkDetails(placemark)}>{placemark.name}</a>

    </td>

    <td>
        {placemark.longitude}
    </td>
    <td>
        {placemark.latitude}
    </td>
    <td>
        <button class="button is-rounded" on:click={() => deletePlacemarkById(placemark._id)}>
            Delete
        </button>
    </td>
    <td>
        <button class="button is-rounded" on:click={() => openSubTable = !openSubTable}>
            Edit
        </button>
</tr>

{#if openSubTable}
    <tr>
        <td>
            <input bind:value={newName} style="width: 100px" type="email" class="input"
                   placeholder="{placemark.name}">
        </td>
        <td>
            <input bind:value={newLng} style="width: 100px" type="number" class="input"
                   placeholder="{placemark.longitude}">
        </td>
        <td>
            <input bind:value={newLat} style="width: 100px" type="number" class="input"
                   placeholder="{placemark.latitude}">
        </td>
        <td>
                        <textarea style="width: 100px; height:50px" bind:value={newDescription} class="textarea"
                                  placeholder="{placemark.description}"></textarea>
        </td>

        <td>
            <button class="button is-rounded" on:click={updatePlacemarkById(placemark)}>
                Ok
            </button>
        </td>
        <td>
            <button class="button is-rounded" on:click={() => openSubTable = !openSubTable}>
                x
            </button>
        </td>
    </tr>
{/if}


<style>
    button {
        background-color: #6d00cc;
        color: white;
        font-weight: bold;
    }

</style>