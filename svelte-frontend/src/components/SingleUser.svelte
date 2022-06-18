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

    let placemarkService = getContext("PlacemarkService")


    async function changeIsOpen() {
        openSubTable = !openSubTable
    }

    async function deleteUserById_(_id) {

        const response = await placemarkService.deleteUserById_(_id)
        location.reload()
    }

    async function updateUserById(user) {

        const newUser = {
            email: newMail !== "" ? newMail : user.email,
            firstName: newFirstName !== "" ? newFirstName : user.firstName,
            lastName: newLastName !== "" ? newLastName : user.lastName,
            password: newPassword !== "" ? newPassword : user.password,
            admin: newAdmin === "Admin",
            _id: user._id
        }

        const response = await placemarkService.updateUserById(user._id, newUser)

        openSubTable = !openSubTable

        location.reload()
    }


    onMount(async () => {
        let placemarkList = await placemarkService.getPlacemarks();
        filteredCategoryList = await placemarkService.getFilteredCategoryList(user.email);
        filteredPlacemarkList = await placemarkService.getFilteredPlacemarkList(user.email, placemarkList);

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
        <button class="button is-rounded" on:click={() => deleteUserById_(user._id)}>
            Delete
        </button>
    </td>
    <td>
        <button class="button is-rounded" on:click={changeIsOpen}>
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
                    <!--                    <option>{user.admin}</option>-->
                    <!--                    <option>{!user.admin}</option>-->
                </select>
            </div>
        </td>


        <td>
            <button class="button is-rounded" on:click={() => updateUserById(user)}>
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

    select {
        border: 1px solid #6d00cc;
        outline: 0;
        background-color: transparent;
    }


    input {
        border-color: #6d00cc;
    }

</style>