import React,{useState} from "react";

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
    <div className = "container">
      <h2>Buy Insert</h2>
      <form onSubmit={doInsert}>
      <div className="form-group mt-5">
          <input
            type="name"
            className="form-control"
            placeholder="Enter Buy Id"
            id="id"
            onChange={e=>{
              setID(e.target.value)
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            className="form-control"
            placeholder="Enter Buy Date"
            id="date"
            onChange={e=>{
              setDate(e.target.value)
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="type"
            className="form-control"
            placeholder="Enter Buy Status"
            id="status"
            onChange={e=>{
              setStatus(e.target.value)
            }}
          />
        </div>
        <div className="form-group form-check">
        </div>
        <button  type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
      
        <a href="/buy"><button className="btn btn-danger mt-1">Cancel</button></a>
    </div>
  );
}
