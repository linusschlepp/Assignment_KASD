<script>
    import map_dashboard from "/src/assets/map_dashboard.png"
    import {user} from "../stores.js"

    export let title = "";
    export let subTitle = "";
</script>

<div class="columns has-text-centered m-2">
<div class="column">
        <img src="{map_dashboard}" width="60" alt="img"/>
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

<!--<div class="footer">-->
<!--   &copy  Linus Schlepp 2022-->
<!--</div>-->
<!--&lt;!&ndash;<footer class="has-text-centered is-flex-align-items-flex-end mt-auto">&ndash;&gt;-->
<!--&lt;!&ndash;    <small>&ndash;&gt;-->
<!--&lt;!&ndash;        <span>Copyright @2022</span>&ndash;&gt;-->
<!--&lt;!&ndash;        <br />&ndash;&gt;-->
<!--&lt;!&ndash;    </small>&ndash;&gt;-->
<!--&lt;!&ndash;    <a href="/">About</a>&ndash;&gt;-->
<!--&lt;!&ndash;</footer>&ndash;&gt;-->
<!--<style>-->

<!--    .footer {-->
<!--       /* position: fixed;*/-->
<!--       /* left: 10px;*/-->
<!--       /*margin-bottom: 5px;*/-->
<!--       /* right: 5px;*/-->
<!--       /* width: 95%;*/-->
<!--       /* color: #6d00cc;*/-->
<!--       /* text-align: center;*/-->
<!--       /* z-index: 950;*/-->


<!--        position: absolute;-->

<!--        bottom: 0;-->

<!--        width: 100%;-->

<!--        z-index: 10000;-->

<!--    }-->

<!--</style>-->