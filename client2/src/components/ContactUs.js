import React from "react";

export default function ContactUs() {
  return (
    <div className="container d-flex justify-content-around">
      <div className="col-8">
        <form action="" method="post">
          <div className="">
            <div className="">
              <div className="bg-green text-black text-center py-2">
                <h3>
                  <i className="fa fa-envelope" /> Contact Us
                </h3>
                <p className="m-0">ติดต่อเรา</p>
              </div>
            </div>
            <div className="card-body p-3">
              {/*Body*/}
              <div className="form-group">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fa fa-user text-info" />
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="Name"
                    name="Name"
                    placeholder="Your name"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fa fa-envelope text-info" />
                    </div>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    id="Email"
                    name="Email"
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fa fa-comment text-info" />
                    </div>
                  </div>
                  <textarea
                    className="form-control"
                    placeholder="Message"
                    required
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="text-center">
                <input
                  type="submit"
                  defaultValue="Enviar"
                  className="btn btn-primary  rounded-0 py-2 mx-2"
                />
                <input
                  type="clear"
                  defaultValue="Clear"
                  className="btn btn-danger  rounded-0 py-2 mx-2"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="col-6 text-left align-item-center justify-content-center">
        <h2 style={{color: "gray" }}>
          <i
            className="ti-email mx-5"
            style={{ fontSize: "50px", color: "black" }}
          />
          Email : BUUTSHIRT@gmail.com
        </h2>
        <h2 style={{color: "gray" }}>
          <i
            className="ti-tablet mx-5"
            style={{ fontSize: "50px", color: "black" }}
          />
          Phone : 099-999-9999
        </h2>
        <h2 style={{color: "gray" }}>
          <i
            className="ti-location-pin mx-5"
            style={{ fontSize: "50px", color: "black" }}
          />
          Burapha Uni Chantaburi
        </h2>
        <h2 style={{color: "gray" }}>
          <i className="ti-time mx-5" 
          style={{ fontSize: "50px", color: "black" }}/>
          10:00 AM - 10:00 PM
        </h2>
      </div>
    </div>
  );
}