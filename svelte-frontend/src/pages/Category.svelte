<script>

    import CategoryForm from "../components/CategoryForm.svelte";
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

<div class="columns is-vcentered">
    <div class="column has-text-centered">
           </div>
    <div class="column box has-text-centered">
        <h1 class="title is-4">Place your marks!</h1>
        <CategoryForm/>
    </div>
</div>