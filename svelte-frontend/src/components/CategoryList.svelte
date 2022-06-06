<script>
    import {getContext, onMount} from 'svelte'
    import {user} from "../stores.js"

    const placemarkService = getContext("PlacemarkService");
    let categoryList = [];
    let userList = [];
    let activeUser = null;
    let userMail = $user.email
    let placemarkList = []

    onMount(async () => {
        userList = await placemarkService.getUsers();
        userList = userList.filter(userArray => userArray.email === userMail);
        activeUser = userList[0];
       // categoryList = await placemarkService.getCategoriesByUserId(activeUser);
        categoryList = await placemarkService.getCategories();
        // TODO: Discard api-routes, filter process can also be achieved in .svelte-file
        categoryList = categoryList.filter(category => category.userid === activeUser._id)
        placemarkList = await placemarkService.getPlacemarks();
        console.log(placemarkList)
        console.log(categoryList)

    });
</script>

<table class="table is-fullwidth">
    <thead>
    <th>Name</th>
    </thead>
    <tbody>
    {#each categoryList as category}
        <tr>
            <td>
                {category.name}
            </td>
        </tr>
        <thead>
        <th>Longtitude</th>
        <th>Latitude</th>
        <th>Name</th>
        <th>Description</th>
        </thead>
        <tbody>
        {#each placemarkList as placemark}
            {#if placemark.categoryid === category._id}
                <tr>
                    <td>
                        {placemark.longitude}
                    </td>
                    <td>
                        {placemark.latitude}
                    </td>
                    <td>
                        {placemark.name}
                    </td>
                    <td>
                        {placemark.description}
                    </td>
                </tr>
             


            {/if}
            {/each}
        {/each}
        </tbody>
        </table>