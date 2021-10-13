import React, { useState,useEffect } from "react";
import Form from "react-bootstrap/Form";

export default function SelectSizeBuy() {
  const [size_list, setList] = useState([]);
  const loadList = async () => {
    try {
      const resp = await fetch(`http://localhost:5000/getSize`);
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
    <div>
      <Form.Select aria-label="Default select" className="form-control">
        <option value="Size detail">Select Size</option>
        {size_list.map((sizes) => {
          return (
            <>
              <option value={sizes.size} placeholder="Name">
                {sizes.size}
              </option>
            </>
          );
        })}
      </Form.Select>
    </div>
  );
}
