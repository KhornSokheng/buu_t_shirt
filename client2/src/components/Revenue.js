import React, { useEffect, useState } from "react";
import Chartprofit from "./Chartprofit";

export default function Revenue() {
  const [delivery_cost, setDeliCost] = useState([]);
  const [sale_revenue, setSaleRev] = useState([]);
  const [buy_cost, setBuyCost] = useState([]);
  let Delicost = 0
  let totalbuycost = 0
  const loadDeliCost = async () => {
    try {
      const resp = await fetch(`http://localhost:5000/getDeliveryCost`);
      
      const jsonData = await resp.json();

      setDeliCost(jsonData);

      console.log("Response", resp);
      console.log("List: ", delivery_cost);
    } catch (err) {
      console.error(err.message);
    }
  };
  const loadSaleRev = async () => {
    try {
      const resp = await fetch(`http://localhost:5000/getTotalSaleCostPrice`);
      
      const jsonData = await resp.json();

      setSaleRev(jsonData);

      console.log("Response", resp);
      console.log("List: ", sale_revenue);
    } catch (err) {
      console.error(err.message);
    }
  };
  const loadBuyCost = async () => {
    try {
      const resp = await fetch(`http://localhost:5000/getTotalBuyCost`);
      
      const jsonData = await resp.json();

      setBuyCost(jsonData);

      console.log("Response", resp);
      console.log("List: ", buy_cost);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    console.log("Enter useEffect");
    loadDeliCost();
    loadSaleRev();
    loadBuyCost();
  }, []);

  return (
    <div className="container">
      <h2>Revenue</h2>

      <div className="container d-flex justify-content-around ">
        <div className="col-6">
        {buy_cost.map((items) => {
          totalbuycost = items.total_buy_cost
            return (
              <>
                <div className="border border-primary rounded mb-3">
                  <div className="title text-left p-3 ">
                  <h3>Total Buy Cost: {items.total_buy_cost}</h3>
                  </div>  
                </div> 
              </>
            );
        })}
        {delivery_cost.map((items) => {
          Delicost = items.delivery_cost
            // sale_id = items.sale_id;
            // max = items.item;
            // sub_price = items.sale_amount * items.sale_price;
            // total_price += sub_price;
            // total_qty += items.sale_amount;
            return (
              <>
                <div className="border border-primary rounded mb-3">
                  <div className="title text-left p-3 ">
                  <h3>Total Delivery: {items.total_delivery}</h3>
                    <h3>Delivery Cost: {items.delivery_cost}</h3>
                    {/* <h6>Total Items: {cart_list.length}</h6>
                    <h6>Total Quantity: {total_qty}</h6> */}
                    {/* <h4>
                      Total Price:{" "}
                      <span className="text-danger">฿{total_price}</span>
                    </h4> */}
                  </div>

                  
                </div>
                
              </>
            );
          })}
          {sale_revenue.map((items) =>{
            return (
              <>
                <div className="border border-primary rounded mb-3">
                  <div className="title text-left p-3 ">
                  <h3>Total Sale Price: {items.total_sale_price}</h3>
                  <h3>Total Sale Cost: {items.total_sale_cost}</h3>
                  <h3>Total Sale Profit: {items.total_sale_price-items.total_sale_cost}</h3>
                  <h3>Total Profit: {items.total_sale_price-(totalbuycost+Delicost)}</h3>
                  </div>  
                </div> 
              </>
            );
          })}
           
        </div>

        <div className="col-6 pl-3">

          {/* <div className="border border-primary rounded">
            <div className="title text-left p-3">
              <h3>Order Summary</h3>
              <h6>Total Items: {cart_list.length}</h6>
              <h6>Total Quantity: {total_qty}</h6>
              <h4>
                Total Price: <span className="text-danger">฿{total_price}</span>
              </h4>
            </div>

           
          </div> */}
        </div>
      </div>
    </div>
  );
}
