import React from "react";
// import EditComp from "./EditComp";

export default function Header() {
  return (
    <div>
      {/* Header strat */}
      <header className="header">
        <div className="container">
          <nav className="navbar">
            {/* Site logo */}
            <a href="home-01.html" className="logo">
              <img src="images/logo.png" alt />
            </a>
            <a href="javascript:void(0);" id="mobile-menu-toggler">
              <i className="ti-align-justify" />
            </a>
            <ul className="navbar-nav">
              <li className="current-menu-item has-menu-child">
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Product</a>
              </li>
              <li>
                <a href="#">Buy</a>
                <i class="menu-dropdown ti-angle-down"></i>
                <ul className="sub-menu">
                  <li>
                    <a href="home-01.html">Buy report</a>
                  </li>
                  <li>
                    <a href="home-02.html">Buy detail</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Sale</a>
                <i class="menu-dropdown ti-angle-down"></i>
                <ul className="sub-menu">
                  <li>
                    <a href="home-01.html">Sale report</a>
                  </li>
                  <li>
                    <a href="home-02.html">Sale detail</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Customer</a>
              </li>
              <li>
                <a href="#">Size</a>
              </li>
              <li>
                <a href="#">Register</a>
              </li>
            </ul>
            <div className="d-inline-flex align-items-center">
              <a href="#" className="search-icon icon">
                {/* <img src="images/icons/search.png" alt=""> */}
                <i className="ti-search" />
              </a>
              <a href="#" className="cart-bag icon">
                {/* <img src="images/icons/bag.png" alt=""> */}
                <i className="ti-shopping-cart" />
                <span className="itemCount">0</span>
              </a>
              <a href="#" className="wishlist icon">
                <i className="ti-heart" />
                <span className="itemCount">09</span>
              </a>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
