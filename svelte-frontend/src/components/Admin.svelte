<script>

    import TitleBar from "../components/TitleBar.svelte";
    import MainNavigator from "../components/MainNavigator.svelte";
    import Chart from 'svelte-frappe-charts';
    import {getContext, onMount} from "svelte";
    import {user} from "../stores.js"
    import axios from "axios";
    import SingleUser from "./SingleUser.svelte";


    let userMail = $user.email;
    let selectedChart = ""
    let userList = []
    let activeUser = ""
    let isAdmin = false
    let openSubTable = false;


    const placemarkService = getContext("PlacemarkService");




    onMount(async () => {
        let placemarkList = await placemarkService.getPlacemarks();
        let filteredCategoryList = await placemarkService.getFilteredCategoryList(userMail);
        userList = await placemarkService.getUsers();
        let activeUser = userList.find(user => user.email === userMail)
        console.log(activeUser)
        console.log(activeUser.admin)
        isAdmin = activeUser.admin
        console.log(filteredCategoryList.length)
    });







</script>


<div class="columns is-vcentered">
    <div class="column is-two-thirds">
        <TitleBar subTitle={"Donation Analytics"} title={"Donation Services Inc."}/>
    </div>
    <div class="column">
        <MainNavigator/>
    </div>


</div>

<div class="title">Admin Board</div>
{#if isAdmin}
<div class="title is-4">List of Users</div>
    <div class="title is-5">Total amount of users: {userList.length}</div>
    <table class="table is-fullwidth">
        <thead>
        <th>Id</th>
        <th>Last Name</th>
        <th>First Name</th>
        <th>Email</th>
        <th>Status</th>
        <th></th>
        <th></th>
        </thead>
        <tbody>
        {#each userList as user}
            <SingleUser {user}/>
<!--                <tr>-->
<!--                    <td>-->
<!--                        {user._id}-->
<!--                    </td>-->
<!--                    <td>-->
<!--                        {user.lastName}-->
<!--                    </td>-->
<!--                    <td>-->
<!--                        {user.firstName}-->
<!--                    </td>-->
<!--                    <td>-->
<!--                        {user.email}-->
<!--                    </td>-->
<!--                    <td>-->
<!--                        {#if user.admin }-->
<!--                            Admin-->

<!--                        {:else}-->
<!--                            No admin-->
<!--                        {/if}-->

<!--                    </td>-->
<!--               -->
<!--                    <td>-->
<!--                        <button class="button is-rounded" on:click={() => deleteUserById_(user._id)}>-->
<!--                            Delete-->
<!--                        </button>-->
<!--                    </td>-->
<!--                    <td>-->
<!--                        <button class="button is-rounded" on:click={changeIsOpen}>-->
<!--                            Edit-->
<!--                        </button>-->
<!--                        {#if openSubTable}-->
<!--                            <table class="table is-fullwidth">-->
<!--                                <thead>-->
<!--                                <th>First Name</th>-->
<!--                                <th>Last Name</th>-->
<!--                                <th>Admin </th>-->
<!--                                </thead>-->
<!--                                <tbody>-->
<!--                                <tr>-->
<!--                                    <td>-->
<!--                                        <input type="text" class="input">-->
<!--                                    </td>-->
<!--                                    <td>-->
<!--                                        <input type="text" class="input">-->
<!--                                    </td>-->
<!--                                    <td>-->
<!--                                        <input type="text" class="input">-->
<!--                                    </td>-->
<!--                                </tr>-->
<!--                                </tbody>-->
<!--                            </table>-->
<!--                        {/if}-->

<!--                    </td>-->
<!--                </tr>-->
        {/each}
    </table>
{:else}
    <b>Oops, in order to get access to this view, you must contact an admin and apply for admin-rights!</b>
{/if}


<style>
    button {
        background-color: #6d00cc;
        color: white;
        font-weight: bold;
    }

</style>