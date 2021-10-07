import React from "react";

export default function Banner() {
  return (
    <div>
      {/* Banner section start */}
      <section
        className="banner"
        style={{ backgroundImage: "url(images/bg-1.jpg)" }}
      >
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6 order-1 order-md-0">
              <div className="banner-content">
                <span className="tagline">ultimate collection</span>
                <h1>Men&Women Fashion Here</h1>
                <a href="#" className="btn-default">
                  shop now
                </a>
              </div>
            </div>
            <div className="col-md-6 order-0 order-md-1">
              <div className="ban-img">
                <img src="images/man2.png" alt />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Banner section end */}
    </div>
  );
}
