import React from "react";

export default function Header() {
  return (
    <div>
      {/* Header strat */}
      <header className="header">
        <div className="container">
          <nav className="navbar">
            {/* Site logo */}
            <a href="/" className="logo">
              <img src="images/logo_1.png" alt />
            </a>
            <a href="javascript:void(0);" id="mobile-menu-toggler">
              <i className="ti-align-justify" />
            </a>
            <ul className="navbar-nav">
              <li className="current-menu-item has-menu-child">
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/product">Product</a>
              </li>
              <li>
                <a href="/buy">Buy</a>
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
                <a href="/sale">Sale</a>
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
                <a href="/customer">Customer</a>
              </li>
              <li>
                <a href="/size">Size</a>
              </li>
              <li>
                <a href="/register">Register</a>
              </li>
            </ul>
            <div className="d-inline-flex align-items-center">
              <a href="#" className="search-icon icon">
                {/* <img src="images/icons/search.png" alt=""> */}
                <i className="ti-search" />
              </a>
              <a href="/cart" className="cart-bag icon">
                {/* <img src="images/icons/bag.png" alt=""> */}
                <i className="ti-shopping-cart" />
                <span className="itemCount">n</span>
              </a>
              <a href="/wishlist" className="wishlist icon">
                <i className="ti-heart" />
                <span className="itemCount">n</span>
              </a>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
