import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import EditProduct from "./EditProduct";

export default function Warehouse() {
  // const id = props.id;
  
  const [full_prod_id, setFullProdId] = useState(["P"]);
  const [prodList, setProdList] = useState([]);

  const loadList = async () => {
    try {
      const resp = await fetch(
        `http://localhost:5000/getWarehouseView/${full_prod_id}`
      );
      const jsonData = await resp.json();

      setProdList(jsonData);

      console.log("Resp", resp);
    //   console.log("List:", prodList);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    console.log("Enter useEffect()");
    loadList();
  }, [full_prod_id]);
  return (
    <div className="">
      <h2>Warehouse</h2>
      <tr className="btn mt-3">
        <td>
          <Form.Control
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search full prod id"
            onChange={(e) => {
              setFullProdId(e.target.value);
            }}
          />
          
        </td>
        <td>
          <a href="/insertProduct">
            <button className="btn btn-success ml-3 ">Add New Product</button>
          </a>
        </td>
      </tr>
      <table className="table table-striped ">
        <thead>
          <tr>
            <th>Full_prod_id</th>
            <th>Product Name</th>
            <th>Color</th>
            <th>Size</th>
            <th>Total Amount</th>
            <th>Sold Amount</th>
            <th>In Stock</th>
            <th>Cost</th>
            <th>Price</th>
            <th>Product Id</th>
            <th>Prod_color_id</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
        {prodList.map((product) => {
            return (
              <tr>
                <td>{product.full_prod_id}</td>
                <td>{product.prod_name}</td>
                <td>{product.color}</td>
                <td>{product.size}</td>
                <td>{product.total_amount}</td>
                <td>{product.sold_amount}</td>
                <td>{product.total_amount - product.sold_amount}</td>
                <td>{product.prod_cost}</td>
                <td>{product.prod_price}</td>
                <td>{product.prod_id}</td>
                <td>{product.prod_color_id}</td>
                <td>
                  <EditProduct
                    full_prod_id={product.full_prod_id}                    
                    prod_name={product.prod_name}
                    color={product.color}
                    size={product.size}
                    total_amount={product.total_amount}
                    sold_amount={product.sold_amount}
                    prod_cost={product.prod_cost}
                    prod_price={product.prod_price}
                    prod_id={product.prod_id}
                    prod_color_id={product.prod_color_id}

                  />
                </td>
                {/* <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteItem(product.full_prod_id)}
                  >
                    Del
                  </button>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}
