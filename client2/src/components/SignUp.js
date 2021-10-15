import { React, useState } from "react";
import { Form, Row, InputGroup, Button, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Axios from "axios"


// import 'bootstrap/dist/css/bootstrap.min.css';

export default function SignUp() {
  const [validated, setValidated] = useState(false);
  const [firstname,setFirstname]=useState();
  const [lastname,setLastname]=useState();
  const [email,setEmail]=useState();
  const [phone,setPhone]=useState();
  const [creditcard,setCreditcard]=useState();
    const [password,setPassword]=useState();
    const [loginStatus,setLoginStatus] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const doRegister = (e)=>{

    e.preventDefault();

    Axios.post("http://localhost:5000/register3",{

      cust_name: firstname,
      cust_lname:lastname,
      Password: password,
      Username:email,
      phone_num:phone,
      credit_card:creditcard,


    }).then((response)=>{

      console.log(response);
      
      // if(response.data.error){

      //   setLoginStatus(response.data.error)

      // }else{
      //   setLoginStatus(`Welcome... ${response.data[0].username}`);
      //   console.log(response.data[0].username)
      //   return <Redirect to="/"/>;
      // }
      // console.log("isAuth:",isAuth);
      window.location="/login"
    }).catch((err)=>{
      console.error(err.message)
    })

  }
  return (
    <div className="singin container">
      <Card border="success">
        <Card.Header
          className="d-flex justify-content-center alert alert-success"
          role="alert"
        >
          <h3>SIGN UP</h3>
        </Card.Header>
        <Form
          className="container align-items-center"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control required type="text" placeholder="First name" 
              onChange={((e)=>{
                setFirstname(e.target.value)
              })}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                required
                onChange={((e)=>{
                  setLastname(e.target.value)
                })}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
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
                    setEmail(e.target.value)
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a Email.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Phone number</Form.Label>
              <Form.Control type="text" placeholder="Phone number" required 
              onChange={((e)=>{
                setPhone(e.target.value)
              })}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Phone number.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom04">
              <Form.Label>Credit card</Form.Label>
              <Form.Control type="text" placeholder="Credit card" required 
              onChange={((e)=>{
                setCreditcard(e.target.value)
              })}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Credit card.
              </Form.Control.Feedback>
            </Form.Group>
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
          <Form.Group className="mb-3">
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group>
          <Button onClick={doRegister} type="submit">Submit form</Button>
          <br></br>
          <br></br>

          <Card.Link href="/login">LOGIN</Card.Link>
          <br></br>
          <br></br>
        </Form>
      </Card>
    </div>
  );
}
