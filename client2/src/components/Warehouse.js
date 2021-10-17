import React, { useState, useEffect } from "react";
import EditBuyDetail from "./EditBuyDetail";
import Form from "react-bootstrap/Form";

export default function Warehouse() {
  // const id = props.id;
  const [prodList, setProdList] = useState(["P"]);
  const [full_prod_id,setFullProdId] = useState([]);
  const [buy_list,setBuylist] = useState([]);

  const deleteItem = async (full_prod_id) => {
    try {
      const del = await fetch(
        `http://localhost:5000/deleteBuydetail/${full_prod_id}`,
        {
          method: "DELETE",
        }
      );
      setProdList(
        prodList.filter((elt) => {
          return elt.full_prod_id !== full_prod_id;
        })
      );
    } catch (err) {
      console.error(err.message);
    }
  };
  const loadList = async () => {
    try {
      const resp = await fetch(`http://localhost:5000/getWarehouseView/${full_prod_id}`);
      const jsonData = await resp.json();

      setProdList(jsonData);

      console.log("Resp", resp);
      console.log("List:", prodList);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    console.log("Enter useEffect()");
    loadList();
  }, [full_prod_id]);
  return (
    <div className="container">
      <h2>Buy Detail</h2>
      <tr className="btn mt-3">
        <td>
          <Form.Control
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          onChange={(e) =>{
            setFullProdId(e.target.value)
          }}
          />
          {buy_list.map((item) => {
            return <p>{item.full_prod_id}</p>
          })}
        </td>
        <td>
          <a href="/insertbuydetail">
            <button className="btn btn-success ml-3 ">เพิ่มข้อมูล</button>
          </a>
        </td>
      </tr>
      <table className="table table-striped ">
        <thead>
          <tr>
            <th>Buy Id</th>
            <th>Item</th>
            <th>Full Product Id</th>
            <th>Product Name</th>
            <th>Color</th>
            <th>Size</th>
            <th>Buy Amount</th>
            <th>Buy Cost</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {prodList.map((elt) => {
            return (
              <tr>
                <td>{elt.full_prod_id}</td>
                <td>
                  <a>{elt.item}</a>
                </td>
                <a href="/warehouse"><td>{elt.full_prod_id}</td></a>
                <td>{elt.prod_name}</td>
                <td>{elt.color}</td>
                <td>{elt.size}</td>
                <td>{elt.buy_amount}</td>
                <td>{elt.buy_cost}</td>
                <td>
                  <EditBuyDetail
                    full_prod_id={elt.full_prod_id}
                    item={elt.item}
                    full_prod_id={elt.full_prod_id}
                    prod_name={elt.prod_name}
                    color={elt.color}
                    size={elt.size}
                    buy_amount={elt.buy_amount}
                    buy_cost={elt.buy_cost}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteItem(elt.full_prod_id)}
                  >
                    Del
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
