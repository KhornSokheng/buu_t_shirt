import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Form from "react-bootstrap/Form";
import SelectSize2 from "./SelectSize2";
import CheckOut from "./CheckOut";

export default function Cart(props) {
  const [sale_id, setSaleId] = useState([]);
  const [cust_id, setCustId] = useState([]);
  const [cart_list, setCartList] = useState([]);
  let max = 0;
  let total_price = 0;
  let sub_price = 0;
  let total_qty = 0;

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
      <h5 className="text-left">Customer ID: {cust_id}</h5>

      {/* search using sale_id (?) section */}
      <Form.Control
        className="mt-2"
        size="lg"
        type="text"
        placeholder="EX: C9999"
        onChange={(e) => {
          setCustId(e.target.value);
        }}
      />

      <section className="feat-product">
        <div className="container d-flex justify-content-around ">
          <div className="col-6">
            {cart_list.map((items) => {
              max = items.item;
              sub_price = items.sale_amount * items.sale_price;
              total_price += sub_price;
              total_qty += items.sale_amount;
              return (
                <>
                  <div className=" mb-3 row border border-primary rounded pb-2">
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

          <div className="col-6 pl-3">
            <div className="border border-primary rounded">
              <div className="title text-left p-3">
                <h3>Order Summary</h3>
                <h6>Total Items: {cart_list.length}</h6>
                <h6>Total Quantity: {total_qty}</h6>
                <h4 >Total Price: <span className="text-danger">฿{total_price}</span></h4>
              </div>

              <div className="check-out d-flex justify-content-xl-around">
                {/* <button className="btn btn-danger m-3">CHECK OUT</button> */}

                <CheckOut
                    sale_id ={sale_id}
                />
                <a href="/product" className="btn btn-success m-3">
                  CONTINUE SHOPPING
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
