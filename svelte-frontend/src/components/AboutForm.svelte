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




        <ul style="list-style-type:disc;">
            <li class="subtitle is-5 is-spaced">The memories a person has collected</li>
            <li class="subtitle is-5 is-spaced">The Places the person has visited through out the life</li>
        </ul>
<br>
      <div align="justify" class="subtitle is-4 ">  Placemark enables you to connect your memories and your favourite places.
        You can safe, categorize and picturs to  your favourite Memories as Places on a Map. In the description you can add,
          who shares those special memories with you. And you can even add pictures!  </div>




<style>


    button {
        background-color: #6d00cc;
        color: white;
        font-weight: bold;
    }


    /*ul li::before {*/
    /*    content: "\2022";*/
    /*    color: red;*/
    /*    font-weight: bold;*/
    /*    display: inline-block;*/
    /*    width: 1em;*/
    /*    margin-left: -1em;*/
    /*}*/


    input {
        border-color: #6d00cc;
    }

    textarea {
        border-color: #6d00cc;
    }
</style>