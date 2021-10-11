import React, { useState, useEffect } from "react";

export default function Size() {

  const [list, setList] = useState([]);
  const loadList = async () => {
    try {
      const resp = await fetch(`http://localhost:5000/getSizeChart`);
      const jsonData = await resp.json();

      setList(jsonData);

      console.log("Resp", resp);
      console.log("List:", list);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    console.log("Enter useEffect()");
    loadList();
  }, []);
  return (
    <div className="size">
      <h1>Size Chart</h1>
      <div href="size" className="shirt">
        <img src="images/shirt.png" alt />

        <table className="table table-striped container mt-5">
          <thead>
            <tr>
              <th>Size</th>
              <th>Body Length cm</th>
              <th>Shoulder Length cm</th>
              <th>Chest Length cm</th>
              <th>Sleeve Length cm</th>
              <th>Body Length Inch</th>
              <th>Shoulder Length Inch</th>
              <th>Chest Length Inch</th>
              <th>Sleeve Length Inch</th>
            </tr>
          </thead>
          <tbody>
            {list.map((elt) => {
              return (
                <tr>
                  <td>{elt.size}</td>
                  <td>{elt.body_length_cm}</td>
                  <td>{elt.shoulder_length_cm}</td>
                  <td>{elt.chest_length_cm}</td>
                  <td>{elt.sleeve_length_cm}</td>
                  <td>{elt.body_length_inch}</td>
                  <td>{elt.shoulder_length_inch}</td>
                  <td>{elt.chest_length_inch}</td>
                  <td>{elt.sleeve_length_inch}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
