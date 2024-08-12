import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';
import LeadForm from './LeadForm';
import {Row,Col} from "react-bootstrap";
import { TbEdit } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2'


const LeadTable = () => {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [show, setShow] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get('http://65.0.91.158:5000/api/leads');
      setLeads(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching leads:',error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://65.0.91.158:5000/api/leads/${id}`);
      fetchLeads();
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const handleEdit = (lead) => {
    setCurrentLead(lead);
    setShow(true);
  };

  const sweetalert = (_id)=>{ Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      handleDelete(_id)
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  })};

  const filteredLeads = leads
    .filter(lead => lead.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortBy === 'name' ? a.name.localeCompare(b.name) : 0);

  return (
    <>
    <Row className='d-flex'>
    <Col className='col-md-4' >
      
    <Form.Control
    type="text"
    placeholder="Search by name"
    className=" mb-3"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
    </Col>
    
    <Col className='col-md-3'>
    <Form.Control
        as="select"
        className="mb-3"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">Sort by</option>
        <option value="name">Name</option>
      </Form.Control>
    </Col>
    <Col className='col-nd-2'>
    </Col>
    <Col className='col-md-3' style={{display:"flex",justifyContent:"flex-end",height:"4.5vh"}}>
    <Button onClick={() => {
      setCurrentLead(null); 
      setShow(true);
    }}>Add Lead</Button>
    </Col>
    </Row>
     
    
      

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Product</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeads.map((lead) => (
            <tr key={lead._id} >
              <td id='td'>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.number}</td>
              <td>{lead.product}</td>
              <td style={{display:"flex",justifyContent:"center"}}>
               
                <TbEdit size={25} onClick={() => handleEdit(lead)} style={{cursor:"pointer"}}/>
                &nbsp; &nbsp;
                <MdDeleteForever  onClick={() => sweetalert(lead._id)} size={25} style={{cursor:"pointer"}}/>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <LeadForm
        show={show}
        handleClose={() => setShow(false)}
        currentLead={currentLead} 
        refreshLeads={fetchLeads}
      />
    </>
  );
};

export default LeadTable;
