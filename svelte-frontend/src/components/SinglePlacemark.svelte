<script>

    import axios from "axios";
    import {createEventDispatcher, getContext} from "svelte";

    export let placemark;
    export let category;
    let dispatch = createEventDispatcher();
    let newName = "";
    let newDescription = "";
    let newLng = 0;
    let newLat = 0;
    let openSubTable = false

    let placemarkService = getContext("PlacemarkService")


    async function deletePlacemarkById_(_id) {
        console.log("hier drin")
        // await placemarkStore.deletePlacemarkById_(_id)
        const response = await axios.delete(`http://localhost:4000/api/placemarks/${_id}`)
        console.log(response)
    }


    function pushToTextArea(placemark) {

        // selectedPlacemark = true;
        dispatch("addDescription", placemark)
    }

    async function changeIsOpen() {
        openSubTable = !openSubTable
    }


    async function updatePlacemarkById(placemark) {


        const newPlacemark = {
            name: newName.length === 0 ? placemark.name : newName,
            description: newDescription.length === 0 ? placemark.description : newDescription,
            longitude: newLng === 0 ? placemark.longitude : newLng,
            latitude: newLat === 0 ? placemark.latitude : newLat,
            categoryid: category._id,
            img: placemark.img,
            _id: placemark._id
        }

        const response = await placemarkService.updatePlacemarkById(placemark._id, newPlacemark)

        openSubTable = !openSubTable
    }

</script>


<tr>
    <td>
        <a on:click={() => pushToTextArea(placemark)}>{placemark.name}</a>

    </td>

    <td>
        {placemark.longitude}
    </td>
    <td>
        {placemark.latitude}
    </td>
    <td>
        <button class="button is-rounded" on:click={() => deletePlacemarkById_(placemark._id)}>
            Delete
        </button>
    </td>
    <td>
        <button class="button is-rounded" on:click={changeIsOpen}>
            Edit
        </button>
        <!--{#if openSubTable}-->
        <!--    <table>-->
        <!--        <thead>-->
        <!--        <th>Name</th>-->
        <!--        <th>Longitude</th>-->
        <!--        <th>Latitude</th>-->
        <!--        <th>Description</th>-->
        <!--        </thead>-->
        <!--        <tbody>-->
        <!--        <tr>-->
        <!--            <td>-->
        <!--                <input bind:value={newName} style="width: 250px" type="email" class="input"-->
        <!--                       placeholder="{placemark.name}">-->
        <!--            </td>-->
        <!--            <td>-->
        <!--                <input bind:value={newLng} style="width: 200px" type="number" class="input"-->
        <!--                       placeholder="{placemark.longitude}">-->
        <!--            </td>-->
        <!--            <td>-->
        <!--                <input bind:value={newLat} style="width: 200px" type="number" class="input"-->
        <!--                       placeholder="{placemark.latitude}">-->
        <!--            </td>-->
        <!--            <td>-->
        <!--                <textarea style="width: 500px" bind:value={newDescription} class="textarea"-->
        <!--                          placeholder="{placemark.description}"></textarea>-->
        <!--            </td>-->
        <!--        </tr>-->
        <!--        </tbody>-->
        <!--    </table>-->
        <!--    <div class="columns">-->
        <!--        <div class="column">-->
        <!--            <button class="button is-rounded" on:click={updatePlacemarkById(placemark)}>-->
        <!--                Ok-->
        <!--            </button>-->
        <!--        </div>-->
        <!--        <div class="column">-->
        <!--            <button class="button is-rounded" on:click={changeIsOpen}>-->
        <!--                x-->
        <!--            </button>-->
        <!--        </div>-->
        <!--    </div>-->
        <!--{/if}-->

    </td>

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
            <button class="button is-rounded" on:click={changeIsOpen}>
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