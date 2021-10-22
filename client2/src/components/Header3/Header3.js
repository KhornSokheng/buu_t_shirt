import React from "react";
import "./myStyle.css";
// import "../../../public/myScript.js";

export default function Header3() {
  return (
    <>
      {/* partial:index.partial.html */}
      <nav className="navbar navbar-expand-custom navbar-mainbg d-flex align-item-center">
        <a className="navbar-brand navbar-logo" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars text-white" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <div className="hori-selector">
              <div className="left" />
              <div className="right" />
            </div>
            <li className="nav-item">
              <a className="nav-link" href="javascript:void(0);">
                <i className=" ti-shopping-cart fas fa-tachometer-alt" />
                Dashboard
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="javascript:void(0);">
                <i className="far fa-address-book fas fa-address-book" />
                Address Book
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="javascript:void(0);">
                <i className="far fa-clone" />
                Components
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="javascript:void(0);">
                <i className="far fa-calendar-alt" />
                Calendar
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="javascript:void(0);">
                <i className="far fa-chart-bar" />
                Charts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="javascript:void(0);">
                <i className="far fa-copy" />
                Documents
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {/* partial */}
    </>
  );
}
