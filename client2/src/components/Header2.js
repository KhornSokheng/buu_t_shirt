import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Offcanvas,
  FormControl,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Header2() {
  // const user= useSelector((state)=> state.user)
  const cust_name = useSelector((state) => state.user.cust_name);
  const email = useSelector((state) => state.user.email);
  const currentUser = useSelector((state) => state.user.currentUser);

  // console.log("Navbar Rerendered...")

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="light"
        bg="white"
        className=" pb-0 mb-0 fixed-top"
      >
        <Container className=" text-warning ">
          <Navbar.Brand href="/" className="logo">
            <img src="images/logo_1.png" alt="Buu T Shirt" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>

            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="Product" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/product">All Product</NavDropdown.Item>
                <NavDropdown.Item href="/warehouse">Warehouse</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Buy" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/buy">Buy Report</NavDropdown.Item>
                <NavDropdown.Item href="/buydetail">
                  Buy Detail
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Sale" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/sale">Sale Report</NavDropdown.Item>
                <NavDropdown.Item href="/saledetail">
                  Sale Detail
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/customer">Customer</Nav.Link>
              <Nav.Link href="/size">Size</Nav.Link>
              <Nav.Link href="/revenue">Revenue</Nav.Link>
              <Nav.Link href="/about">About Us</Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link href="/history" data-toggle="tooltip"
                data-placement="bottom"
                title="Order History">
                <i className="ti-money" />
              </Nav.Link>
              <Nav.Link eventKey={2} href="/cart" data-toggle="tooltip"
                data-placement="bottom"
                title="cart">
                <i className="ti-shopping-cart" />
              </Nav.Link>
              <Nav.Link
                href="/login"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Log In"
              >
                <i className="ti-user" />
              </Nav.Link>
              <Nav.Link
                href="/login"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Log Out"
              >
                <i className="ti-share" />
              </Nav.Link>
              <Nav.Link
                eventKey={3}
                href="#memes"
                className="text-warning border border-warning rounded-3"
              >
                {currentUser.email},{currentUser.cust_name}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Navbar bg="light" expand={false}>
        <Container fluid>
          <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar> */}
    </div>
  );
}
