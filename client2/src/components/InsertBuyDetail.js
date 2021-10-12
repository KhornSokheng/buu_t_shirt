import React, { useState } from 'react'

export default function InsertBuyDetail() {

    const [prod_name,setName] = useState();
    const [color,setColor] = useState();
    const [size,setSize] = useState();
    const [amount,setAmount] = useState();
    const doInsert = (e)=>{
        e.preventDefault();
        try {
          const bodybuy = {prod_name,color,size};
          const resp = fetch("http://localhost:5000/insertBuyDetail",{
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(bodybuy)
          })
          window.location="/buy";
        } catch (err) {
          console.error(err.message)
        }
      }

    return (
        <div className="container">
            <h2>Insert Buy</h2>
      <form action={doInsert} novalidate>
      <div className="form-group mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Product Name"
            id="name"
            required
            onChange={e=>{
              setName(e.target.value)
            }}
          />
        </div>
        <div className="form-group" >
          <input
            type="text"
            className="form-control"
            placeholder="Enter Product Color"
            id="color"
            required
            onChange={e=>{
              setColor(e.target.value)
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
            onChange={e=>{
              setSize(e.target.value)
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            placeholder="Enter Amount"
            id="amount"
            required
            onChange={e=>{
              setAmount(e.target.value)
            }}
          />
        </div>
        <div className="form-group form-check">
        </div>
        <button className="btn btn-success m-3">Submit</button>
        <a class="btn btn-danger" href="/buydetail" role="button">Cancel</a>
      </form>
        </div>
    )
}
