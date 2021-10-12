import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

export default function SelectColor(props) {
  const [prod_id, setProdId] = useState([props.prod_id]);
  const [color, setColor] = useState([props.color]);
  // const color ="Brown"
  
  const [color_list, setList] = useState([]);

  const loadList = async () => {
    try {
      const bodyData = {prod_id, color}
      const resp = await fetch(`http://localhost:5000/getColorRemain`,{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
      }
      
      );
      const jsonData = await resp.json();

      setList(jsonData);

      console.log("Response", resp);
      console.log("List: ", color_list);
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
        <option value="Size detail">Select Color</option>
      {color_list.map((colors)=>{
        return (
          <>
            
            <option value={colors.color} placeholder="Color">{colors.color}</option>
            
            
         </>
        )
      })}
      </Form.Select>
    </>
  );
}
