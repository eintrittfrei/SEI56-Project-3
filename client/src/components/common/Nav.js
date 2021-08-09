import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import { getPayload } from '../helpers/auth'
import ButtonSignup from './navbar/ButtonSignup.js'
import ButtonLogin from './navbar/ButtonLogin.js'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/auth'


const Nav = () => {

  const [userInfo, setUserInfo] = useState([])
  const [click, setClick] = useState(false)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const userIsAuthenticated = () => {
    const payload = getPayload()
    if (!payload) return false 
    const now = Math.round(Date.now() / 1000)
    return now < payload.exp
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/profile',
          {
            headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
          })
        setUserInfo(data)
      } catch (err) {
        console.log('err', err)
      }
    }
    getData()
  }, [])
  console.log('userinfo', userInfo)

  return (
    <>
      <div className="container-fluid">
        <nav className="homepage-navbar-wrapper">
          <div className="nav-logo-div">
            <Link to="/" className="navbar-logo">
          Heiss
            </Link>
          </div>

          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <div>
            {/* empty div for a layout oriented teen */}
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link to="/drinks" className="nav-links" onClick={closeMobileMenu}>
                Our Drinks
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/heiss-room" className="nav-links" onClick={closeMobileMenu}>
                Heiss Room
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                About
              </Link>
            </li>
            {/* <li className="nav-item">
              <CartTally 
                CartIcon = {CartIcon}
              /> */}
            {/* </li> */}
            {!userIsAuthenticated() ? 
              <>
                <li className="nav-item">
                  <Link to="/register" className="nav-links-mobile" onClick={closeMobileMenu}>
                  Sign up
                  </Link> 
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-links-mobile" onClick={closeMobileMenu}>
                  Login
                  </Link> 
                </li>
                <ButtonSignup />
                <ButtonLogin />
              </>
              :
              <Link to="/profile" >
                <img
                  src={userInfo.image}
                  alt={userInfo.username}
                  height={50}
                  width={50}
                  className="nav-bar-profile-image"
                />
                <Navbar.Brand clasName="login-register" href="/profile"> {userInfo.username}</Navbar.Brand>
              </Link>
            }
          </ul>

        </nav>
      </div>
      

    </>    

  )
}
export default Nav