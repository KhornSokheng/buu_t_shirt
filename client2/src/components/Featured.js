import React from "react";

export default function Featured() {
  return (
    <div>
      <section className="features">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <div className="featureBox">
                <img
                  src="images/feature-icons/1.png"
                  alt="Cash"
                  className="feat-icon"
                />
                <h5>Money back gurantee</h5>
                <p>Great fill signs he evening</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="featureBox">
                <img
                  src="images/feature-icons/2.png"
                  alt="Delivery"
                  className="feat-icon"
                />
                <h5>Free Delivery</h5>
                <p>Great fill signs he evening</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="featureBox">
                <img
                  src="images/feature-icons/3.png"
                  alt="Support"
                  className="feat-icon"
                />
                <h5>Alway support</h5>
                <p>Great fill signs he evening</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="featureBox">
                <img
                  src="images/feature-icons/4.png"
                  alt="Secure payment"
                  className="feat-icon"
                />
                <h5>Secure payment</h5>
                <p>Great fill signs he evening</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
