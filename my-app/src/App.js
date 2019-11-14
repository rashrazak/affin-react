import React from 'react';
import './css/bootstrap.min.css';
import './App.css';
import CustomerProvider from './Contexts/Customer'
import Customers from './Components/Customers';
import { Container, Row, Col } from 'reactstrap';


function App() {
  return (
    <CustomerProvider>
      <div className="App">
        <header className="App-header">
          <Container>
            <Row>
              <Col md="12">
                <h3>Affin Customer React</h3>
              </Col>
              <Col md="12">
              </Col>
              <Col md="12" style={{ padding:'10px'}}>
                <Customers />
              </Col>
            </Row>
          </Container>
          
        </header>
      </div>
    </CustomerProvider>
  );
}

export default App;
