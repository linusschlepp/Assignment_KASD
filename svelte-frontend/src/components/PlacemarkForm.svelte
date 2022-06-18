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
    let imageObject = "";
    let lat = 49.013432;
    let lng = 12.101624;

    let message = "";

    onMount(async () => {
        filteredCategoryList = await placemarkService.getFilteredCategoryList(userMail)

        const fileInput = document.querySelector(".file-input");
        fileInput.onchange = () => {
            if (fileInput.files.length > 0) {
                const fileName = document.querySelector(".file-name");
                fileName.textContent = fileInput.files[0].name;

            }
        };

    });

    function removeImageName() {

        const fileInput = document.querySelector(".file-input");
        if (fileInput.files.length > 0) {
            const fileName = document.querySelector(".file-name");
            fileName.textContent = ""
        }

    }

    async function generatePlacemark() {

        imageObject = imageObject.length === 0 ? " " : imageObject;

        if (selectedCategory && name && description) {
            const category = filteredCategoryList.find(category => category.name === selectedCategory);
            const placemark = {
                name: name,
                description: description,
                img : imageObject,
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

    const onFileSelected =(e)=> {
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
            imageObject = e.target.result
            console.log(imageObject)
        };

        console.log(typeof imageObject)

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
            <div style="border: 1px solid #6d00cc;" id="file-select" class="file has-name is-fullwidth">
                <label on:submit={removeImageName} class="file-label"> <input on:change={(e)=>onFileSelected(e)} id="file-selector" class="file-input" type="file"
                                                                              name="imagefile"
                                                                              accept="image/png, image/jpeg">
                    <span class="file-cta">
            <span class="file-icon">
            </span>
            <span   class="file-label">
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
            <button class="button">Add Placemark</button>
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