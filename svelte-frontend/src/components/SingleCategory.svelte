<script>var isOpen;
var isOpen;

export let category;
export let content;
export let learnmore;
export let placemarkList

// let isOpen;
</script>


<button class:active={isOpen} class="accordion" on:click={() => isOpen= !isOpen}>
    <span class="heading">{category.name}</span>
    {#if isOpen}
        <span class="icon">&minus;</span>
    {:else}
        <span class="icon">&plus;</span>
    {/if}
</button>

<section class:open-panel={isOpen} class="panel">
    <b style="font-size: 22px">Placemarks of {category.name}</b>
<table class="table is-fullwidth">
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
                                {/if}
                        {/each}
                    </table>
</section>



<style>
    button.accordion {
        width: 100%;
        padding: 15px;
        margin: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #D9CDBF;
        text-align: left;
        color: #401E12;
        border: 1px solid black;
        cursor: pointer;
        transition: .3s;
    }

    button.accordion:hover,
    button.accordion.active {
        background-color: #005F8C;
        color: white;
    }

    .heading {
        font-size: 1.5rem;
    }

    p {
        font-size: 1.2rem;
        text-align: justify;
        padding: 10px 10px 5px;
        margin: auto 0;
    }

    span.icon {
        font-size: 1.8rem;
    }

    section.panel {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 0;
        overflow: auto;
        transition: all .5s;
    }

    section.open-panel {
        height: 170px;
        box-shadow: inset 0 0 5px transparent;
    }

    section.open-panel div {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    section div button {
        width: 150px;
        font-weight: bold;
        color: white;
        background-color: hsl(11, 63%, 40%);
        padding: 10px 0;
        margin: 10px 10px 20px;
        cursor: pointer;
    }

    div button:active {
        background-color: hsl(11, 63%, 34%);
    }
</style>