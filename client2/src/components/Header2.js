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
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../redux/userSlice";
import LogOut from "./LogOut";

export default function Header2() {
  
  const currentUser = useSelector((state) => state.user.currentUser);

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
              <Nav.Link href="/chart">Chart</Nav.Link>
              <Nav.Link href="/about">About Us</Nav.Link>
              <Nav.Link href="/contact">Contact Us</Nav.Link>
            </Nav>

            <Nav>
            <Nav.Link
                href="/message"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Messages"
              >
                <i className="ti-comment-alt" />
              </Nav.Link>
              <Nav.Link
                href="/history"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Order History"
              >
                <i className="ti-money" />
              </Nav.Link>
              <Nav.Link
                eventKey={2}
                href="/cart"
                data-toggle="tooltip"
                data-placement="bottom"
                title="cart"
              >
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
              {/* <Nav.Link
                href="/login"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Log Out"
                onClick={logout}
              >
                <i className="ti-share" />
              </Nav.Link> */}

              <LogOut/>
              
            </Nav>
            <Nav>
            <Nav.Link
                eventKey={3}
                href="/profile"
                className="text-warning border border-warning rounded-3"
              >
                
                
                <img className="  mx-auto d-block rounded-circle"  style={{width: "40px", height:"40px" }} src={currentUser.profile_img}/>
                
                {currentUser.role}: {currentUser.cust_name}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </div>
  );
}
