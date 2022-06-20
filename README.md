# Final Assigment in Advanced Fullstack Development of Linus Schlepp 


* Check it out in [this](https://github.com/linusschlepp/Assignment_KASD) GitHub repository. <br>
* Check out [my video]() regarding this project. 

 Notice: This project contains [Handlebars](https://handlebarsjs.com/), handlebars has only been implemented for testing purposes and is <u>not</u> meant to be used for the frontend.

## About

I called my Assigment "Placemark". Placemark enables the user to store placemarks and categorize them. The user is able to add images, names,
longitude and latitude to the individual placemarks. The user must authenticate via [Jwt](https://jwt.io/) in order to access the website. Each placemark is visible on a map, powered by [Leaflet](https://leafletjs.com/) and the pictures of the placemarks can be viewed in a Gallery. 
Those images are hosted on [Cloudinary](https://cloudinary.com/). The different datasets (Users, Categories, Placemarks) are stored in a [mongodb](https://www.mongodb.com/cloud/atlas/lp/try2-de?utm_source=google&utm_campaign=gs_emea_germany_search_core_brand_atlas_desktop&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624524&adgroup=115749704783&gclid=CjwKCAjw77WVBhBuEiwAJ-YoJLefdXwJTXGPbzm2Jx-LqjGXi4lQbZ_K4sKP8Xt6PYSBFs7RzEDIThoCRB8QAvD_BwE)
Database and are structured according to this UML-Class-Diagram: <br>
![](https://github.com/linusschlepp/Assignment_KASD/blob/master/svelte-frontend/src/assets/uml_diagramm.jpg)


The backend uses [Hapi](https://hapi.dev/) while the frontend is written in [Svelte](https://svelte.dev/) and is integrating design-elements from [Bulma](https://bulma.io/). Front- and backend communicate via an api, which is powered by [Axios](https://github.com/axios/axios)
and documented according to the [Open API Swagger Standard](https://www.openapis.org/).



## How to run this application 

Clone this repository in your file-directory, like this: ``git clone https://github.com/linusschlepp/Assignment_KASD.git``

Or unzip the folder, using a tool like [7ip](https://www.7-zip.de/).

#### Run this command in the terminal/ powershell in order to start the frontend (you have to be positioned in "svelte-frontend" folder)
![](https://github.com/linusschlepp/Assignment_KASD/blob/master/svelte-frontend/src/assets/start_frontend.jpg)

#### Run this command in the terminal/ powershell in order to start the backend (you have to be positioned in the "Assigment" folder)
![](https://github.com/linusschlepp/Assignment_KASD/blob/master/svelte-frontend/src/assets/start_backend.jpg)

After cloning or opening this project in the IDE, don't forget to run: ``npm install``

Now, you should be good to go!

## Self evaluation
![](https://github.com/linusschlepp/Assignment_KASD/blob/master/svelte-frontend/src/assets/grading_rubrik.png)

In the following I will discuss the grading rubric row by row:

* In the first row every task has been completed. Regarding git, just run: ``git log`` to inspect the commit history. I have also implemented a mem-store, which is never used because, mongo is the standard.
* In the second row every task has been completed. A Json-store has also been implemented, but is never used as well. 
* In the third row every task has been completed. To check out the tagged releases, by running: ``git tag``.
* In the fourth row every task has been completed. Except the hosting on Heroku, this still needs to be achieved. To check out the different branches just run: ``git branch``. To access the admin Dashboard, create an account with the email ```placemark@admin.com``` admin-rights will be assigned automatically.



