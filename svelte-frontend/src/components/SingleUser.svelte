<script>

    import {getContext, onMount} from "svelte";

    import axios from "axios";

    export let user;
    let openSubTable = false
    let newMail = ""
    let newLastName = ""
    let newFirstName = ""
    let newAdmin;
    let otherData;
    let filteredPlacemarkList = []
    let filteredCategoryList = []

    let placemarkService = getContext("PlacemarkService")


    async function changeIsOpen() {
        openSubTable = !openSubTable
    }

    async function deleteUserById_(_id) {

        const response = await axios.delete(`http://localhost:4000/api/users/${_id}`)
    }

    async function updateUserById(user) {

        const newUser = {
            email: newMail !== "" ? newMail : user.email,
            firstName: newFirstName !== "" ? newFirstName : user.firstName,
            lastName: newLastName !== "" ? newLastName : user.lastName,
            password: user.password,
            admin: newAdmin,
            _id: user._id
        }

        const response = await placemarkService.updateUserById(user._id, newUser)

        openSubTable = !openSubTable

        await update()
    }


    onMount(async () => {
        let placemarkList = await placemarkService.getPlacemarks();
        filteredCategoryList = await placemarkService.getFilteredCategoryList(user.email);
        filteredPlacemarkList = await placemarkService.getFilteredPlacemarkList(user.email, placemarkList);

    });


    async function update() {
        const res = await fetch();
        otherData = await res.json();
    }
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
        {#if openSubTable}
            <table class="table is-fullwidth">
                <thead>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Admin</th>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <input bind:value={newMail} style="width: 250px" type="email" class="input" placeholder="{user.email}">
                    </td>
                    <td>
                        <input bind:value={newFirstName} style="width: 200px"  type="text" class="input" placeholder="{user.firstName}">
                    </td>
                    <td>
                        <input bind:value={newLastName} style="width: 200px" type="text" class="input" placeholder="{user.lastName}">
                    </td>
                    <td>
                        <!--                                        <input bind:value={newAdmin}  type="text" class="input">-->

                        <div style="border-color: #6d00cc" class="select">
                            <select bind:value={newAdmin}>
                                <option>{user.admin}</option>
                                <option>{!user.admin}</option>
                            </select>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="columns">
                <div class="column">
            <button class="button is-rounded" on:click={() => updateUserById(user)}>
                Ok
            </button>
                </div>
                    <div class="column">
                    <button class="button is-rounded" on:click={changeIsOpen}>
                        x
                    </button>
                    </div>
            </div>
        {/if}

    </td>
</tr>


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