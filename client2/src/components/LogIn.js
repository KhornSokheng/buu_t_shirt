import { React, useState } from "react";
import { Form, Row, InputGroup, Button, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Axios from "axios"
import {Redirect} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/userSlice";

// import 'bootstrap/dist/css/bootstrap.min.css';

export default function LogIn() {
  const [validated, setValidated] = useState(false);
  const [email,setemail] = useState();
  const [password,setpassword] = useState();
  const [cust_id, setCustId] = useState("C9999");
  const [cust_name,setCustName] = useState();
  const [role,setRole] = useState("user");
  const [profile_img,setProfileImg] = useState();
  const [curUser, setUser] = useState([]);

  let user= useSelector((state)=> state.user)

  const dispatch = useDispatch();

  user={
    email:email,
    cust_id: cust_id,
    cust_name:"Sok",
    role:role,
    profile_img:profile_img,
  }

  const setCurrentUser = async () => {
    try {
      const resp = await fetch(`http://localhost:5000/getCustomerByEmail/${email}`);
      const jsonData = await resp.json();
      user=jsonData;
      setUser(jsonData);
      dispatch(update(user[0]))
      
      
      // console.log("Resp", user);
      // console.log("List:", list);
      window.location="/";
    } catch (err) {
      console.error(err.message);
    }
  };

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
      email: email,
      password: password
    },{ withCredentials: true }).then((response)=>{
      console.log(response);
      if(response.data.error){
        // setLoginStatus(response.data.error)
        console.log(response.data.error)
        alert(response.data.error)
      }else{
        // setLoginStatus(Welcome... ${response.data[0].email});
        console.log(response.data[0].email)

        // dispatch(update(user))
        setCurrentUser();
        
        // window.location="/"
        // return <Redirect to="/"/>;
      }
      // console.log("isAuth:",isAuth);
      
    })
  }
  return (
    <div className="singin container mb-4">
      {curUser && <h1>Cust Name:{curUser.email},{curUser.cust_name}</h1>}
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
                    setemail(e.target.value)
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
              <Form.Control type="password" placeholder="password" required 
              onChange={((e)=>{
                setpassword(e.target.value)
              })}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid password.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button onClick={doLogin} type="submit">Submit form</Button>
          <br></br>
          <br></br>
          <Card.Link href="/Signup">SIGN UP</Card.Link>
          <br></br>
          <br></br>
        </Form>
      </Card>
    </div>
  );
}
