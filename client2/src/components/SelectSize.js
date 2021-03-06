import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

export default function SelectSize(props) {
  const [prod_id, setProdId] = useState([props.prod_id]);
  const [prod_color_id, setProdColorId] = useState([props.prod_color_id]);
  const [color, setColor] = useState([props.color]);
  // const color ="Brown"
  
  const [size_list, setList] = useState([]);

  const loadList = async () => {
    try {
      const bodyData = {prod_id, color,prod_color_id}
      const resp = await fetch(`http://localhost:5000/getSizeRemain`,{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
      }
      
      );
      const jsonData = await resp.json();

      setList(jsonData);

      console.log("Response", resp);
      console.log("List: ", size_list);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    console.log("Enter useEffect");
    setColor(color)
    loadList();
  }, [color]);

  return (
    <>
      
      <Form.Select aria-label="Default select"  className="form-control">
        <option value="L">Select Size</option>
      {size_list.map((sz)=>{
        return (
          <>
            
            <option value={sz.size} placeholder="Size">{sz.size}</option>
            {/* <h2>{sz.size}</h2> */}
            
         </>
        )
      })}
      </Form.Select>
    </>
  );
}
