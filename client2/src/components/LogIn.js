import { React, useState } from "react";
import { Form, Row, InputGroup, Button, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";

// import 'bootstrap/dist/css/bootstrap.min.css';

export default function LogIn() {
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
              <Form.Control type="password" placeholder="Password" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Password.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button type="submit">Submit form</Button>
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
