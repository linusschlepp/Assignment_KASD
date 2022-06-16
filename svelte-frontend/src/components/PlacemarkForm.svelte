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
    let imageName = ""
    let imageObject = null;

    let lat = 52.160858;
    let lng = -7.152420;

    let message = "";

    onMount(async () => {
        filteredCategoryList = await placemarkService.getFilteredCategoryList(userMail)
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

    }

    async function generatePlacemark() {

        imageName = imageName.length === 0 ? "test" : imageName;

        if (selectedCategory && name && description) {
            const category = filteredCategoryList.find(category => category.name === selectedCategory);
            const placemark = {
                name: name,
                description: description,
                img : imageName,
                categoryid: category._id,
                latitude: lat,
                longitude: lng
            };
            const success = await placemarkService.addPlacemark_(placemark, category);
            if (!success) {
                message = "Placemark could not be added - some error occured";
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
        <label class="label" for="description">Enter Description</label> <textarea bind:value={description} class="textarea has-fixed-size" id="description"
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
    <div class="card-content">
        <label style="border-color: #6d00cc" class="label" for="name">(Optional) Add Image</label>
        <form on:click={removeImageName}>
            <div id="file-select" class="file has-name is-fullwidth">
                <label on:submit={removeImageName} class="file-label"> <input id="file-selector" class="file-input" type="file"
                                                                              name="imagefile"
                                                                              accept="image/png, image/jpeg">
                    <span class="file-cta">
            <span class="file-icon">
<!--              <i class="fas fa-upload"></i>-->
            </span>
            <span  class="file-label">
              Choose a file…
            </span>
           </span>
                    <span class="file-name"></span>
                </label>
                <button on:click={imageName = ""} style="background-color: #6d00cc" class="button is-info">x</button>
            </div>
        </form>
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



     select {
         border: 1px solid #6d00cc;
         outline: 0;
         background-color: transparent;
     }



</style>