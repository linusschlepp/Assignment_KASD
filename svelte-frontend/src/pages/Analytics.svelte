<script>

    import TitleBar from "../components/TitleBar.svelte";
    import MainNavigator from "../components/MainNavigator.svelte";
    import Chart from 'svelte-frappe-charts';
    import {getContext, onMount} from "svelte";
    import {user} from "../stores.js"


    let userMail = $user.email; // email of the current user
    let selectedChart = "None"
    let filteredPlacemarkList = []
    let filteredCategoryList = []
    let placemarkList = []
    let categoryList = []
    let userList = []

    const placemarkService = getContext("PlacemarkService");

    // Safes all placemark related data, gets displayed as bar-chart
    let dataBarPlacemark = {
        labels: ["Your Amount of placemarks", "Placemarks User-Average"],

        datasets: [
            {
                values: [0, 0]
            }
        ]
    };

    // Safes all category related data, gets displayed as bar-chart
    let dataBarCategory = {
        labels: ["Your Amount of Categories", "Categories User-Average"],
        datasets: [
            {
                values: [0, 0]
            }
        ]
    };

    // Safes all category related data, gets displayed as pie-chart
    let dataPieCategory = {
        labels: ["Your Categories", "Total Categories of all users"],

        datasets: [
            {
                values: [0, 0],

            }
        ]
    };

    // Safes all placemark related data, gets displayed as pie-chart
    let dataPiePlacemark = {
        labels: ["Your Placemarks", "Total Placemarks of all users"],
        datasets: [
            {
                values: [0, 0]
            }
        ],
    };




    onMount(async () => {
        placemarkList = await placemarkService.getPlacemarks();
        categoryList = await placemarkService.getCategories()
        userList = await placemarkService.getUsers();
        filteredPlacemarkList = await placemarkService.getPlacemarksByMail(userMail, placemarkList); // gets all placemarks of the current user
        filteredCategoryList = await placemarkService.getCategoriesByMail(userMail); // get all categories of the current user

        // Fills the different datasets with values

        // Compares placemarks of user to user average
        dataBarPlacemark.datasets[0].values[0] = filteredPlacemarkList.length
        dataBarPlacemark.datasets[0].values[1] = placemarkList.length / userList.length

        // Compares categories of user to user average
        dataBarCategory.datasets[0].values[0] = filteredCategoryList.length
        dataBarCategory.datasets[0].values[1] = categoryList.length / userList.length

        // Compares categories of user to total amount of categories
        dataPieCategory.datasets[0].values[0] = filteredCategoryList.length
        dataPieCategory.datasets[0].values[1] = categoryList.length

        // Compares placemarks of user to total amount of placemarks
        dataPiePlacemark.datasets[0].values[0] = filteredPlacemarkList.length
        dataPiePlacemark.datasets[0].values[1] = placemarkList.length
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

<div class="field">
    <label class="title">Select a Chart-Type</label>
    <br>
    <br>
    <div style="border-color: #6d00cc" class="select">
        <select bind:value={selectedChart}>
            <option>BarCharts</option>
            <option>PieCharts</option>
            <option>Both</option>
            <option>None</option>
        </select>
    </div>
</div>
<br>
{#if selectedChart !== "None"}
    {#if selectedChart === "BarCharts" || selectedChart === "Both" }
        <div class="columns">
            <div class="column has-text-centered">
                <h1 class="title is-4">Your amount of Placemarks compared to the general User-Average</h1>
                <Chart style="width: 500px; height:300px" data={dataBarPlacemark} type="bar"/>
                {#if filteredPlacemarkList.length > categoryList.length / userList.length}
                    <div class="subtitle">Wow, you are in front of the general User-Average in terms of Placemarks, keep it up!</div>
                {:else}
                    <div class="subtitle">Oops, you are behind of the general User-Average in terms of Placemarks, come on, go and create some <a href="/#/add">here!</a></div>
                {/if}
            </div>
            <div class="column has-text-centered">
                <h1 class="title is-4">Your amount of Categories compared to the general User-Average</h1>
                <Chart style="width: 500px; height:300px" data={dataBarCategory} type="bar"/>
                {#if filteredCategoryList.length > categoryList.length / userList.length}
                    <div class="subtitle">Wow, you are in front of the general user-average in terms of Categories, keep it up!</div>
                {:else}
                    <div class="subtitle">Oops, you are behind of the general user-average in terms of Categories, come on, go and create some <a href="/#/add">here!</a></div>
                {/if}
            </div>

        </div>
        <br>
        <br>
    {/if}
    {#if selectedChart === "PieCharts" || selectedChart === "Both" }
        <div class="columns">
            <div class="column has-text-centered">
                <h1 class="title is-4">Your Placemarks make up {Math.round((filteredPlacemarkList.length/placemarkList.length)*100)}% of the total amount of placemarks</h1>
                <Chart style="width: 500px; height:300px" data={dataPiePlacemark} type="pie"/>
                {#if (filteredPlacemarkList.length/placemarkList.length)*100 >= 50 }
                    <div class="subtitle">Wow! That's a lot Placemarks, keep it up!</div>
                {:else if (filteredPlacemarkList.length/placemarkList.length)*100 >= 20}
                    <div class="subtitle">Impressive, but you can still do better add expand your Placemark-Collection!</div>
                {:else}
                    <div class="subtitle">Come on, go and some Placemarks here <a href="/#/add">here!</a></div>
                {/if}
            </div>
            <div class="column  has-text-centered">
                <h1 class="title is-4">Your Categories make up {Math.round((filteredCategoryList.length/categoryList.length)*100)}% of the total amount of categories</h1>
                <Chart style="width: 500px; height:300px" data={dataPieCategory} type="pie"/>
                {#if (filteredCategoryList.length/categoryList.length)*100 >= 50 }
                    <div class="subtitle">Wow! That's a lot Categories, keep it up!</div>
                {:else if (filteredCategoryList.length/categoryList.length)*100 >= 20}
                    <div class="subtitle">Impressive, but you can still do better add expand your Category-Collection!</div>
                {:else}
                    <div class="subtitle">Come on, go and some Categories here <a href="/#/add">here!</a></div>
                {/if}
            </div>
        </div>
    {/if}
{:else}
    <b>Oops, it seems like, you didn't select a Chart-Type. Go and start selecting a Chart-Type
        above.</b>
{/if}



<style>

    select {
        border: 1px solid #6d00cc;
        outline: 0;
        background-color: transparent;
    }


</style>
