import React, { useEffect, useState } from 'react' 
import axios from 'axios'
import { useParams,  useHistory, Link } from 'react-router-dom'
import NavHomepage from './common/NavHomepage'
import Container from 'react-bootstrap/Container'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Button from 'react-bootstrap/Button'
import { getTokenFromLocalStorage } from './helpers/auth.js'
import Footer from './common/Footer'


const SuggestedDrinkShow = () => {
  const [drink, setDrink] = useState({})
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/suggested-drinks/${id}`)
        setDrink(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])
  console.log(drink)


  const handleDelete = async () => {
    try {
      await axios.delete(`/api/suggested-drinks/${id}`, {
        headers: { 
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      history.push('/profile')
    } catch (err) {
      console.log(err)
    }
  }

 
  return (
    <>
      <Container fluid sticky="top" className="nav-container-pages">
        <NavHomepage />
      </Container>

      <Breadcrumb className="show-drink-breadcrumb">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/profile">User Profile</Breadcrumb.Item>
        <Breadcrumb.Item active>{drink.drink}</Breadcrumb.Item>
      </Breadcrumb>

      
      <Container className="show-drink" fluid>
        <div className="image-text">
          {/* <div className="image"> */}
          <img
            alt={drink.drink}
            src={drink.image}
          /> 
          {/* </div> */}
          <div className="right">
            <Container className="title" style={{ width: '500' }}>
              <h2>{drink.drink}</h2>
              <h4 className="origin">Origin: <span className="country-name">{drink.country}</span></h4>
            </Container>
            <Container className="content" style={{ width: '500' }}>
              <h4>Description</h4>
              <p className="description">
                {drink.description}
              </p>
              <p className="averageRating"><span>Average rating: </span>{drink.avgRating}</p>
              
              {/* {userIsOwner(drink.user._id) && */}
              <Container className="buttons" fluid>
                <Link to={`/profile/${id}/edit`} ><Button className="outline-light" variant="warning">Edit</Button></Link>
                <Button onClick={handleDelete} variant="warning">Delete</Button>
              </Container> 
              {/* } */}
            </Container> 
          
          </div>
        
        </div>
      </Container>
      
      <Footer />
      
    </>
  )



}

export default SuggestedDrinkShow



