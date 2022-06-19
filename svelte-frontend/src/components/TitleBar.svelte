<script>
    import map_dashboard from "/src/assets/map_dashboard.png"
    import {user} from "../stores.js"

    export let title = "";
    export let subTitle = "";
</script>

<div class="columns has-text-centered m-2">
<div class="column">
    <a href="/">
        <img src="{map_dashboard}" width="60" alt="img"/>
    </a>
    </div>
    <div class="column">
        <div class="title is-5"> {title} </div>
        <div class="subtitle is-5"> {subTitle} </div>
    </div>
    <div class="column has-text-centered m-2">
        {#if $user.email}
            <div class="is-size-7">{"Welcome, " + $user.email} </div>
        {:else}
            <div class="is-size-7"></div>
        {/if}
    </div>
</div>

<div id="footer">
    <p>&copy Linus Schlepp 2022</p>
</div>
<style>

    #footer {
        position:fixed;
        bottom:10px;
        right: 12px
    }
</style>