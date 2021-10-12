import React from "react";


export default function ViewIcon(props) {
    const prod_id = props.prod_id;
    const color = props.color;
    const prod_link = `/viewproduct/${prod_id}/${color}`;
  return (
    <>
      <a href={prod_link} className="quick-view icon">
        <i className="ti-eye" />
      </a>
    </>
  );
}
