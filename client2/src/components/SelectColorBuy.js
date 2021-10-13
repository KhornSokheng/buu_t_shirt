import React, { useState,useEffect } from "react";
import Form from "react-bootstrap/Form";

export default function SelectColorBuy() {
  const [color_list, setList] = useState([]);
  const loadList = async () => {
    try {
      const resp = await fetch(`http://localhost:5000/getColor`);
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
    <div>
      <Form.Select aria-label="Default select" className="form-control">
        <option value="Color detail">Select Product Color</option>
        {color_list.map((colors) => {
          return (
            <>
              <option value={colors.color} placeholder="Name">
                {colors.color}
              </option>
            </>
          );
        })}
      </Form.Select>
    </div>
  );
}
