import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Cart from "./Cart";
// the idea is
// get props
// insert to table sale + sale_detail
// then go to page /cart

export default function AddCart2(props) {
  console.log(props.prod_id);
  const prod_id = props.prod_id;
  const color = props.color;
  const size = props.size;
  const sale_amount = props.sale_amount;
  const prod_price = props.prod_price;
  
  let [sale_idList, setSaleIdList] = useState([]);
  let sale_id;
  // const [prod_id,color, size, sale_amount,prod_price] = props;
  

  const currentUser = useSelector((state) => state.user.currentUser);
  const cust_id = currentUser.cust_id;

  const insertCart = async (e) => {
    e.preventDefault();
    
    
    try {
        
      const bodyData = { sale_id, cust_id, prod_id, color, size, sale_amount };
      const res = await fetch(`http://localhost:5000/insertCart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      //   window.location = `/cart/${sale_id}`;
      window.location = `/cart`;

      console.log(res);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getSaleId = async () => {
    try {
        const resp = await fetch(`http://localhost:5000/getSaleId/${cust_id}`);
        
        const jsonData = await resp.json();
  
        setSaleIdList(jsonData);
        
        

        console.log(sale_id)
  
        console.log("Response", resp);
        console.log("Sale ID: ", sale_id);
      } catch (err) {
        console.error(err.message);
      }
  }
  useEffect(() => {

      getSaleId();
      
  }, [])

  return (
    <div>
      <button
        type="button"
        className="btn btn-success"
        data-dismiss="modal"
        onClick={(e) => {
          insertCart(e);
        }}
      >
        Add To Cart 
        {sale_idList.map((item)=>{ sale_id=item.sale_id; return})}
        
      </button>
      
      <h5>
        Detail:[{prod_id},{color}, {size}, {sale_amount},{prod_price},{sale_id}]
      </h5>
      {/* <button type="submit" className="btn btn-success text-center" onClick={e=>{insertCart(e)}}>
        Add to cart
      </button> */}
    </div>
  );
}
