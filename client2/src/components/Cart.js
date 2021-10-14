import React from "react";
import { useLocation } from "react-router";

export default function Cart(props) {
  const sale_id = props.sale_id;
  const cust_id = props.cust_id;

  const location = useLocation().pathname;
  console.log(useLocation())

  return (
    <div className="container">
        <h1>{sale_id} {cust_id}</h1>
        <h1>Location: {location}</h1>
    </div>
  );
}
