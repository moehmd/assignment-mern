import React, { useState, useEffect } from 'react';
import { Table,
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
  Alert } from './services/react-bootstrap'
import './App.css';
import employeeService from "./services/employeeServices.js";

function Employees() {
  let [success, setSuccess] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [relatedUsers, setRelatedUsers] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [manage, setMange] = useState('Manage');
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  
  let baseEmployee = {
    _id: id,
    firstName: firstName,
    lastName: lastName,
    age: age
  };
  
  const handleClose = () => {
    setModalShow(false);
    setId('');
    setFirstName('');
    setLastName('');
    setAge('');
  };

  useEffect(() => {
    retrieveEmployees();
  }, []);

  const retrieveEmployees = () => {
    employeeService.get()
    .then(res => {
      setEmployees(res.data.allEmployees);
      setRelatedUsers(res.data.relatedUsers);
      setSuccess(true);
    })
    .catch(error=>{
      console.log(error)
    })
  };

  const manageEmployee = () => {
    employeeService.manage(baseEmployee._id, baseEmployee)
    .then(() => {
      retrieveEmployees();
    });
  };

  const handleRowDelete = (id) => {
    employeeService.remove(id)
    .then(() => {
      retrieveEmployees();
    })
    .catch(error => {
      console.log(error);
    })
  };

  const firstNameHandler = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameHandler = (event) => {
    setLastName(event.target.value);
  };

  const ageHandler = (event) => {
    setAge(event.target.value);
  };

  const OpenDialog = (employee) => {
    if(employee) {
      setMange('Edit');
      setId(employee._id);
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
      setAge(employee.age);
    } else {    
      setMange('Add');
      setId('');
      setFirstName('');
      setLastName('');
      setAge('');
    };
    setModalShow(true);   
  }; 

  return (
    <div className="App">
      <Modal show={modalShow} aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Header>{manage} employee</Modal.Header>
        <Modal.Body>
            <Alert variant='primary'>
              <Container>
                  <Form>
                    <Form.Group className='m-2' controlId="employee.firstName">
                        <Form.Control type="text" value={firstName} onChange={firstNameHandler} placeholder="set first name" required/>
                    </Form.Group>
                    <Form.Group className='m-2' controlId="employee.lastName">
                        <Form.Control type="text" value={lastName} onChange={lastNameHandler} placeholder="set last name" required/>
                    </Form.Group>
                    <Form.Group className='m-2' controlId="employee.age">
                        <Form.Control type="number" value={age} onChange={ageHandler} placeholder="set age" required/>
                    </Form.Group>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button type='submit' onClick={() => {
                      manageEmployee();
                      handleClose()
                    }}>{manage}</Button>
                    </Modal.Footer>
                  </Form>
              </Container>
            </Alert>
        </Modal.Body>
      </Modal>
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <Table striped bordered size="sm">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            {success ? (employees.map((employee) => {
              return <tbody key={`${employee._id}`}>
                <tr>
                    <td>{`${employee.firstName}`}</td>
                    <td>{`${employee.lastName}`}</td>
                    <td>{`${employee.age}`}</td>
                    <td>
                      <Button className='m-2' variant="outline-warning" onClick={() => { OpenDialog(employee) }}>Edit</Button>
                      <Button className='m-2' variant="outline-danger" onClick={() => { handleRowDelete(employee._id)} }>Delete</Button>
                    </td>
                </tr>
              </tbody>
            })
            ) : (
              <tbody>
                <tr>
                  <td>loading trades ...</td>
                </tr>
              </tbody>
            )}
            </Table> 
          </Col>
          <Col xs lg="2">      
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>Last Name</th>
                  <th>count</th>
                </tr>
              </thead>
              {success ? (relatedUsers.map((relatedUser) => {
                return <tbody key={`${relatedUser.lastName}`}>
                  <tr>
                      <td>{`${relatedUser.lastName}`}</td>
                      <td>{`${relatedUser.count}`}</td>
                  </tr>
                </tbody>
              })
              ) : (
                <tbody>
                  <tr>
                    <td>loading trades ...</td>
                  </tr>
                </tbody>
              )}
            </Table>
          </Col>
        </Row>
      </Container>
      <Button className='btnStyle' variant="outline-primary" onClick={() => { OpenDialog() }}>Add Employee</Button>
    </div>
  );
};

export default Employees;