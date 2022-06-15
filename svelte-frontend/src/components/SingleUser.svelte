<script>

    import {getContext} from "svelte";

    import axios from "axios";

    export let user;
    let openSubTable = false
    let newMail = ""
    let newLastName  = ""
    let newFirstName = ""
    let newAdmin;

    let placemarkService = getContext("PlacemarkService")


    async function changeIsOpen(){
        openSubTable = !openSubTable
    }

    async function deleteUserById_(_id) {

        const response = await axios.delete(`http://localhost:4000/api/users/${_id}`)
    }

    async function changeUser(user) {

        const newUser = {
            email: newMail !== "" ? newMail : user.email,
            firstName: newFirstName !== "" ? newFirstName : user.firstName,
            lastName: newLastName !== "" ? newLastName : user.lastName,
            password: user.password,
            admin: newAdmin === "true",
            _id: user._id
        }

        const response = await placemarkService.updateUserById(user._id, newUser)

        openSubTable = !openSubTable
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
                                        <input bind:value={newMail} type="email" class="input">
                                    </td>
                                    <td>
                                        <input bind:value={newFirstName} type="text" class="input">
                                    </td>
                                    <td>
                                        <input bind:value={newLastName}  type="text" class="input">
                                    </td>
                                    <td>
                                        <input bind:value={newAdmin}  type="text" class="input">
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <button class="button is-rounded" on:click={() => changeUser(user)}>
                                Ok
                            </button>
                        {/if}

                    </td>
                </tr>


<style>
    button {
        background-color: #6d00cc;
        color: white;
        font-weight: bold;
    }

</style>