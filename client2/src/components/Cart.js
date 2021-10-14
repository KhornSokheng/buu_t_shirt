import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Form from "react-bootstrap/Form";
import SelectSize2 from "./SelectSize2";

export default function Cart(props) {
  const [sale_id, setSaleId] = useState([]);
  const [cust_id, setCustId] = useState([]);
  const [cart_list, setCartList] = useState([]);
  let max = 0;
  let total_price = 0;
  let sub_price = 0;

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
      <h1>Customer: {cust_id}</h1>

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

      
      <section className="feat-product">
        <div className="container">
          <div className="row">
            {cart_list.map((items) => {
              max = items.item;
              sub_price = items.sale_amount * items.sale_price;
              total_price += sub_price;
              return (
                <>
                  <div className="col-sm-4">
                    <div className="product-item">
                      <figure className="product-thumb">
                        <img src={items.image_url} alt />
                      </figure>
                      <div className="product-content">
                        <h5 className="product-name">
                          <a href="#">{items.prod_name}</a>
                        </h5>
                        <h5 className="product-name">
                          <a href="#">Color: {items.color}</a>
                        </h5>
                        {/* <SelectSize2 prod_id={items.prod_id} color={items.color} prod_color_id={items.prod_color_id}/> */}
                        <h5 className="product-name text-primary">
                          Quantity: {items.sale_amount}
                        </h5>
                        <p className="price text-danger">
                          Subtotal: ฿{items.sale_amount * items.sale_price}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
      <h2>Total Items: {cart_list.length}</h2>
      <h2>Total Price: ฿{total_price}</h2>
    </div>
  );
}
