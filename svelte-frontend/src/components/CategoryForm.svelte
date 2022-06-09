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

    let message = "Add categories";

    onMount(async () => {
        userList = await placemarkService.getUsers();
        userList = userList.filter(userArray => userArray.email === userMail);
        activeUser = userList[0];
        categoryList = await placemarkService.getCategories();
        categoryList = categoryList.filter(category => category.userid === activeUser._id)
        placemarkList = await placemarkService.getPlacemarks();
    });

    async function generateCategory() {
        if (name) {
           // const categoryName = selectedCategory
       //     const category = categoryList.find(category => category.name === categoryName);
            const category = {
                name: name,
                userid: activeUser._id,
            };
            const success = await placemarkService.addCategory_(category);
            if (!success) {
                message = "Some error occurred";
                return;
            }
            message = `You added ${name}`;
            dispatch("message", {
                placemark: category,
            });
        } else {
            message = "Please select a name";
        }
    }
</script>

<form on:submit|preventDefault={generateCategory}>
    <div class="field">
        <label class="label" for="name">Enter Name</label> <input bind:value={name} class="input" id="name"
                                                                  name="name" placeholder="Name" type="text">
    </div>
    <div class="field">
        <div class="control">
            <button class="button is-link is-light">Add Category</button>
        </div>
    </div>
    <div class="section">
        {message}
    </div>
</form>

