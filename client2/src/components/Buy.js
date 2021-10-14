import React, { useState, useEffect } from "react";
import EditBuy from "./EditBuy";
import Form from "react-bootstrap/Form";

export default function Buy() {
  const [list, setList] = useState([]);
  const [cost, setCost] = useState([]);
  const [buy_id,setID] = useState([]);
  const [buy_list,setBuylist] = useState([]);
  
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
      const resp = await fetch(`http://localhost:5000/getBuy/${buy_id}`);
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
  }, [buy_id]);
  return (
    <div className="container">
        <h3 >BUY REPORT</h3>

        <h1>buy id:{buy_id}</h1>
        {cost.map((elt)=>{return (<p>Total Cost:{elt.total} BAHT</p>)})}
        <div>
      <tr className="btn mt-1">
      <td>
          <Form.Control
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          onChange={(e) =>{
            setID(e.target.value)
          }}
          />
          {buy_list.map((item) => {
            return <p>{item.buy_id}</p>
          })}
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
