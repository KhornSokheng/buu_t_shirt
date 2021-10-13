import React, { useState } from "react";

export default function InsertCustomer(props) {
  const [cust_id, setCust_Id] = useState(props.cust_id);
  const [cust_name, setCust_Name] = useState(props.cust_name);
  const [cust_lname, setCust_Lname] = useState(props.cust_lname);
  const [phone_num, setPhone_Num] = useState(props.phone_num);
  const [credit_card, setCredit_Card] = useState(props.credit_card);
  const doInsert = (e) => {
    e.preventDefault();
    try {
      const bodyCustomer = {
        cust_id,
        cust_name,
        cust_lname,
        phone_num,
        credit_card,
      };
      const resp = fetch("http://localhost:5000/insertCustomer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyCustomer),
      });
      window.location = "/customer";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Customer</h2>
      <form onSubmit={doInsert} novalidate>
        <div className="form-group mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Cust Id"
            id="id"
            value={cust_id}
            required
            onChange={(e) => {
              setCust_Id(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Cust Name"
            id="usr"
            value={cust_name}
            required
            onChange={(e) => {
              setCust_Name(e.target.value);
            }}
          />
        </div>
        <div>
          <div class="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Cust Lname"
              id="usr"
              value={cust_lname}
              required
              onChange={(e) => {
                setCust_Lname(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Phone Num"
              id="pwd"
              value={phone_num}
              required
              onChange={(e) => {
                setPhone_Num(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Credit Card"
              id="status"
              value={credit_card}
              required
              onChange={(e) => {
                setCredit_Card(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group form-check"></div>
        <button type="submit" className="btn btn-success m-3">
          Submit
        </button>
        <a class="btn btn-danger" href="/customer" role="button">
          Cancel
        </a>
      </form>
    </div>
  );
}
