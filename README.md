# General Assembly Project 3

### Overview
This was the third project of the General Assembly Software Engineering Immersive course and was a group project with a team of four students created over 7 days. Heiss is a hot drink service that delivers quality coffee or tea with recipes from around the world. The user can add items to the shopping basket and select check out. They can also join the community and suggest their own drinks by adding a new drink to the “Heiss Room”. They can also manage their user profile and edit or delete their suggestions. 

## Project Members

#### Ole Nascimento https://github.com/eintrittfrei
#### Bex Jones https://github.com/simplythebex
#### Daria Kafler https://github.com/daria-kafler
#### Victoria Olanipekun https://github.com/victoriaolanipekun

## Timeframe
7 days

## Project Brief:  
* Build a full-stack application by making your own back-end and your own front-end.
* Use an Express API to serve your data from a Mongo database.
* Consume your API with a separate front-end built with React.
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models.
* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut.

## Technologies Used

Back-end: 
* Node.js
* Express 
* MongoDB
* Mongoose
* JSON Web Token
* bcrypt
* Insomnia

Front-end:
* JavaScript (ES6)
* React.js 
* Axios 
* Nodemon 
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

<kbd>![Screenshot 2021-09-15 at 10 47 23](https://user-images.githubusercontent.com/16645758/133401877-846bc87c-3063-40b9-a0df-c1c05b4f4549.png)
</kbd>

<kbd>![Screenshot 2021-09-15 at 10 49 21](https://user-images.githubusercontent.com/16645758/133402239-4dd75447-416a-4af5-b2c5-2f94b0c65580.png)
</kbd>


## Deployed version
https://sei56-3.herokuapp.com/

## Installation 

Clone or download the repo. In your terminal run the following commands: 

* Install dependencies with 'yarn add'.
* Start the database 'mongod --dbpath ~/data/db'.
* Start the server 'yarn serve'.
* Move to the client folder 'cd client'. 
* Start the front end 'yarn start'. 

## Planning
This was a group project with four students over 1 week. We spent the first day planning the project. We used figma to lay out our wireframes and plan the layout of each page. We also agreed on a rough timeline and daily team stand-ups to keep our plan on track to ensure we would meet the deadline. We decided to use an existing website as the design inspiration and created a mock design based on that using figma. We planned out the required relationships for the back-end. 

<kbd>![Wireframe ](https://user-images.githubusercontent.com/16645758/129568673-766f2427-221d-4554-ac41-50289c8298e4.png)</kbd>


## Process
We decided to code the back-end as a group taking equal turns at coding and divided tasks up amongst the group members for the front-end. We used React Bootstrap for styling and imported each component individually as this was recommended in the Bootstrap documentation to avoid importing unnecessary styling. 

I specifically coded on the back-end on the following parts:

* db/data/users.js - owner field.
* db/seeds.js - seeds file for owner information.
* config/ router.js - secure route & delete route.
* config/secureRoute.js - authentication.
* config/ router.js - user rating.
* controllers/drinks.js - create comments/ delete comments.
* models/drinks.js - commentSchema & delete comments & drinkSchema.

On the front-end I was responsible for:

* Users.js - controller to return user profile information. 
* UserProfile.js - Showing items the user created (suggestions).
* SuggestedDrinkShow.js. 
* SuggestionsEdit.js the edit and delete functionality on the user profile page. 
* Drinks.js the drinks show page. 

We also decided to work on the final styling as a group. 
Deployment via Heroku was done individually after cloning the original repo from our main repo owner. 

## Back-end 
The back-end took up the first 2 days of coding however we added the basket and 'Heiss Room' for suggestions after we had started on the front-end. 

### Models 
We created models for the drinks, shoppedDrinks (basket). suggested Drinks and  users.  (drinkSchema), comments and a virtual model for the ratings. 
We also added a reverse relationship model so we could show the drinks related to one user on the user profile. 

```javascript
// define the drink schema
const drinkSchema = new mongoose.Schema({
  drink: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  funFact: { type: String, maxlength: 300 },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  origin: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [commentSchema] ,// comments field is array of comments from commentSchema,
  longitude: { type: Number },
  latitude: { type: Number },
  icon: { type: String }
})


```
### Controllers
We created controllers for authentication, drinks, shoppedDrinks, suggestedDrinks and users. For registration, login and CRUD functionality for the users who are logged in. 

```javascript 

//Login user
export const loginUser = async (req, res) => {
  try {
    const userToLogin = await User.findOne({ email: req.body.email })
    console.log('User to login', userToLogin)
    console.log(userToLogin.validatePassword(req.body.password))
    if (!userToLogin || !userToLogin.validatePassword(req.body.password)) {
      throw new Error()
    }
 // Token 
    const token = jwt.sign({ sub: userToLogin._id }, secret, { expiresIn: '3 days' })
    console.log(token)
    // Return response
    return res.status(200).json({ message: `Welcome back ${userToLogin.username}`, token })
  } catch (err) {
    console.log(err)
    return res.status(422).json({ message: 'Unauthorised' })
  } 
}

```



## Front-end
We decided to destructure the front-end into several components to keep it manageable using React Router Dom to navigate between the different components. The App.js component functions as our router hub. The different components are grouped in several folders for readability based on functionality. For example the auth group includes any components dedicated to registration and login. 

Example Drink.js component: 
I created a new component and imported the required packages. 
I then began by making an axios request first to check I was getting the correct data. I used the useEffect() function to make the get request to the API. I also used an async await to ensure the data request would work in the right order. I used a subject literal to add the item id at the end. I also added a try/ catch to show any errors that might come up.  

```javascript

const DrinkShow = () => {
  const [drink, setDrink] = useState({})
  const [quantity, setQuantity] = useState(1)
  const { id } = useParams()

  const history = useHistory()

```

I could see the data in my console.log as a JSON object and then destructured by passing in the data directly. 

```javascript 
useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/drinks/${id}`)
        setDrink(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])
  console.log(drink)
```  
  
I set the data to state by using useState() setting the state to an empty object. 
Now I could access the data using dot notation and display information in the return. 

```javascript 
 <div className="right">
            <Container className="title" style={{ width: '100' }}>
              <h2>{drink.drink}</h2>
              <h4 className="origin">Origin: <span className="country-name">{drink.country}</span></h4>
            </Container>
            <Container className="content" style={{ width: '100' }}>
              <h4>Description</h4>
              <p className="description">
                {drink.description}
              </p>
              <div className="info-container">
                <div className="p-container">
                  <p className="averageRating"><span>Average rating: </span>{drink.avgRating}</p>
                  <p className="averageRating"><span>Price: £</span>{drink.price}</p>
                  <p className="averageRating"><span>Quantity: </span><input name="quantity" value={quantity} onChange={handleChange}></input></p>
```

## Challenges
* One of the main challenges was the styling. As the project progressed and each group member added styling to the style sheet this created some issues for other team members because the different selectors where overlaping which started to effect styling on other pages. 
* Another challenge was planning the right models. Due to limited experience we had to plan as best as we could for our basic MVP. We ended up adding additional models to the back-end.

## Wins 
* We managed to build a fully functioning app in the required time. 
* The back-end work as a group went smoothly without major issues. The group worked very well as a team. 
* The app is mobile responsive. 

## Bugs
* There are still some issues with the suggestions edit form. The image can currently not be updated as it is fed automatically with the pre populated form data. This hides the form upload field for updates. 

## Key Learning

* It was very useful to work on a project in a larger group of four people. 
* It showed the importance of planning and good communication is. 
* It would have been better to plan ahead in more detail, especially with the styling.

## Future Improvements 
* The ratings currently have to be typed in as a number. It would be good to add a simple icon from 1-5 that can be clicked. 
* it would be useful to add a map for each dinks origin for improved UX. 
* The responsiveness could still be improved. 
* It would be useful to have a search function added. Currently the drinks can only be sorted by tea and coffee but there is no free text search. 





