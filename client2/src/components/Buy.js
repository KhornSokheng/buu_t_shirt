import React, { useState, useEffect } from "react";
import EditBuy from "./EditBuy";
import InsertBuy from "./InsertBuy";

export default function Buy() {
  const [list, setList] = useState([]);
  

  

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
  useEffect(() => {
    console.log("Enter useEffect()");
    loadList();
  }, []);
  return (
    <div className="container">
      <h3>BUY REPORT</h3>
      <tr className="btn mt-5">
        <td>
          <input></input>
          <button className="btn btn-secondary ">ค้นหา</button>
        </td>
        <td>
        <a href = "/insertbuy"><button className="btn btn-success ml-5 ">เพิ่มข้อมูล</button></a>
        </td>
      </tr>
      <table className="table table-striped mt-5">
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
                <td>{elt.buy_date.slice(0, 10)}</td>
                <td>
                  <a href="/buydetail">{elt.buy_id}</a>
                </td>
                <td>{elt.buy_status}</td>
                <td><EditBuy
                buy_date={elt.buy_date}
                buy_id={elt.buy_id}
                buy_status={elt.buy_status}
                /></td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteItem(elt.buy_id)}
                  >
                    ลบ
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
