import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { Bell } from 'react-bootstrap-icons';
import "../styles/nav.css";

const CustomNavbar = () => {
  return (
    <>
    <Navbar bg="blue" expand="lg" className="mb-4" id='nav'>
      <Navbar.Brand href="#home" className='head'><span style={{marginLeft:"10%"}}>Lead Management</span></Navbar.Brand>
      <Nav className="ml-auto">
        <Image className='img' src="https://st3.depositphotos.com/1017228/18878/i/450/depositphotos_188781580-stock-photo-handsome-cheerful-young-man-standing.jpg" roundedCircle sizes='20' />
        
      </Nav>
    </Navbar>
    </>
  );
};

export default CustomNavbar;
