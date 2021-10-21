import React from "react";
import { Link } from "react-router-dom";


export default function Header() {
  return (
    <div>
      {/* Header strat */}
      <header className="header ">
        <div className="container ">
          <nav className="navbar sticky-top">
            {/* Site logo */}
            <a href="/" className="logo">
              <img src="images/logo_1.png" alt />
            </a>

            {/* <a href="javascript:void(0);" id="mobile-menu-toggler">
              <i className="ti-align-justify" />
            </a> */}


            {/* <ul className="navbar-nav "> */}
            <ul className="navbar-nav d-flex flex-row justify-content-between">
              <li className="current-menu-item has-menu-child">
                <a href="/">Home</a>
              </li>
              <li>
                <Link to="/product">Product</Link>
                <i class="menu-dropdown ti-angle-down"></i>
                <ul className="sub-menu">
                  <li>
                    <a href="/product">All Product</a>
                  </li>
                  <li>
                    <a href="/warehouse">Warehouse</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Buy</a>
                <i class="menu-dropdown ti-angle-down"></i>
                <ul className="sub-menu">
                  <li>
                    <a href="/buy">Buy report</a>
                  </li>
                  <li>
                    <a href="/buydetail">Buy detail</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/sale">Sale</a>
                <i class="menu-dropdown ti-angle-down"></i>
                <ul className="sub-menu">
                  <li>
                    <a href="/sale">Sale report</a>
                  </li>
                  <li>
                    <a href="/saledetail">Sale detail</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/customer">Customer</a>
              </li>
              <li>
                <a href="/size">Size</a>
              </li>
              <li>
                <a href="/revenue">Revenue</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
            </ul>
            <div className="d-inline-flex align-items-center">
              {/* <a href="#" className="search-icon icon">
                
                <i className="ti-search" />
              </a> */}
              <a href="/history" className="search-icon icon">
                {/* <img src="images/icons/search.png" alt=""> */}
                <i className="ti-money" />
              </a>
              <a href="/cart" className="cart-bag icon">
                {/* <img src="images/icons/bag.png" alt=""> */}
                <i className="ti-shopping-cart" />
                <span className="itemCount">n</span>
              </a>
              <a href="/login" className="wishlist icon">
                <i className="ti-user" />
                {/* <span className="itemCount">*</span> */}
                {/* <button className="btn btn-danger" type="button">Log In</button> */}
              </a>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
