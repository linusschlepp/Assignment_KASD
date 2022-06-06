<script>
    import {createEventDispatcher, getContext, onMount} from "svelte";
    import Coordinates from "./Coordinates.svelte";
    import {user} from "../stores.js"

    const dispatch = createEventDispatcher();

    const placemarkService = getContext("PlacemarkService");

    let name = "";
    let description = ""

    let categoryList = [];
    let userList = [];
    let activeUser = null;
    let placemarkList = []
    let selectedCategory = "";
    let userMail = $user.email

    let lat = 52.160858;
    let lng = -7.152420;

    let message = "Add placemarks";

    onMount(async () => {
        userList = await placemarkService.getUsers();
        userList = userList.filter(userArray => userArray.email === userMail);
        activeUser = userList[0];
        categoryList = await placemarkService.getCategories();
        categoryList = categoryList.filter(category => category.userid === activeUser._id)
        placemarkList = await placemarkService.getPlacemarks();
    });

    async function generatePlacemark() {
        if (selectedCategory && name && description) {
            const categoryName = selectedCategory
            const category = categoryList.find(category => category.name === categoryName);
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
        <label class="label" for="description">Enter Description</label> <input bind:value={description} class="input" id="description"
                                                                      name="amount" placeholder="Description" type="text">
    </div>
    <div class="field">
        <label class="label" >Select Category</label>
        <div class="select">
            <select bind:value={selectedCategory}>
                {#each categoryList as category}
                    <option>{category.name}</option>
                {/each}
            </select>
        </div>
    </div>
    <Coordinates bind:lat={lat} bind:lng={lng}/>
    <div class="field">
        <div class="control">
            <button class="button is-link is-light">Add Placemark</button>
        </div>
    </div>
    <div class="section">
        {message}
    </div>
</form>

