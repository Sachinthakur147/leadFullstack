import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import {Row,Col} from 'react-bootstrap'

const LeadForm = ({ show, handleClose, currentLead, refreshLeads }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [product, setProduct] = useState('a');

  useEffect(() => {
    if (currentLead) {
      setName(currentLead.name);
      setEmail(currentLead.email);
      setNumber(currentLead.number);
      setProduct(currentLead.product);
    } else {
      
      setName('');
      setEmail('');
      setNumber('');
      setProduct('a');
    }
  }, [currentLead]);

  const handleSubmit = async () => {
    if (currentLead) {
    
      try {
        await axios.put(`http://65.0.91.158:5000/api/leads/${currentLead._id}`, {
          name,
          email,
          number,
          product,
        });
        refreshLeads();
        handleClose();
      } catch (error) {
        console.error('Error updating lead:', error);
      }
    } else {
      
      try {
        const response = await fetch('https://65.0.91.158:5000/api/leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            number,
            product,
          }),
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        const data = await response.json();
        console.log('Success:', data);
      
        refreshLeads();
        handleClose();
      } catch (error) {
        console.error('Error creating lead:', error);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} style={{padding:"5%"}}>
      <Modal.Header closeButton >
        <Modal.Title>{currentLead ? 'Edit Lead' : 'Add Lead'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form style={{padding:"4%"}}>
          <Form.Group controlId="formName" >
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label style={{marginTop:"2%"}}>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group controlId="formNumber">
            <Form.Label style={{marginTop:"2%"}}>Number</Form.Label>
            <Form.Control
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Enter number"
            />
          </Form.Group>
          <Form.Group controlId="formProduct">
            <Form.Label style={{marginTop:"2%"}}>Product</Form.Label>
            <Form.Control
              as="select"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      
      <hr/>
      <Row className='d-flex' style={{justifyContent:"space-around",padding:"2%"}}>
      <Col className='col-md-4' style={{marginLeft:"5%"}}>
      <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
      </Col>
      <Col className='col-md-2'>
      </Col>
      <Col className='col-md-4'>
      <Button variant="primary" onClick={handleSubmit}>
      {currentLead ? 'Update Lead' : 'Add Lead'}
    </Button>
      </Col>
      </Row>
       
     
    </Modal>
  );
};

export default LeadForm;
