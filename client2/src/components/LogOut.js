import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../redux/userSlice";
import {
    Navbar,
    Nav,
  } from "react-bootstrap";


export default function LogOut() {
    const dispatch = useDispatch();


    const logout = (e) => {
        e.preventDefault();
        dispatch(remove());
    
        window.location = "/login";
      };

    return (
        <>
            <Nav.Link
                href="/login"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Log Out"
                onClick={logout}
              >
                <i className="ti-share" />
              </Nav.Link>
        </>
    )
}
