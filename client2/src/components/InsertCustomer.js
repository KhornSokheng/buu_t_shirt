import React, { useState } from "react";

export default function Input() {
  const [cust_id, setID] = useState("C0000");
  const [cust_name, setName] = useState("Name");
  const [cust_lname, setLName] = useState("LastName");

  const doInsertForm = (e) => {
    e.preventDefault();
    try {
      // console.log(name, price);
      const bodyStr = { cust_id,cust_name,cust_lname };
      const resp = fetch("http://localhost:5000/insertCustomer", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(bodyStr),
      })
      window.location = "/";
      
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={doInsertForm}>

      <div className="form-group">
          <label htmlFor="name">Cust ID:</label>
          <input
            type="name"
            className="form-control"
            placeholder="Enter id"
            id="cust_id"
            onChange={(e) => {
              setID(e.target.value);
            }}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="name">Cust name:</label>
          <input
            type="name"
            className="form-control"
            placeholder="Enter Customer Name"
            id="cust_name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          
        </div>
        <div className="form-group">
          <label htmlFor="name">Cust lastname:</label>
          <input
            type="name"
            className="form-control"
            placeholder="Enter Customer last Name"
            id="cust_lname"
            onChange={(e) => {
              setLName(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
