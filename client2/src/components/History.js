import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";

export default function History() {
  const [list, setList] = useState([]);
  // const [cust_id,setID] = useState("C");
  const [sale_list, setSalelist] = useState([]);

  const cust_name = useSelector((state) => state.user.cust_name);
  const email = useSelector((state) => state.user.email);
  const cust_id = useSelector((state) => state.user.cust_id);
  const user= useSelector((state)=> state.user)

  const loadList = async () => {
    try {
      const resp = await fetch(`http://localhost:5000/getHistory/${cust_id}`);
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
  }, [cust_id]);
  return (
    <div className="container">
      <h3>Your Order History's Here, {user.cust_name}</h3>
      <tr className="btn mt-1">
        <td>
          {/* <Form.Control
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          onChange={(e) =>{
            setID(e.target.value)
          }}
          /> */}
          {/* <h1>Cust_id: {user.email}</h1> */}
          {sale_list.map((item) => {
            return <p>{item.cust_id}</p>;
          })}
        </td>
      </tr>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Sale date</th>
            <th>Sale id</th>
            <th>Customer id</th>
            <th>Receiver name</th>
            <th>Item</th>
            <th>Full product id</th>
            <th>Sale amount</th>
            <th>Sale cost</th>
            <th>Sale price</th>
            <th>Sale status</th>
            <th>Delivery status</th>
          </tr>
        </thead>
        <tbody>
          {list.map((elt) => {
            return (
              <tr>
                <td>{elt.sale_date}</td>
                <td>{elt.sale_id}</td>
                <td>{elt.cust_id}</td>
                <td>{elt.receiver_name}</td>
                <td>{elt.item}</td>
                <td>{elt.full_prod_id}</td>
                <td>{elt.sale_amount}</td>
                <td>{elt.sale_cost}</td>
                <td>{elt.sale_price}</td>
                <td>{elt.sale_status}</td>
                <td>{elt.delivery_status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
