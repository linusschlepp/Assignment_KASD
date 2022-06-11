<script>
    import {getContext, onMount} from "svelte";
    import Coordinates from "./Coordinates.svelte";
    import {user} from "../stores.js"


    const placemarkService = getContext("PlacemarkService");

    let name = "";
    let description = ""

    let categoryList = [];
    let userList = [];
    let activeUser = null;
    let placemarkList = []
    let userMail = $user.email

    let message = "";

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
            <button class="button is-rounded">Add Category</button>
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
    </style>