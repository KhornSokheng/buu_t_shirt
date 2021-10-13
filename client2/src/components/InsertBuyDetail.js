import React, { useState } from "react";
import SelectColorBuy from "./SelectColorBuy";
import SelectName from "./SelectName";
import SelectSizeBuy from "./SelectSizeBuy";
import SelectBuyID from "./SelectBuyID";

export default function InsertBuyDetail() {
  const [buy_id, setId] = useState();
  const [prod_name, setName] = useState();
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [buy_amount, setAmount] = useState();
  const [buy_cost, setCost] = useState();
  const doInsert = (e) => {
    e.preventDefault();
    try {
      const bodybuy = { buy_id,prod_name, color, size ,buy_amount,buy_cost};
      console.log(prod_name);
      const resp = fetch("http://localhost:5000/insertBuyDetail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodybuy),
        
      });
      window.location = "/buy";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="container">
      <h2>Insert Buy</h2>
      <form onSubmit={doInsert} novalidate>
      <div className="form-group mt-5" onChange={e=>{
            setId(e.target.value)
            }}>
          <SelectBuyID/>
        </div>
        <div className="form-group" onChange={e=>{
            setName(e.target.value)
            }}>
          <SelectName/>
        </div>
        <div className="form-group " onChange={e=>{
            setColor(e.target.value)
            }}>
          <SelectColorBuy/>
        </div>
        <div className="form-group " onChange={e=>{
            setSize(e.target.value)
            }}>
          <SelectSizeBuy/>
        </div>


        {/* <input
            type="text"
            className="form-control"
            placeholder="Enter Product Name"
            id="name"
            required
            onChange={e=>{
              setName(e.target.value)
            }}
          /> */}
        {/* <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Product Color"
            id="color"
            required
            onChange={(e) => {
              setColor(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Product Size"
            id="size"
            required
            onChange={(e) => {
              setSize(e.target.value);
            }}
          />
        </div> */}
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            placeholder="Enter Amount"
            id="amount"
            required
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            placeholder="Cost"
            id="cost"
            required
            onChange={(e) => {
              setCost(e.target.value);
            }}
          />
        </div>
        <div className="form-group form-check"></div>
        <button className="btn btn-success m-3">Submit</button>
        <a class="btn btn-danger" href="/buydetail" role="button">
          Cancel
        </a>
      </form>
    </div>
  );
}
