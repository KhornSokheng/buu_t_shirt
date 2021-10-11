import React, { useState, useEffect } from "react";
import EditBuyDetail from "./EditBuyDetail";

export default function Buydetail() {
  // const id = props.id;
  const [list, setList] = useState([]);


  const deleteItem = async (full_prod_id) => {
    try {
      const del = await fetch(`http://localhost:5000/deleteBuydetail/${full_prod_id}`, {
        method: "DELETE",
      });
      setList(
        list.filter((elt) => {
          return elt.full_prod_id !== full_prod_id;
        })
      );
    } catch (err) {
      console.error(err.message);
    }
  };
  const loadList = async () => {
    try {
      const resp = await fetch(`http://localhost:5000/getBuydetail`);
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
  }, []);
  return (
    <div className="container">
      <h2>Buy Detail</h2>
      <tr className="btn mt-5">
        <td>
          <input></input>
          <button className="btn btn-secondary mr-1">ค้นหา</button>
        </td>
        <td>
        <a href = "/insertbuydetail"><button className="btn btn-success ml-5 ">เพิ่มข้อมูล</button></a>
        </td>
      </tr>
      <table className="table table-striped mt-5">
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
          {list.map((elt) => {
            return (
              <tr>
                <td>{elt.buy_id}</td>
                <td>
                  <a>{elt.item}</a>
                </td>
                <td>{elt.full_prod_id}</td>
                <td>{elt.prod_name}</td>
                <td>{elt.color}</td>
                <td>{elt.size}</td>
                <td>{elt.buy_amount}</td>
                <td>{elt.buy_cost}</td>
                <td><EditBuyDetail/></td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteItem(elt.full_prod_id)}
                  >ลบ</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
