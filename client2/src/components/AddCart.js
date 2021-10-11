import React from "react";

export default function AddCart(params) {
    console.log(params.prod_id)
    const prod_id = params.prod_id
    const color = params.color
    const size = params.size
    const sale_amount = params.sale_amount
    const prod_price = params.prod_price
    // const [prod_id,color, size, sale_amount,prod_price] = params;
  return (
    <div>
      <button type="submit" className="btn btn-success text-center">
        Add to cart
      </button>
      <h1>{prod_id},{color}, {size}, {sale_amount},{prod_price}</h1>
    </div>
  );
}
