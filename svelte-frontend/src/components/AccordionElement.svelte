<script>
    import { fade, fly } from 'svelte/transition';
</script>



<div id="myAccordion" class="accordion" transition:fade>


    <div class="accordion-content" in:fly={{ y: -500 }} out:fade>
        <span class="close" on:click>&times;</span>
    </div>

</div>


<style>
    .accordion {
        display: block;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.4);
    }
    .accordion-content {
        background-color: #fefefe;
        margin: 15% auto;
        text-align: center;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
    }

    img {
        width: 50%;
    }

    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }
</style>