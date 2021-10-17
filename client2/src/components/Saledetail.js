import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import EditSaledetail from "./EditSaleDetail";

export default function Saledetail() {
  const [list, setList] = useState([]);
  const [sale_id, setID] = useState(["S"]);
  const [sale_list, setSalelist] = useState([]);

  const loadList = async () => {
    try {
      const resp = await fetch(
        `http://localhost:5000/getSaledetail/${sale_id}`
      );
      const jsonData = await resp.json();

      setList(jsonData);

      console.log("Resp", resp);
      console.log("List:", list);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    console.log("Enter useEffect()");
    loadList();
  }, [sale_id]);
  return (
    <div className="container">
      <h3>SALE DETAIL</h3>
      <div>
        <tr className="btn mt-1">
          <td>
            <Form.Control
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              onChange={(e) => {
                setID(e.target.value);
              }}
            />
            {sale_list.map((item) => {
              return <p>{item.sale_id}</p>;
            })}
          </td>
          {/* <td>
          <a href="/insertbuy">
            <button className="btn btn-success ml-3">เพิ่มข้อมูล</button>
          </a>
        </td> */}
        </tr>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sale id</th>
            <th>Item</th>
            <th>Full Product ID</th>
            <th>Sale Amount</th>
            <th>Sale Cost</th>
            <th>Sale Price</th>
          </tr>
        </thead>
        <tbody>
          {list.map((elt) => {
            return (
              <tr>
                <td>{elt.sale_id}</td>
                <td>{elt.item}</td>
                <td>{elt.full_prod_id}</td>
                <td>{elt.sale_amount}</td>
                <td>{elt.sale_cost}</td>
                <td>{elt.sale_price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
