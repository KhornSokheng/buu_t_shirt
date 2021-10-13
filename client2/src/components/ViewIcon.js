import React from "react";


export default function ViewIcon(props) {
    const prod_id = props.prod_id;
    const color = props.color;
    const prod_color_id = props.prod_color_id;
    const prod_link = `/viewproduct/${prod_color_id}`;
  return (
    <>
      <a href={prod_link} className="quick-view icon">
        <i className="ti-eye" />
      </a>
    </>
  );
}
