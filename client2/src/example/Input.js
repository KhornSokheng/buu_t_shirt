import React, { useState } from "react";

export default function Input() {
  const [name, setName] = useState("orange");
  const [price, setPrice] = useState("0");

  const doInsertForm = (e) => {
    e.preventDefault();
    try {
      console.log(name, price);
      const bodyStr = { name, price };
      const resp = fetch("http://localhost:4000/insert", {
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
          <label htmlFor="name">Fruit name:</label>
          <input
            type="name"
            className="form-control"
            placeholder="Enter Fruit Name"
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Fruit price:</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter price"
            id="price"
            onChange={(e) => {
              setPrice(e.target.value);
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
