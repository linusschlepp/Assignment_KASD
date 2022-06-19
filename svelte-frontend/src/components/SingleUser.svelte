<script>

    import {getContext, onMount} from "svelte";

    export let user;
    let openSubTable = false
    let newMail = ""
    let newLastName = ""
    let newFirstName = ""
    let newPassword = ""
    let newAdmin;
    let filteredPlacemarkList = []
    let filteredCategoryList = []
    let placemarkList = []

    let placemarkService = getContext("PlacemarkService")


    /**
     * Deletes user by id, uses the api to delete out of the database
     *
     * @param _id id of the user, which is going to be deleted
     * @returns {Promise<void>}
     * @private
     */
    async function deleteUserById(_id) {

        // Api call
        await placemarkService.deleteUserById(_id)
        // page is reloaded after deletion to show changes
        location.reload()
    }

    /**
     *  Updates a user, uses the api to update the placemark in the database
     *
     * @param user User object, which is getting updated
     * @returns {Promise<void>}
     */
    async function updateUserById(user) {

        /**
         * Creates new user object, if the values differ from the original they are reassigned
         * if not, they stay the same
         */
        const newUser = {
            email: newMail !== "" ? newMail : user.email,
            firstName: newFirstName !== "" ? newFirstName : user.firstName,
            lastName: newLastName !== "" ? newLastName : user.lastName,
            password: newPassword !== "" ? newPassword : user.password,
            admin: newAdmin === "Admin", // If the user selected "Admin" in the dropdown, admin will be set to true
            _id: user._id
        }
        // Api call
        await placemarkService.updateUserById(user._id, newUser)

        //   openSubTable = !openSubTable

        // page is reloaded after edit to show changes
        location.reload()
    }


    onMount(async () => {
        placemarkList = await placemarkService.getPlacemarks(); // get all placemarks
        filteredCategoryList = await placemarkService.getCategoriesByMail(user.email); // get all categories of the specific user
        filteredPlacemarkList = await placemarkService.getPlacemarksByMail(user.email, placemarkList); // get all placemarks of the specific user
    });

</script>
<tr>
    <td>
        {user._id}
    </td>
    <td>
        {user.lastName}
    </td>
    <td>
        {user.firstName}
    </td>
    <td>
        {user.email}
    </td>
    <td>
        {filteredPlacemarkList.length}
    </td>
    <td>
        {filteredCategoryList.length}
    </td>
    <td>
        {#if user.admin }
            Admin

        {:else}
            No admin
        {/if}

    </td>

    <td>
        <button class="button is-rounded" on:click={() => deleteUserById(user._id)}>
            Delete
        </button>
    </td>
    <td>
        <button class="button is-rounded" on:click={() => openSubTable = !openSubTable}>
            Edit
        </button>
    </td>
</tr>
{#if openSubTable}
    <tr>
        <td>
            <b>Edit User: {user._id}</b>
        </td>
        <td>
            <input bind:value={newLastName} style="width: 200px" type="text" class="input"
                   placeholder="{user.lastName}">
        </td>
        <td>
            <input bind:value={newFirstName} style="width: 200px" type="text" class="input"
                   placeholder="{user.firstName}">
        </td>

        <td>
            <input bind:value={newMail} style="width: 250px" type="email" class="input" placeholder="{user.email}">
        </td>

        <td>

            <input bind:value={newPassword} style="width: 150px" type="password" class="input"
                   placeholder="{user.password}">
        </td>
        <td></td>

        <td>
            <div style="border-color: #6d00cc" class="select">
                <select bind:value={newAdmin}>
                    {#if user.admin}
                        <option>Admin</option>
                        <option>No Admin</option>
                    {:else}
                        <option>No Admin</option>
                        <option>Admin</option>
                    {/if}
                </select>
            </div>
        </td>


        <td>
            <button class="button is-rounded" on:click={() => updateUserById(user)}>
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

    select {
        border: 1px solid #6d00cc;
        outline: 0;
        background-color: transparent;
    }


    input {
        border-color: #6d00cc;
    }

</style>