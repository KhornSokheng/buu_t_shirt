import React, { useState, useEffect } from "react";
import EditCustomer from "./EditCustomer";
import Form from "react-bootstrap/Form";

export default function Message() {
  const [message, setMessage] = useState();
  const [message_list, setMessageList] = useState([]);

  const markRead = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`http://localhost:5000/markAllAsRead`,{
        method:"put",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify()
      });
      const jsonData = await resp.json();
    } catch (err) {
      console.error(err.message);
    }
    window.location = `/message`;
  };

  const loadList = async () => {
    try {
      const resp = await fetch(`http://localhost:5000/getMessage/${message}`);
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
      <h3>Messages</h3>
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
        <td>
          <button
          type="button"
            className="btn btn-success ml-5 "
            onClick={(e) => {
              markRead(e);
            }}
          >
            Mark All As Read
          </button>
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

            {/* <th>Reply</th> */}
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
                <td className="text-danger">{elt.status}</td>
                <td>
                  {/* <EditCustomer
                    cust_id={elt.cust_id}
                    cust_name={elt.cust_name}
                    cust_lname={elt.cust_lname}
                    phone_num={elt.phone_num}
                    credit_card={elt.credit_card}
                  /> */}
                  {/* <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>{elt.status}</option>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                  </select> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
