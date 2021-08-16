# General Assembly Project 3

### Overview
This was the third project of the General Assembly Software Engineering Immersive course and was a group project with a team of four students created over 7 days. Heiss is a hot drink service that delivers quality coffee or tea with recipes from around the world. The user can add items to the shopping basket and select check out. They can also join the community and suggest their own drinks by adding a new drink to the “Heiss Room”. They can also manage their user profile and edit or delete their suggestions. 

## Project Members
Ole Nascimento https://github.com/eintrittfrei
Bex Jones https://github.com/simplythebex
Daria Kafler https://github.com/daria-kafler
Victoria Olanipekun https://github.com/victoriaolanipekun

## Timeframe
7 days

## Project Brief:  
* Build a full-stack application by making your own backend and your own front-end
* Use an Express API to serve your data from a Mongo database
* Consume your API with a separate front-end built with React
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut

## Technologies Used

Backend: 
* Node.js
* Mongodb
* Express 
* Mongoose
* JSON Web Token
* bcrypt
* Insomnia

Frontend:
* JavaScript (ES6)
* React 
* Axios 
* Nodemon 
* React Router Dom
* React
* React Bootstrap
* SASS
* CSS3
* Cloudinary
* Git
* GitHub
* figma
* VScode
* Google Fonts

## Heiss - Online order service for hot drinks from around the world 

## Deployed version
https://sei56-3.herokuapp.com/

## Installation 

Clone or download the repo. In your terminal run the following commands: 

Install dependencies with yarn add (bulma, … )
Start the database with mongod --dbpath ~/data/db
Start the server with yarn serve
Move to the client folder -- cd client 
Start the front end -- yarn start 

## Planning
This was a group project with four students over 1 week. We spent the first day planning the project. We used figma to lay out our wireframes and planned the layout of each page. We also agreed on a rough timeline and daily team stand ups to keep our plan on track to ensure we would meet the deadline. We decided to use an existing website as the design inspiration and created a mock design based on that using figma. We planned out the required relationships for the backend. 

SCREENSHOTS WIREFRAMES and DESIGN 

## Process
We decided to code the backend as a group taking equal turns at coding and divided tasks up amongst the group members for the front end. We used React Bootstrap for styling and imported each component individually as this was recommended in the Bootstrap documentation to avoid importing unnecessary styling. 

I specifically coded on the backend on the following parts:

db/data/users.js - owner field
db/seeds.js - seeds file for owner information
config/ router.js - secure route & delete route
config/secureRoute.js - authentication
config/ router.js - user rating
controllers/drinks.js - create comments/ delete comments
models/drinks.js - commentSchema & delete comments & drinkSchema

On the front end I was responsible for:

Users.js - controller to return user profile information 
UserProfile.js - Showing items the user created (suggestions)
SuggestedDrinkShow.js 
SuggestionsEdit.js the edit and delete functionality on the user profile page 
Drinks.js the drinks show page 

We also decided to work on the final styling as a group. 
Deployment via Heroku was done individually after cloning the original repo from our main repo owner. 

## Backend 
The backend took up the first 2 days of coding however we added the basket and heiss room for suggestions after we had started on the front end. 

### Models 
We created models for the drinks, shoppedDrinks (basket). suggested Drinks and  users.  (drinkSchema), comments and a virtual model for the ratings. 
We also added a reverse relationship model so we could show the drinks related to one user on the user profile. 

CODE EXAMPLE

### Controllers
We created controllers for authentication, drinks, shoppedDrinks, suggestedDrinks and users. For registration, login and CRUD functionality for the users who are logged in. 

CODE EXAMPLE

## Frontend
We decided to destructure the front end into several components to keep it manageable using React Router Dom to navigate between the different components. The App.js component functions as our router hub. The different components are grouped in several folders for readability based on functionality. For example the auth group includes any components dedicated to registration and login. 

Example Drink.js component: 
I created a new component and imported the required packages. 
I then began by making an axios request first to check I was getting the correct data. I used the useEffect() function to make the get request to the API. I also used an async await to ensure the data request would work in the right order. I used a subject literal to add the item id at the end. I also added a try/ catch to show any errors that might come up.  

EXAMPLE CODE  
 
I could see the data in my console.log as a json object and then destructured by passing in the data directly. 

EXAMPLE CODE 

I set the data to state by using useState() setting the state to an empty object. 

EXAMPLE CODE 

Now I could access the data using dot notation and display information in the return. 

EXAMPLE CODE 


## Challenges
* One of the main challenges was the styling. As the project progressed and each group member added styling to the style sheet this created some issues for other team members. 
* Another challenge was planning the right models. Due to limited experience we had to plan as best as we could for our basic MVP. We ended up adding additional models to the backend. 
* 

## Wins 
* We managed to build a fully functioning app in the required time. 
* The backend work as a group went smoothly without major issues. The group worked very well as a team. 
* The app is mobile responsive. 

## Bugs
* There are still some issues with the suggestions edit form. The image can currently not be updated as it is fed automatically with the pre populated form data. This hides the form upload field for updates. 

## Key Learning
It was very useful to work on a project in a larger group of four people. It showed how important planning and good communication is. Especially with the styling it would have been better to plan ahead in more detail. 

## Future Improvements 
* The ratings currently have to be typed in as a number. It would be good to add a simple icon from 1-5 that can be clicked. 
* it would be useful to add a map for each dinks origin for improved UX. 
* The responsiveness could still be improved. 
* It would be useful to have a search function added. Currently the drinks can only be sorted by tea and coffee but there is no free text search. 





