import React, { useEffect, useState } from "react";

export default function Revenue() {
  const [delivery_cost, setDeliCost] = useState([]);
  const [sale_revenue, setSaleRev] = useState([]);

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
      const resp = await fetch(`http://localhost:5000/getDeliveryCost`);
      
      const jsonData = await resp.json();

      setSaleRev(jsonData);

      console.log("Response", resp);
      console.log("List: ", delivery_cost);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    console.log("Enter useEffect");
    loadDeliCost();
    loadSaleRev();
  }, []);

  return (
    <div className="container">
      <h2>Revenue</h2>

      <div className="container d-flex justify-content-around ">
        <div className="col-6">
          {delivery_cost.map((items) => {
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
