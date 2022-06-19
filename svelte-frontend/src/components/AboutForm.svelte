<script>
    import {push} from "svelte-spa-router";
    import {getContext} from "svelte";
    import map_dashboard from "/src/assets/map_dashboard.png";


    const placemarkService = getContext("PlacemarkService");



</script>

<ul style="list-style-type:disc;">
    <li class="subtitle is-5 is-spaced">The memories a person has collected</li>
    <li class="subtitle is-5 is-spaced">The places the person has visited through out the life</li>
</ul>
<br>
<div style="margin: 10px ; text-align: center" class="subtitle is-5 is-spaced"> Placemark enables you to connect your
    memories and favourite places.
    You can safe, categorize and even add pictures to your favourite memories as places on a map. <br> In the
    description you can add
    special details about your favourite places. So what are you waiting for? Start revisiting and adding your favourite
    places and <a href="/#/signup">signup!</a>
</div>
<br>
<img class="center" style="text-align: center" width="300" src="{map_dashboard}" id="image-map" alt="map">
<br>



<style>

    button {
        background-color: #6d00cc;
        color: white;
        font-weight: bold;
    }


    input {
        border-color: #6d00cc;
    }

    textarea {
        border-color: #6d00cc;
    }

    .center {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }


</style>