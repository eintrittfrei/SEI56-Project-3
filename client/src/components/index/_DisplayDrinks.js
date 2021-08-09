import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

const DisplayDrinks = ({ drinks, filteredDrinks  }) => {
  console.log('FILTERED DRINKS->', filteredDrinks)

  
  
  //! Both arrays filtering just fine but can display only one filtered verison at a time
  return (
    <Col className="right-api">
      <p className=""></p>      
      <Row className="api-row">
        {(filteredDrinks.length > 0 ? filteredDrinks : drinks).map(( drink ) => {
          return (
            <Card key={drink._id} style={{ width: '18rem' }}>
              <Card.Img height={200} variant="top" src={drink.image} />
              <Card.Header as="h5">
                {drink.drink}
                      
                <Card.Title as="h6">{drink.country}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text className="type">{drink.description.length < 100 ? drink.description : drink.description.slice(0, 100) + '...'}</Card.Text>
                <Card.Text></Card.Text>
                <hr/>
                <Container >
                  <Row> 
                    <Col className="card-price">
                      <p>£ {drink.price}.00</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="card-btn">
                      <Link to={`drinks/${drink._id}`}>
                        <Button variant="warning"><span>More Info</span></Button>{' '}
                      </Link>
                    </Col>
                  </Row>
                </Container>
                
              </Card.Body>
            </Card>
          )
                  
        })}
      </Row>
    </Col>
  )
    
  
}

export default DisplayDrinks