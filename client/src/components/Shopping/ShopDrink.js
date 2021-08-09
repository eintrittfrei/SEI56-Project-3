import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavHomepage from '../common/NavHomepage.js'
import Container from 'react-bootstrap/Container'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Button from 'react-bootstrap/Button'
import CartIcon from '../../styles/images/cart.svg'
import { Link } from 'react-router-dom'


const ShopDrink = () => {

  const [shoppedDrinks, setShoppedDrinks ] = useState([])

  // gets data from suggested drink api
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/shopped-drinks')
      console.log('DATA', data)
      setShoppedDrinks(data)
    }
    getData()
  }, [])

  const handleDelete = (event) => {
    console.log('changed=>', event.target.value)
    const getDelete = async () => {
      const { data } = await axios.delete(`/api/shopped-drinks/${event.target.value}`)
      console.log('MYDATA', data)
      if (data === 'success') {
        const { data } = await axios.get('/api/shopped-drinks')
        console.log('RESULT', data)
        setShoppedDrinks(data)
      }
    }
    getDelete()
  }

  return (
    <>
      <Container fluid sticky="top" className='nav-container-pages'>
        <NavHomepage />
      </Container>
      <Container className='cart-wrapper'>
        
        <div className='cart-style'>
          <span>
              Cart
            <span className='cartlogo'>{shoppedDrinks.length - 1}</span>
          </span>
          <Link to='/shop-drink' className='cart-link'>
            <img src={CartIcon} alt='' width='20'/>
          </Link>
        </div>

        <Breadcrumb className="show-drink-breadcrumb">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/drinks">Browse Drinks</Breadcrumb.Item>
          <Breadcrumb.Item active>Cart</Breadcrumb.Item>
        </Breadcrumb>
        <Container className='cartpage'>
          <div className='cartpage-main'>
            {shoppedDrinks.map(drink => {
              if (drink !== null) {
                return (
                  <div className='cartpage-info'>
                    <div className='drink-img'><img src={drink[0].image}></img></div>
                    <p>{drink[0].drink}</p>
                    <p>Price: £{drink[0].price}</p>
                    <p>Quantity: {drink[1].quantity}</p>
                    <strong>
                      <p>Subtotal: £{drink[1].total}</p>
                    </strong>
                    <div>
                      <Button variant='outline-warning' value={drink[1]._id} onClick={handleDelete}>Delete</Button>
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </Container>
      
    
        <Container className='checkout'>
          <Link to='/shop-success'>
            <Button variant='warning' className='checkout-success'>Proceed To Checkout</Button>
          </Link>
        </Container>
      </Container>
    </>
  )
}

export default ShopDrink