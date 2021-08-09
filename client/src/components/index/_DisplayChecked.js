import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

const DisplayChecked = ({ handleChecked }) => {

  return (
    <>
      <Container className="sorting-row-wrapper">
        {/* <Row className="buttons-row"> */}
        <Col className="shop-drinks">
          <h3 className="shop-drinks-h3">Shop drinks</h3>
        </Col>
        <Col xs={7} className="sorting-buttons">
          <button className="filter-btn-coffee" value="Coffee" onClick={handleChecked}>Coffee</button>|
          <button className="filter-btn-tea" variant="outline-secondary" value="Tea" onClick={handleChecked}>Tea</button>|
          <button className="filter-btn-all" variant="outline-secondary" value="All" onClick={handleChecked}>All</button>
        </Col>
        {/* </Row> */}
      </Container>
    </>
  )
  
}

export default DisplayChecked



