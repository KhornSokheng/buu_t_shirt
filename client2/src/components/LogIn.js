import { React, useState } from "react";
import { Form, Row, InputGroup, Button, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Axios from "axios"
import {Redirect} from "react-router-dom"

// import 'bootstrap/dist/css/bootstrap.min.css';

export default function LogIn() {
  const [validated, setValidated] = useState(false);
  const [Username,setUsername] = useState();
  const [Password,setPassword] = useState();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  const doLogin = (e)=>{
    e.preventDefault();
    Axios.post("http://localhost:5000/login2",{
      username: Username,
      password: Password
    },{ withCredentials: true }).then((response)=>{
      console.log(response);
      if(response.data.error){
        // setLoginStatus(response.data.error)
        console.log(response.data.error)
        alert(response.data.error)
      }else{
        // setLoginStatus(Welcome... ${response.data[0].username});
        console.log(response.data[0].username)
        // return <Redirect to="/"/>;
        window.location="/"
      }
      // console.log("isAuth:",isAuth);
      
    })
  }
  return (
    <div className="singin container">
      <Card border="info">
        <Card.Header
          className="d-flex justify-content-center alert alert-info"
          role="alert"
        >
          <h3>LOGIN</h3>
        </Card.Header>
        <Form
          className="container align-items-center"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustomEmail">
              <Form.Label>Email address</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="name@example.com"
                  aria-describedby="inputGroupPrepend"
                  required
                  onChange={((e)=>{
                    setUsername(e.target.value)
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a Email.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom05">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required 
              onChange={((e)=>{
                setPassword(e.target.value)
              })}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Password.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button onClick={doLogin} type="submit">Submit form</Button>
          <br></br>
          <br></br>
          <Card.Link href="/Signup">SING UP</Card.Link>
          <br></br>
          <br></br>
        </Form>
      </Card>
    </div>
  );
}
