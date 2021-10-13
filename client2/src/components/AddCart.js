import React from "react";

// the idea is 
// get props
// insert to table sale + sale_detail 
// then go to page /cart

export default function AddCart(props) {
    console.log(props.prod_id)
    const prod_id = props.prod_id
    const color = props.color
    const size = props.size
    const sale_amount = props.sale_amount
    const prod_price = props.prod_price
    // const [prod_id,color, size, sale_amount,prod_price] = props;
  return (
    <div>
        <h5>Detail:[{prod_id},{color}, {size}, {sale_amount},{prod_price}]</h5>
      <button type="submit" className="btn btn-success text-center">
        Add to cart
      </button>
      
    </div>
  );
}
