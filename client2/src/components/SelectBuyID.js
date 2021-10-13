import React, { useState,useEffect } from "react";
import Form from "react-bootstrap/Form";

export default function SelectColorBuy() {
  const [buy_id_list, setList] = useState([]);
  const loadList = async () => {
    try {
      const resp = await fetch(`http://localhost:5000/getBuyID`);
      const jsonData = await resp.json();

      setList(jsonData);

      console.log("Response", resp);
      console.log("List: ", buy_id_list);
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
        <option value="name detail">Select Product ID</option>
        {buy_id_list.map((ids) => {
          return (
            <>
              <option value={ids.buy_id} placeholder="Name">
                {ids.buy_id}
              </option>
            </>
          );
        })}
      </Form.Select>
    </div>
  );
}
