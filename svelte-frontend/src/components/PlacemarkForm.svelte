<script>
    import {getContext, onMount} from "svelte";
    import Coordinates from "./Coordinates.svelte";
    import {user} from "../stores.js"


    const placemarkService = getContext("PlacemarkService");

    let name = "";
    let description = ""

    let filteredCategoryList = [];
    let selectedCategory = "";
    let userMail = $user.email // email of current user
    let imageObject = "";
    let lat = 49.013432;
    let lng = 12.101624;

    let message = "";

    onMount(async () => {
        filteredCategoryList = await placemarkService.getCategoriesByMail(userMail) // get all categories of the specific user


        // Displays the selected file-name in the corresponding input field
        const fileInput = document.querySelector(".file-input");
        fileInput.onchange = () => {
            if (fileInput.files.length > 0) {
                const fileName = document.querySelector(".file-name");
                fileName.textContent = fileInput.files[0].name;

            }
        };
    });

    /**
     * Removes the file-name from the input, if the x-button is being pressed
     *
     */
    function removeImageName() {

        const fileInput = document.querySelector(".file-input");
        if (fileInput.files.length > 0) {
            const fileName = document.querySelector(".file-name");
            fileName.textContent = ""
        }

    }

    /**
     * Generates new placemark object
     *
     * @returns {Promise<void>}
     */
    async function generatePlacemark() {

        // If imageObject is empty (no image selected) it gets assigned to "  " in order for jwt to work
        imageObject = imageObject.length === 0 ? " " : imageObject;

        // Check if essential data has been selected
        if (selectedCategory && name && description) {
            // Get corresponding category
            const category = filteredCategoryList.find(category => category.name === selectedCategory);
            // New placemark gets created
            const newPlacemark = {
                name: name,
                description: description,
                img: imageObject,
                categoryid: category._id,
                latitude: lat,
                longitude: lng
            };
            // Api call
            const success = await placemarkService.addPlacemark(newPlacemark, category);
            if (!success) {
                // If api call was unsuccessful, this message gets displayed
                message = "Placemark could not be added - some error occured";
                return;
            }
            message = `You added ${name} to ${category.name}`;
        } else {
            // If api call was successful, this message gets displayed
            message = "Please select name, description and category";
        }
    }

    /**
     * Saves image-file and saves it as a String in imageObject
     *
     * @param e Event, which is dispatched, when adding the file (contains the file)
     */
    const onFileSelected = (e) => {
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
            // imageObject gets assigned to the file data
            imageObject = e.target.result
        };
    }


</script>

<form on:submit|preventDefault={generatePlacemark}>
    <div class="field">
        <label class="label" for="name">Enter Name</label> <input bind:value={name} class="input" id="name"
                                                                  name="name" placeholder="Name" type="text">
    </div>

    <div class="field">
        <label class="label" for="description">Enter Description</label> <textarea bind:value={description}
                                                                                   class="textarea has-fixed-size"
                                                                                   id="description"
                                                                                   name="description"
                                                                                   placeholder="Description"></textarea>
    </div>
    <div class="field">
        <label class="label">Select Category</label>
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
            <div style="border: 1px solid #6d00cc;" id="file-select" class="file has-name is-fullwidth">
                <label on:submit={removeImageName} class="file-label"> <input on:change={(e)=>onFileSelected(e)}
                                                                              id="file-selector" class="file-input"
                                                                              type="file"
                                                                              name="imagefile"
                                                                              accept="image/png, image/jpeg">
                    <span class="file-cta">
            <span class="file-icon">
            </span>
            <span class="file-label">
              Choose a file…
            </span>
           </span>
                    <span class="file-name"></span>
                </label>
                <button style="background-color: #6d00cc" class="button is-info">x</button>
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



    input {
        border-color: #6d00cc;
    }


    button {
        background-color: #6d00cc;
        color: white;
        font-weight: bold;
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