
<script>
    import 'leaflet/dist/leaflet.css';
    import {LeafletMap} from '../services/leaflet-map';
    import {getContext, onMount} from "svelte";
    import {user} from "../stores.js"

    const placemarkService = getContext("PlacemarkService");

    const mapConfig = {
        location: {lat: 49.013432, lng: 12.101624},
        zoom: 8,
        minZoom: 1,
    };
    let filteredCategoryList = []
    let placemarks = []
    let userMail = $user.email; // email of current user
    let map = null;
    let placemarkList;

    onMount(async () => {
        map = new LeafletMap("placemark-map", mapConfig); // Map-object is getting created
        map.showZoomControl();
        map.addLayerGroup('Placemarks'); // Add layers
        map.showLayerControl();

        placemarkList = await placemarkService.getPlacemarks(); // get all placemarks
        filteredCategoryList = await placemarkService.getCategoriesByMail(userMail); // get all categories of specific user
        // Iterates through all the placemarks and adds them to the map, if they belong to the specific user
        placemarkList.forEach(placemark => {
            // Compares the id of categories with the category id of the placemark, if they match the placemark is added to the map
            if(filteredCategoryList.map(category => category._id).includes(placemark.categoryid))
            addPlacemarkMarker(placemark);
        });
    });

    /**
     * Adds placemark to the map by adding a marker and zooming to the place
     *
     * @param placemark Placemark, which is getting added to the map
     */
    export function addPlacemarkMarker(placemark) {
        const placemarkStr = `${placemark.name}`;
        map.addMarker({lat: placemark.latitude, lng: placemark.longitude}, placemarkStr, "Placemarks");
        map.moveTo(11, {lat: placemark.latitude, lng: placemark.longitude});
    }
</script>

<div class="box" id="placemark-map" style="height:800px"></div>