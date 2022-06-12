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
    let imageName = ""
    let imageObject = null

    let message = "";

    onMount(async () => {
        userList = await placemarkService.getUsers();
        userList = userList.filter(userArray => userArray.email === userMail);
        activeUser = userList[0];
        categoryList = await placemarkService.getCategories();
        categoryList = categoryList.filter(category => category.userid === activeUser._id)
        placemarkList = await placemarkService.getPlacemarks();

        const fileInput = document.querySelector(".file-input");
        fileInput.onchange = () => {
            if (fileInput.files.length > 0) {
                const fileName = document.querySelector(".file-name");
                fileName.textContent = fileInput.files[0].name;
                imageObject = fileInput.files[0]
                imageName = fileName.textContent
            }
        };
    });

    function removeImageName() {
        imageName = ""

        const fileInput = document.querySelector(".file-input");

        if (fileInput.files.length > 0) {
            const fileName = document.querySelector(".file-name");
            fileName.textContent = imageName
        }
        console.log(imageName)
    }
    async function generateCategory() {

            console.log(imageObject)
        if (name) {
            const category = {
                name: name,
               // img1: imageObject,
                img: imageName,
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


    <div class="card-content">
        <label class="label" for="name">(Optional) Add Image</label>
        <form on:click={removeImageName}>
            <div id="file-select" class="file has-name is-fullwidth">
                <label on:submit={removeImageName} class="file-label"> <input id="file-selector" class="file-input" type="file"
                                                                              name="imagefile"
                                                                              accept="image/png, image/jpeg">
                    <span class="file-cta">
            <span class="file-icon">
<!--              <i class="fas fa-upload"></i>-->
            </span>
            <span class="file-label">
              Choose a file…
            </span>
           </span>
                    <span class="file-name"></span>
                </label>
                <button on:click={imageName = ""} style="background-color: #6d00cc" class="button is-info">x</button>
            </div>
        </form>
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