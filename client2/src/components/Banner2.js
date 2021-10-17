import React from "react";

export default function Banner2() {
  return (
    <div>
      <section className="banner02">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="banner-content">
                <h1>30% off</h1>
                <h4>all product collection</h4>
                <a href="/product" className="btn-default">
                  shop now
                </a>
              </div>
            </div>
            <div className="col-md-6">
              <div className="ban-img">
                <img src="images/man.png" alt />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
