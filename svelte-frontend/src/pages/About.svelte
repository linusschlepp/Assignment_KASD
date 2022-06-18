<script>
    import WelcomeNavigator from "../components/WelcomeNavigator.svelte";
    import TitleBar from "../components/TitleBar.svelte";
    import AboutForm from "../components/AboutForm.svelte";

</script>

<div class="columns is-vcentered">
    <div class="column is-two-thirds">
        <TitleBar title={"Placemark"} subTitle={"All about Placemark"}/>
    </div>
    <div class="column">
        <WelcomeNavigator/>
    </div>
</div>

<div class="columns">
    <div class="column">
        <h1 class="title">About Placemark</h1>
        <b class="subtitle">What defines a person?</b>
        <br>
        <br>
        <AboutForm/>
    </div>
</div>