<!--<script>-->
<!--    import 'leaflet/dist/leaflet.css';-->
<!--    import {LeafletMap} from '../services/leaflet-map';-->
<!--    import {getContext, onMount} from "svelte";-->
<!--    import {user} from "../stores.js"-->


<!--    const placemarkService = getContext("PlacemarkService")-->
<!--    const mapConfig = {-->
<!--        location: {lat: 49.013432, lng: 12.101624},-->
<!--        zoom: 8,-->
<!--        minZoom: 1,-->
<!--    };-->
<!--    let userMail = $user.email-->
<!--    let map = null;-->
<!--    let filteredCategoryList = []-->
<!--    let placemarkList = []-->
<!--    let placemarks = []-->

<!--    onMount(async () => {-->
<!--        const map = new LeafletMap("placemark-map", mapConfig);-->
<!--        placemarkList = await placemarkService.getPlacemarks();-->
<!--        filteredCategoryList = await placemarkService.getFilteredCategoryList(userMail);-->
<!--        filteredCategoryList = await placemarkService.getCategories();-->

<!--        map.showZoomControl();-->
<!--        map.addLayerGroup("Placemarks")-->
<!--        map.showLayerControl();-->


<!--        for (const category of filteredCategoryList) {-->
<!--            for (const placemark of placemarkList) {-->
<!--                if (placemark.categoryid === category._id)-->
<!--                    placemarks.push(placemark)-->
<!--            }-->
<!--        }-->

<!--        placemarks.forEach(placemark => {-->
<!--            // const placemarkStr = `${placemark.name} ${placemark.description}` ;-->
<!--            // map.addMarker({lat: placemark.latitude, lng: placemark.longitude}, placemarkStr, "Placemarks");-->
<!--            addPlacemarkMarker(placemark);-->
<!--        });-->
<!--    });-->

<!--        export function addPlacemarkMarker(placemark) {-->
<!--            const placemarkStr = `${placemark.name} ${placemark.description}` ;-->
<!--            console.log("Map" +map)-->
<!--            map.addMarker({lat: placemark.latitude, lng: placemark.longitude}, placemarkStr, "Placemarks");-->
<!--            map.moveTo(11, {lat: placemark.latitude, lng: placemark.longitude});-->
<!--        }-->




<!--</script>-->

<!--<div class="box" id="placemark-map" style="height:800px">-->
<!--</div>-->


<script>
    import 'leaflet/dist/leaflet.css';
    import {LeafletMap} from '../services/leaflet-map';
    import {getContext, onMount} from "svelte";
    import {user} from "../stores.js"

    const placemarkService = getContext("PlacemarkService");

    const mapConfig = {
        location: {lat: 52.160858, lng: -7.152420},
        zoom: 8,
        minZoom: 1,
    };
    let filteredCategoryList = []
    let placemarks = []
    let userMail = $user.email;
    let map = null;

    onMount(async () => {
        map = new LeafletMap("donation-map", mapConfig);
        map.showZoomControl();
        map.addLayerGroup('Donations');
        map.showLayerControl();

        const donations = await placemarkService.getPlacemarks();
        filteredCategoryList = await placemarkService.getFilteredCategoryList(userMail);
        donations.forEach(placemark => {
            if(filteredCategoryList.map(category => category._id).includes(placemark.categoryid))
            addPlacemarkMarker(placemark);
        });
    });

    export function addPlacemarkMarker(placemark) {
        const placemarkStr = `${placemark.name}`;
        console.log(placemark)
        map.addMarker({lat: placemark.latitude, lng: placemark.longitude}, placemarkStr, "Donations");
        map.moveTo(11, {lat: placemark.latitude, lng: placemark.longitude});
    }
</script>

<div class="box" id="donation-map" style="height:800px"></div>