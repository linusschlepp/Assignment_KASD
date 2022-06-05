
<script>
    import {getContext, onMount} from 'svelte'
    import { user } from "../stores.js"

    const placemarkService = getContext("PlacemarkService");
    let categoryList = [];
    let userList = [];
    let activeUser = null;
    let userMail = $user.email

    onMount(async () => {
        userList = await placemarkService.getUsers();
        console.log(userList)
        userList = userList.filter(userArray => userArray.email === userMail);
        console.log(userList)
        activeUser = userList[0];
        console.log(activeUser._id);
        categoryList = await placemarkService.getCategoriesByUserId(activeUser);
        // TODO: Discard api-routes, filter process can also be achieved in .svelte-file
        categoryList = categoryList.filter(category => category.userid === activeUser._id)

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
    {/each}
    </tbody>
</table>