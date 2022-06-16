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


    function myFunction() {
        console.log("inside")
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[3];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }







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
    <input style="width: 350px" id="myInput" class="input" type="text" on:keyup={myFunction} placeholder="Search for user by mail...">
    <table class="table is-fullwidth"  id="myTable">
        <thead>
        <th>Id</th>
        <th>Last Name</th>
        <th>First Name</th>
        <th>Email</th>
        <th>No. of PMs</th>
        <th>No. of Cat.</th>
        <th>Status</th>
        <th></th>
        <th></th>
        </thead>
        <tbody>
        {#each userList as user}
            <SingleUser {user}/>
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


    input {
        border-color: #6d00cc;
    }

</style>