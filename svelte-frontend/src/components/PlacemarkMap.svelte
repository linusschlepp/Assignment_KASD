<script>
    import 'leaflet/dist/leaflet.css';
    import {LeafletMap} from '../services/leaflet-map';
    import {getContext, onMount} from "svelte";
    import {user} from "../stores.js"


    const placemarkService = getContext("PlacemarkService")


    const mapConfig = {
        location: {lat: 49.013432, lng: 12.101624},
        zoom: 8,
        minZoom: 1,
    };
    let userMail = $user.email
    let map = null;
    let userList = []
    let activeUser = null
    let categoryList = []
    let placemarkList = []
    let placemarks = []

    onMount(async () => {

        // TODO: Make extra service for these variables
        userList = await placemarkService.getUsers();
        userList = userList.filter(userArray => userArray.email === userMail);
        activeUser = userList[0];
        categoryList = await placemarkService.getCategories();
        categoryList = categoryList.filter(category => category.userid === activeUser._id)
        placemarkList = await placemarkService.getPlacemarks();
        const map = new LeafletMap("placemark-map", mapConfig);
        map.showZoomControl();
        map.addLayerGroup("Placemarks")
        map.showLayerControl();


        for (const category of categoryList) {
            for (const placemark of placemarkList) {
                if (placemark.categoryid === category._id)
                    placemarks.push(placemark)
            }
        }


        placemarks.forEach(placemark => {
            const placemarkStr = `${placemark.name} ${placemark.description}` ;
            map.addMarker({lat: placemark.latitude, lng: placemark.longitude}, placemarkStr, "Placemarks");
        });
        // TODO: Check why function does not work
        export function addPlacemarkMarker(placemark) {
            const placemarkStr = `${placemark.name} ${placemark.description}` ;
            map.addMarker({lat: placemark.latitude, lng: placemark.longitude}, placemarkStr, "Placemarks");
            map.moveTo(11, {lat: placemark.latitude, lng: placemark.longitude})
        }

    });


</script>

<div class="box" id="placemark-map" style="height:800px">
</div>