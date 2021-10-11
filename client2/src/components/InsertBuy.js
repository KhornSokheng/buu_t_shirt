import React,{useState} from "react";
import Buy from "./Buy"

export default function InsertBuy() {
  const [buy_id,setID] = useState();
  const [buy_date,setDate] = useState();
  const [buy_status,setStatus] = useState();
  const doInsert = (e)=>{
    e.preventDefault();
    try {
      const bodybuy = {buy_id,buy_date,buy_status};
      const resp = fetch("http://localhost:5000/insertBuy",{
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
    <div className = "container" >
      <h2>Buy Insert</h2>
      <form action={doInsert} novalidate>
      <div className="form-group mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Buy Id"
            id="id"
            required
            onChange={e=>{
              setID(e.target.value)
            }}
          />
        </div>
        <div className="form-group" >
          <input
            type="date"
            className="form-control"
            placeholder="Enter Buy Date"
            id="date"
            required
            onChange={e=>{
              setDate(e.target.value)
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Buy Status"
            id="status"
            required
            onChange={e=>{
              setStatus(e.target.value)
            }}
          />
        </div>
        <div className="form-group form-check">
        </div>
        <button className="btn btn-success m-3">Submit</button>
        <a class="btn btn-danger" href="/buy" role="button">Cancel</a>
      </form>
    </div>
  );
}
