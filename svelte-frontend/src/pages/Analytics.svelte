<script>

    import TitleBar from "../components/TitleBar.svelte";
    import MainNavigator from "../components/MainNavigator.svelte";
    import Chart from 'svelte-frappe-charts';
    import {getContext, onMount} from "svelte";
    import {user} from "../stores.js"


    let userMail = $user.email;
    let selectedChart = ""
    let specificPlacemarkList = []
    let specificCategoryList = []
    let placemarkList = []
    let categoryList = []

    const placemarkService = getContext("PlacemarkService");


    let dataBarPlacemark = {
        labels: ["Your Amount of placemarks", "Placemarks User-Average"],

        datasets: [
            {
                values: [0, 0]
            }
        ]
    };


    let dataBarCategory = {
        labels: ["Your Amount of Categories", "Categories User-Average"],
        datasets: [
            {
                values: [0, 0]
            }
        ]
    };

    let dataPieCategory = {
        labels: ["Your Categories", "Total Categories of all users"],

        datasets: [
            {
                values: [0, 0],

            }
        ]


    };


    let dataPiePlacemark = {
        labels: ["Your Placemarks", "Total Placemarks of all users"],
        datasets: [
            {
                values: [0, 0]
            }
        ],
    };

    function remove_duplicates(arr) {
        var obj = {};
        var ret_arr = [];
        for (var i = 0; i < arr.length; i++) {
            obj[arr[i]] = true;
        }
        for (var key in obj) {
            ret_arr.push(key);
        }
        return ret_arr;
    }


    onMount(async () => {
        placemarkList = await placemarkService.getPlacemarks();
        categoryList = await placemarkService.getCategories()
        let userList = await placemarkService.getUsers();
        specificPlacemarkList = await placemarkService.getFilteredPlacemarkList(userMail, placemarkList)
        specificCategoryList = await placemarkService.getFilteredCategoryList(userMail)


        // TODO: figure this out remove_duplicate
        userList = userList.filter((item, pos) => { return userList.indexOf(item) === pos});
        userList = remove_duplicates(userList)


        dataBarPlacemark.datasets[0].values[0] = specificPlacemarkList.length
        dataBarPlacemark.datasets[0].values[1] = placemarkList.length / userList.length

        dataBarCategory.datasets[0].values[0] = specificCategoryList.length
        dataBarCategory.datasets[0].values[1] = categoryList.length / userList.length


        dataPieCategory.datasets[0].values[0] = specificCategoryList.length
        dataPieCategory.datasets[0].values[1] = categoryList.length


        dataPiePlacemark.datasets[0].values[0] = specificPlacemarkList.length
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
            <option></option>
        </select>
    </div>
</div>
<br>
{#if selectedChart.length > 0}
    {#if selectedChart === "BarCharts" || selectedChart === "Both" }
        <div class="columns">
            <div class="column has-text-centered">
                <h1 class="title is-4">Your amount of Placemarks compared to the general User-Average</h1>
                <Chart style="width: 500px; height:300px" data={dataBarPlacemark} type="bar"/>
                {#if specificPlacemarkList.length > placemarkList.length}
                    <div class="subtitle">Wow, you are in front of the general User-Average in terms of Placemarks, keep it up!</div>
                {:else}
                    <div class="subtitle">Oops, you are behind of the general User-Average in terms of Placemarks, come on, go and create some <a href="/#/add">here!</a></div>
                {/if}
            </div>
            <div class="column has-text-centered">
                <h1 class="title is-4">Your amount of Categories compared to the general User-Average</h1>
                <Chart style="width: 500px; height:300px" data={dataBarCategory} type="bar"/>
                {#if specificCategoryList.length > categoryList.length}
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
                <h1 class="title is-4">Your Placemarks make up {(specificPlacemarkList.length/placemarkList.length)*100}% of the total amount of placemarks</h1>
                <Chart style="width: 500px; height:300px" data={dataPiePlacemark} type="pie"/>
                {#if (specificPlacemarkList.length/placemarkList.length)*100 >= 50 }
                    <div class="subtitle">Wow! That's a lot Placemarks, keep it up!</div>
                {:else if (specificPlacemarkList.length/placemarkList.length)*100 >= 20}
                    <div class="subtitle">Impressive, but you can still do better add expand your Placemark-Collection!</div>
                {:else}
                    <div class="subtitle">Come on, go and some Placemarks here <a href="/#/add">here!</a></div>
                {/if}
            </div>
            <div class="column  has-text-centered">
                <h1 class="title is-4">Your Categories make up {(specificCategoryList.length/categoryList.length)*100}% of the total amount of categories</h1>
                <Chart style="width: 500px; height:300px" data={dataPieCategory} type="pie"/>
                {#if (specificCategoryList.length/categoryList.length)*100 >= 50 }
                    <div class="subtitle">Wow! That's a lot Categories, keep it up!</div>
                {:else if (specificCategoryList.length/categoryList.length)*100 >= 20}
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
