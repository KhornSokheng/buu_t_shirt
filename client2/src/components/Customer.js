import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

export default function Customer() {
  const [list, setList] = useState([]);

  const deleteItem = async (id) => {
    try {
      // console.log("ID:",id)
      const del = await fetch(`http://localhost:5000/delete/${id}`, {
        method: "DELETE",
      });
      setList(
        list.filter((elt) => {
          return elt.id !== id;
        })
      );
    } catch (err) {
      console.error(err.message);
    }
  };
  const loadList = async () => {
    try {
      const resp = await fetch("http://localhost:5000/getCustomer");
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
    <div className="container mt-5">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Cust Id</th>
            <th>Cust Name</th>
            <th>Cust Lname</th>
            <th>Phone Num</th>
            <th>Cust Card</th>
            <th>Del</th>
          </tr>
        </thead>
        <tbody>
          {list.map((elt) => {
            return (
              <tr>
                <td>{elt.cust_id}</td>
                <td>{elt.cust_name}</td>
                <td>{elt.cust_lname}</td>
                <td>{elt.phone_num}</td>
                <td>{elt.credit_card}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteItem(elt.id)}
                  >
                    Del
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
