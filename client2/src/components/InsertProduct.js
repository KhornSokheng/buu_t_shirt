import React,{useState} from "react";

export default function InsertProduct() {

    const [full_prod_id, setFull] = useState(props.full_prod_id);
    const [prod_name, setName] = useState(props.prod_name);
    const [color, setColor] = useState(props.color);
    const [size, setSize] = useState(props.size);
    const [total_amount, setTotalAmount] = useState(props.total_amount);
    const [sold_amount, setSoldAmount] = useState(props.sold_amount);
    const [prod_cost, setProdCost] = useState(props.prod_cost);
    const [prod_price, setProdPrice] = useState(props.prod_price);
    const [prod_id, setProdId] = useState(props.prod_id);
    const [prod_color_id, setProdColorId] = useState(props.prod_color_id);

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
      <h2>Add New Product</h2>
      <form onSubmit={doInsert} novalidate>
      <div className="form-group mt-5" >
          <input
            type="text"
            className="form-control"
            placeholder="Enter Buy Id"
            id="id"
            required
            onChange={e=>{
              setFull(e.target.value)
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
