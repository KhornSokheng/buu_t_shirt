import React, { useState, useEffect } from "react";
import EditCustomer from "./EditCustomer";
import Form from "react-bootstrap/Form";

export default function Message() {
  
  const [message, setMessage] = useState();
  const [message_list, setMessageList] = useState([]);

  const loadList = async () => {
    try {
      const resp = await fetch(
        `http://localhost:5000/getMessage/${message}`
      );
      const jsonData = await resp.json();

      setMessageList(jsonData);

      console.log("Resp", resp);
      console.log("List:", message_list);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    console.log("Enter useEffect()");
    loadList();
  }, [message]);
  return (
    <div className="container">
      <h3>Message: {message}</h3>
      <tr className="btn mt-5">
        <td>
          <Form.Control
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          
        </td>
      </tr>
      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th>Message</th>
            <th>date</th>
            <th>customer Id</th>
            <th>Message Id</th>
            <th>status</th>

            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {message_list.map((elt) => {
            return (
              <tr>
                <td>{elt.message}</td>
                <td>{elt.date}</td>
                <td>{elt.cust_id}</td>
                <td>{elt.message_id}</td>
                <td>{elt.status}</td>
                <td>
                  <EditCustomer
                    cust_id={elt.cust_id}
                    cust_name={elt.cust_name}
                    cust_lname={elt.cust_lname}
                    phone_num={elt.phone_num}
                    credit_card={elt.credit_card}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
