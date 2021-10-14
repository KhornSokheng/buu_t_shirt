import { React, useState } from "react";
import { Form, Row, InputGroup, Button, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";


// import 'bootstrap/dist/css/bootstrap.min.css';

export default function SignUp() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

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
              <Form.Control required type="text" placeholder="First name" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                required
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
              <Form.Control type="text" placeholder="Phone number" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Phone number.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom04">
              <Form.Label>Credit card</Form.Label>
              <Form.Control type="text" placeholder="Credit card" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Credit card.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom05">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required />
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
          <Button type="submit">Submit form</Button>
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
