<script>
    import {createEventDispatcher, getContext, onMount} from "svelte";
    import Coordinates from "./Coordinates.svelte";
    import {user} from "../stores.js"

    const dispatch = createEventDispatcher();

    const placemarkService = getContext("PlacemarkService");

    let name = "";
    let description = ""

    let filteredCategoryList = [];
    let selectedCategory = "";
    let userMail = $user.email

    let lat = 52.160858;
    let lng = -7.152420;

    let message = "";

    onMount(async () => {
        filteredCategoryList = await placemarkService.getFilteredCategoryList(userMail)
    });

    async function generatePlacemark() {
        if (selectedCategory && name && description) {
            const category = filteredCategoryList.find(category => category.name === selectedCategory);
            const placemark = {
                name: name,
                description: description,
                categoryid: category._id,
                latitude: lat,
                longitude: lng
            };
            const success = await placemarkService.addPlacemark_(placemark, category);
            if (!success) {
                message = "Donation not completed - some error occurred";
                return;
            }
            message = `You added ${name} to ${category.name}`;
            dispatch("message", {
                placemark: placemark,
            });
        } else {
            message = "Please select name, description and category";
        }
    }
</script>

<form on:submit|preventDefault={generatePlacemark}>
    <div class="field">
        <label class="label" for="name">Enter Name</label> <input bind:value={name} class="input" id="name"
                                                                      name="name" placeholder="Name" type="text">
    </div>

    <div class="field">
        <label class="label" for="description">Enter Description</label> <textarea bind:value={description} class="textarea" id="description"
                                                                      name="description" placeholder="Description"></textarea>
    </div>
    <div class="field">
        <label class="label" >Select Category</label>
        <div class="select">
            <select bind:value={selectedCategory}>
                {#each filteredCategoryList as category}
                    <option>{category.name}</option>
                {/each}
            </select>
        </div>
    </div>
    <Coordinates bind:lat={lat} bind:lng={lng}/>
    <div class="field">
        <div class="control">
            <button class="button is-rounded">Add Placemark</button>
        </div>
    </div>
    <div class="section">
        {message}
    </div>
</form>

<style>


    button {
        background-color: #6d00cc;
        color: white;
        font-weight: bold;
    }


    input {
        border-color: #6d00cc;
    }

    textarea {
        border-color: #6d00cc;
    }
</style>