<script>

    import CategoryList from "../components/CategoryList.svelte";
    import TitleBar from "../components/TitleBar.svelte";
    import MainNavigator from "../components/MainNavigator.svelte";
</script>

<div class="columns is-vcentered">
    <div class="column is-two-thirds">
        <TitleBar subTitle={"Mark your favourite places!"} title={"Placemark"}/>
    </div>
    <div class="column">
        <MainNavigator/>
    </div>
</div>

<div class="hidden md:block w-full md:w-2/12 ml-auto">
    <CategoryList/>
</div>