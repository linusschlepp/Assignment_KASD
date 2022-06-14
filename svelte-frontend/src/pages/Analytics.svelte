<script>

    import TitleBar from "../components/TitleBar.svelte";
    import MainNavigator from "../components/MainNavigator.svelte";
    import Chart from 'svelte-frappe-charts';
    import {getContext, onMount} from "svelte";
    import {user} from "../stores.js"


    let userMail = $user.email;
    let userList = []
    let selectedChart = ""

    const placemarkService = getContext("PlacemarkService");

    let dataBarPlacemark = {
        labels: ["Your placemarks", "User average"],
        datasets: [
            {
                values: [0, 0]
            }
        ]
    };


    let dataBarCategory = {
        labels: ["Your Categories", "User average"],
        datasets: [
            {
                values: [0, 0]
            }
        ]
    };
    onMount(async () => {
        let placemarkList = await placemarkService.getPlacemarks();
        let categoryList = await placemarkService.getCategories()
        let userList = await placemarkService.getUsers();
        let specificPlacemarkList = await placemarkService.getFilteredPlacemarkList(userMail, placemarkList)
        let specificCategoryList = await placemarkService.getFilteredCategoryList(userMail)

        dataBarPlacemark.datasets[0].values[0] = specificPlacemarkList.length
        dataBarPlacemark.datasets[0].values[1] = placemarkList.length / userList.length

        dataBarCategory.datasets[0].values[0] = specificCategoryList.length
        dataBarCategory.datasets[0].values[1] = categoryList.length / userList.length

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
    <label class="label" >Select the Chart Type</label>
    <div class="select">
                <select bind:value={selectedChart}>
<!--            <p>BarCharts</p>-->
<!--            <p>PieCharts</p>-->
            <option>BarCharts</option>
            <option>PieCharts</option>
            <option></option>

            <!--{#each filteredCategoryList as category}-->
            <!--    <option>{category.name}</option>-->
            <!--{/each}-->
        </select>
    </div>
</div>
{#if selectedChart.length > 0}




<div class="columns">
    <div class="column box has-text-centered">
        <h1 class="title is-4">Your Placemarks compared to the general User Average</h1>
        <Chart data={dataBarPlacemark} type="bar"/>
    </div>
    <div class="column box has-text-centered">
        <h1 class="title is-4">Your Categories compared to the general User Average</h1>
        <Chart data={dataBarCategory} type="bar"/>
    </div>
</div>

{:else}

    <div class="title">Select a Chart </div>

{/if}
