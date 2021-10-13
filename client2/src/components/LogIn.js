import React, { useState } from "react";
// import { Redirect } from 'react-router-dom'
// import { firebaseConfig } from '.../config'

export default function LogIn() {
  return (
    <div>
      <h1>This is Log in</h1>
      <form action="/login" className=" container needs-validation" noValidate>
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label htmlFor="validationCustom01">First name</label>
            <input
              type="text"
              className="form-control"
              id="validationCustom01"
              placeholder="First name"
              defaultValue=""
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="validationCustom02">Last name</label>
            <input
              type="text"
              className="form-control"
              id="validationCustom02"
              placeholder="Last name"
              defaultValue=""
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-md-12 mb-3">
            <label htmlFor="validationCustom03">Email address</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend">
                  @
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                id="validationCustom03"
                placeholder="Email address"
                aria-describedby="inputGroupPrepend"
                required
              />
              <div className="invalid-feedback">Please choose a Email.</div>
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label htmlFor="validationCustom04">Phone number</label>
            <input
              type="text"
              className="form-control"
              id="validationCustom04"
              placeholder="Phone number"
              required
            />
            <div className="invalid-feedback">
              Please provide a valid Phone Number.
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="validationCustom05">Credit card</label>
            <input
              type="text"
              className="form-control"
              id="validationCustom05"
              placeholder="Credit card"
              required
            />
            <div className="invalid-feedback">
              Please provide a valid Credit card.
            </div>
          </div>
          <div className="col-md-12 mb-3">
            <label htmlFor="validationCustom06">Password</label>
            <input
              type="password"
              className="form-control"
              id="validationCustom06"
              placeholder="Password"
              required
            />
            <div className="invalid-feedback">
              Please provide a valid Password.
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="invalidCheck"
              required
            />
            <label className="form-check-label" htmlFor="invalidCheck">
              Agree to terms and conditions
            </label>
            <div className="invalid-feedback">
              You must agree before submitting.
            </div>
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          Submit form
        </button>
      </form>
    </div>
  );
}
