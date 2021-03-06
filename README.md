# Final Assignment in Advanced Fullstack Development by Linus Schlepp 


* Check it out in [this](https://github.com/linusschlepp/Assignment_KASD) GitHub repository. <br>
* Check out [my video](https://www.youtube.com/watch?v=ve4w8w2bVUw&ab_channel=LinusSchlepp) about this project.
* In this [video](https://youtu.be/LCvjCbimfZE), I give a short review of the code, used in this assignment.
* Deployed [Backend](https://polar-bayou-58717.herokuapp.com) on Heroku (contains a mocking-frontend for testing purposes, **not the actual frontend!**)
* Deployed [Frontend](https://timely-crisp-7c2172.netlify.app) on Netlify (actual frontend)

Note: This project contains [Handlebars](https://handlebarsjs.com/), handlebars has only been implemented for testing the backend, it is **not** meant to be used.
##### So please consider: The frontend on Heroku is not the actual frontend of this project. It's just a mockup!

## About

I called my Assignment "Placemark". Placemark enables the user to store placemarks and categorize them. The user is able to add images, names,
longitude and latitude to the individual placemarks. The user must authenticate via [Jwt](https://jwt.io/) in order to login. Each placemark is visible on a map, powered by [Leaflet](https://leafletjs.com/) and the pictures of the placemarks can be viewed in a Gallery. 
Those images are hosted on [Cloudinary](https://cloudinary.com/). The different datasets (Users, Categories, Placemarks) are stored in a [Mongodb](https://www.mongodb.com/cloud/atlas/lp/try2-de?utm_source=google&utm_campaign=gs_emea_germany_search_core_brand_atlas_desktop&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624524&adgroup=115749704783&gclid=CjwKCAjw77WVBhBuEiwAJ-YoJLefdXwJTXGPbzm2Jx-LqjGXi4lQbZ_K4sKP8Xt6PYSBFs7RzEDIThoCRB8QAvD_BwE)
Database and are structured according to this UML-Class-Diagram: <br>
![](https://github.com/linusschlepp/Assignment_KASD/blob/master/svelte-frontend/src/assets/uml_diagramm.jpg)


The backend uses [Hapi](https://hapi.dev/) while the frontend is written in [Svelte](https://svelte.dev/) and is integrating design-elements from [Bulma](https://bulma.io/). Front- and backend communicate via an api, which is powered by [Axios](https://github.com/axios/axios)
and documented according to the [Open API Swagger Standard](https://www.openapis.org/). The tests within the backend are powered by [Mocha](https://mochajs.org/). Placemark also possesses [Analytics](https://github.com/himynameisdave/svelte-frappe-charts) and an admin-dashboard, where user-data can be altered.



## How to run this application 

Clone this repository in your file-directory, like this: ``git clone https://github.com/linusschlepp/Assignment_KASD.git``

Or download this repo as a .zip-folder. Unzip the folder, using a tool like [7ip](https://www.7-zip.de/).

**This is a mono-repository, you need to run the following commands within the repository in order to run the back- and frontend:** 

#### Run this command in the terminal/ powershell in order to start the frontend (you have to be positioned in "svelte-frontend" folder)
![](https://github.com/linusschlepp/Assignment_KASD/blob/master/svelte-frontend/src/assets/start_frontend.jpg)

#### Run this command in the terminal/ powershell in order to start the backend (you have to be positioned in the "Assigment" (source) folder)
![](https://github.com/linusschlepp/Assignment_KASD/blob/master/svelte-frontend/src/assets/start_backend.jpg)

After cloning or opening this project in the IDE, don't forget to run: ``npm install``

Now, you should be good to go!

## Self evaluation
![](https://github.com/linusschlepp/Assignment_KASD/blob/master/svelte-frontend/src/assets/grading_rubric.jpg)

**In the following, I will discuss the grading rubric row by row:**

* In the first row every task has been completed. Regarding git, just run: ``git log`` to inspect the commit history. I have also implemented a mem-store, which is never used because, mongo is the standard.
* In the second row every task has been completed. A json-store has also been implemented but is never used as well. 
* In the third row every task has been completed. Check out the tagged releases, by running: ``git tag``. This should appear: <br>
![](https://github.com/linusschlepp/Assignment_KASD/blob/master/svelte-frontend/src/assets/git_tag.jpg) <br>
* In the fourth row every task has been completed. The backend is hosted on Heroku (the backend possesses a mockup-frontend **(not the actual frontend)**). The actual frontend is hosted on Netlify and communicates with the backend via the api. Please consider, I have used multiple branches on my local-git-repository, each time a feature was successfully integrated, I merged with development and then with the master branch. After the merge with the master branch, I pushed to the remote-repository and created a tagged release. Therefore, only one branch (master) exists on the remote repository. On my local-repository multiple branches exist. (Picture below) <br> ![](https://github.com/linusschlepp/Assignment_KASD/blob/master/svelte-frontend/src/assets/git_local_branch.jpg) <br> To check out the different branches just run: ``git branch``. To access the admin-dashboard, use the ```admin@admin.com``` account with the password: ```admin``` or  create an account with the email ```placemark@admin.com``` and admin-rights will be assigned automatically. Short notice regarding the images: If the user does ot assign an image to a placemark in the frontend, a default image is assigned in the backend automatically. So basically, every placemark contains an image.
* In the fifth row every task has been completed. At least I hope so... I am not particular sure regarding the last column of this row, because in my implementation one category can hold multiple placemarks and every placemark can hold one image. Therefore, one category has multiple images. So, I am not sure, if this satisfies the requirement.
* In the sixth row every task has been completed. In the second column, I was only able to implement one map per page in assignment. 

For further information regarding this project, check out the About-page in the frontend. 

## Resources

* The [link](https://icon-icons.com/de/symbol/anzeigen/42272) for the favicon, I used.
* The [link](https://icon-icons.com/de/symbol/Reisen-Karte-Lage-pin/109805) for the placemark-logo, which is displayed at the start and on the TitleBar.
* The data from the .env-file can be found in the word-template, submitted on moodle. 
* Seeding data exists, use this account-data for testing purposes: <br> 
![](https://github.com/linusschlepp/Assignment_KASD/blob/master/svelte-frontend/src/assets/seed_data_table.jpg)

