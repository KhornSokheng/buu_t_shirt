import React, { useState } from "react";

export default function InsertProduct() {
  const [full_prod_id, setFull] = useState();
  const [prod_name, setName] = useState();
  const [color, setColor] = useState();
  const [size, setSize] = useState();
//   const [total_amount, setTotalAmount] = useState();
//   const [sold_amount, setSoldAmount] = useState();
  const [prod_cost, setProdCost] = useState();
  const [prod_price, setProdPrice] = useState();
  const [prod_id, setProdId] = useState();
  const [prod_color_id, setProdColorId] = useState();
  const [image_url, setImageURL] = useState();

  const doInsert = (e) => {
    e.preventDefault();
    try {
      const bodyData = { prod_name,color,size,prod_cost,prod_id,image_url};
      const resp = fetch("http://localhost:5000/insertNewProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });
      window.location = "/warehouse";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="container">
      <h2>Add New Product</h2>
      <form onSubmit={doInsert} novalidate>
      <div className="form-group mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="product ID"
            id="id"
            required
            onChange={(e) => {
              setProdId(e.target.value);
            }}
          />
        </div>
        {/* <div className="form-group mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="produdt color ID"
            id="id"
            required
            onChange={(e) => {
              setProdColorId(e.target.value);
            }}
          />
        </div> */}
        {/* <div className="form-group mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="Full_prod_id"
            id="id"
            required
            onChange={(e) => {
              setFull(e.target.value);
            }}
          />
        </div> */}
        <div className="form-group mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="Product Name"
            id="id"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="form-group mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="color"
            id="id"
            required
            onChange={(e) => {
              setColor(e.target.value);
            }}
          />
        </div>
        <div className="form-group mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="size"
            id="id"
            required
            onChange={(e) => {
              setSize(e.target.value);
            }}
          />
        </div>
        {/* <div className="form-group mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="total_amount"
            id="id"
            required
            onChange={(e) => {
              setTotalAmount(e.target.value);
            }}
          />
        </div>
        <div className="form-group mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="sold_amount"
            id="id"
            required
            onChange={(e) => {
              setSoldAmount(e.target.value);
            }}
          />
        </div> */}
        <div className="form-group mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="prod_cost"
            id="id"
            required
            onChange={(e) => {
              setProdCost(e.target.value);
            }}
          />
        </div>
        {/* <div className="form-group mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="product price"
            id="id"
            required
            onChange={(e) => {
              setProdPrice(e.target.value);
            }}
          />
        </div> */}
        <div className="form-group mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="image URL"
            id="id"
            required
            onChange={(e) => {
              setImageURL(e.target.value);
            }}
          />
        </div>
        

        
        <div className="form-group form-check"></div>
        <button className="btn btn-success m-3">Submit</button>
        <a class="btn btn-danger" href="/buy" role="button">
          Cancel
        </a>
      </form>
    </div>
  );
}
