import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Form from "react-bootstrap/Form";

export default function Cart(props) {
  const [sale_id, setSaleId] = useState([]);
  const [cust_id, setCustId] = useState([]);
  const [cart_list, setCartList] = useState([]);

  const location = useLocation().pathname;
  //   sale_id = location.pathname.split("/")[2];

  const loadList = async () => {
    try {
      const resp = await fetch(`http://localhost:5000/getCartList/${cust_id}`);
      // const resp = await fetch(`http://localhost:5000/getProduct/P001`);
      const jsonData = await resp.json();

      setCartList(jsonData);

      console.log("Response", resp);
      console.log("List: ", cart_list);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    console.log("Enter useEffect");
    loadList();
  }, [cust_id]);

  return (
    <div className="container">
      <h1>Sale: {sale_id}</h1>
      <h1>Customer: {cust_id}</h1>
      <h1>Location: {location}</h1>

      {/* search using sale_id (?) section */}
      <Form.Control
        className="m-5"
        size="lg"
        type="text"
        placeholder="EX: C9999"
        onChange={(e) => {
          setCustId(e.target.value);
        }}
      />

      {cart_list.map((items) => {
        return <h1>{items.full_prod_id}</h1>;
      })}
    </div>
  );
}
