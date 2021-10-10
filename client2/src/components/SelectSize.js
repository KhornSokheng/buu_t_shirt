import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

export default function SelectSize() {
  const [size_list, setList] = useState([]);

  const loadList = async () => {
    try {
      const resp = await fetch(`http://localhost:5000/getSizeChart`);
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
    loadList();
  }, []);

  return (
    <>
      <Form.Select aria-label="Default select">
        
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
        <option value="XXL">XXL</option>
        
      </Form.Select>
    </>
  );
}
