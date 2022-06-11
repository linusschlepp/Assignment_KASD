<script>
    import {push} from "svelte-spa-router";
    import {getContext} from "svelte";

    let email = ""
    let password = "";
    let errorMessage = "";

    const placemarkService = getContext("PlacemarkService");

    async function login() {
        let success = await placemarkService.login(email, password)
        if(success) {
            push("/category")
        }else{
            email = "";
            password = "";
            errorMessage = "Invalid Credentials";
        }
    }
</script>

<div class="box">


        <ul style="list-style-type:disc;">
            <li class="subtitle is-5 is-spaced">The memories</li>
            <li class="subtitle is-5 is-spaced">The Places he or she has visited through out the lifes</li>
            <li class="subtitle is-5 is-spaced">Her/ His loved ones</li>
        </ul>
      <p class="subtitle is-5 is-spaced">  Placemark is web tool, which enables you to connect all these three things together.
        You can safe, categorize your favourite Memories as Places on a Map. In the description you can add,
          who shares those special memories with you. And you can even add pictures!  </p>
</div>



<style>


    button {
        background-color: #6d00cc;
        color: white;
        font-weight: bold;
    }


    ul li::before {
        content: "\2022";
        color: red;
        font-weight: bold;
        display: inline-block;
        width: 1em;
        margin-left: -1em;
    }


    input {
        border-color: #6d00cc;
    }

    textarea {
        border-color: #6d00cc;
    }
</style>