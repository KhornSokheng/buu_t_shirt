import React, { useState, useEffect } from "react";
import EditBuy from "./EditBuy";

export default function Buy() {
  const [list, setList] = useState([]);
  const [cost, setCost] = useState([]);
<<<<<<< HEAD
  
=======
  // let cost
>>>>>>> e74b402319b86b09fd351ae8b48518dfac56bfb1
  const deleteItem = async (buy_id) => {
    try {
      const del = await fetch(`http://localhost:5000/deleteBuy/${buy_id}`, {
        method: "DELETE",
      });
      setList(
        list.filter((elt) => {
          return elt.buy_id !== buy_id;
        })
      );
    } catch (err) {
      console.error(err.message);
    }
  };
  const loadList = async () => {
    try {
      const resp = await fetch("http://localhost:5000/getBuy");
      const jsonData = await resp.json();

      setList(jsonData);

      console.log("Resp", resp);
      console.log("List:", list);
    } catch (err) {
      console.error(err.message);
    }
  };
  const loadCost = async () => {
    try {
      const resp = await fetch("http://localhost:5000/getCostTotal");
      const jsonData = await resp.json();

      setCost(jsonData);
<<<<<<< HEAD
      // cost = jsonData[0].total
=======
      // cost = jsonData
>>>>>>> e74b402319b86b09fd351ae8b48518dfac56bfb1

      console.log("Resp", resp);
      console.log("List:", cost);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    console.log("Enter useEffect()");
    loadList();
    loadCost();
  }, []);
  return (
    <div className="container">
<<<<<<< HEAD
      <h3>BUY REPORT</h3>
      
      {cost.map((elt) => {
            return (
              <p>Total Cost:{elt.total}</p>
            );
          })}
=======
      
        <h3 className="d-flex justify-content-center">BUY REPORT</h3>
        {cost.map((elt)=>{return (<h4  className="d-flex justify-content-center text-danger">Total Cost:{elt.total} BAHT</h4>)})}
        <div className="d-flex justify-content-center">
>>>>>>> e74b402319b86b09fd351ae8b48518dfac56bfb1
      <tr className="btn mt-1">
        <td>
          <input></input>
          <button className="btn btn-secondary ml-1">ค้นหา</button>
        </td>
        <td>
          <a href="/insertbuy">
            <button className="btn btn-success ml-3">เพิ่มข้อมูล</button>
          </a>
        </td>
      </tr>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Buy date</th>
            <th>Buy id</th>
            <th>Buy status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {list.map((elt) => {
            return (
              <tr>
                <td>{elt.buy_date}</td>
                <td>
                  <a href="/buydetail">{elt.buy_id}</a>
                </td>
                <td>{elt.buy_status}</td>
                <td>
                  <EditBuy
                    buy_date={elt.buy_date}
                    buy_id={elt.buy_id}
                    buy_status={elt.buy_status}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteItem(elt.buy_id)}
                  >Del</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
