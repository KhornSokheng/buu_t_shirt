import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

export default function SelectName() {
//   const [prod_id, setProdId] = useState([props.prod_id]);
//   const [color, setColor] = useState([props.color]);
  // const color ="Brown"
  
  const [prod_list, setList] = useState([]);

  const loadList = async () => {
    try {
      const resp = await fetch(`http://localhost:5000/getProduct`);
      const jsonData = await resp.json();

      setList(jsonData);

      console.log("Response", resp);
      console.log("List: ", prod_list);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    console.log("Enter useEffect");
    loadList();
  }, []);

  return (
    <>
      
      <Form.Select aria-label="Default select"  className="form-control">
        <option value="Size detail">Select Product Name</option>
      {prod_list.map((products)=>{
        return (
          <>
            
            <option value={products.prod_name} placeholder="Name">{products.prod_name}</option>
            
            
         </>
        )
      })}
      </Form.Select>
    </>
  );
}
