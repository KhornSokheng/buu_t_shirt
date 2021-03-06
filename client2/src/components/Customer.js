import React, { useState, useEffect } from "react";
import EditCustomer from "./EditCustomer";
import Form from "react-bootstrap/Form";

export default function Customer() {
  const [list, setList] = useState([]);
  const [cust_id, setID] = useState([]);
  const [cust_name, setName] = useState([""]);
  const [cust_list, setCustlist] = useState([]);

  const deleteItem = async (cust_id) => {
    try {
      const del = await fetch(
        `http://localhost:5000/deleteCustomer/${cust_id}`,
        {
          method: "DELETE",
        }
      );
      setList(
        list.filter((elt) => {
          return elt.cust_id !== cust_id;
        })
      );
    } catch (err) {
      console.error(err.message);
    }
  };
  const loadList = async () => {
    try {
      const resp = await fetch(
        `http://localhost:5000/getCustomer/${cust_name}`
      );
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
  }, [cust_name]);
  return (
    <div className="container">
      <h3>CUSTOMER</h3>
      <tr className="btn mt-5">
        <td>
          <Form.Control
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {cust_list.map((item) => {
            return <p>{item.cust_id}</p>;
          })}
        </td>
        <td>
          <a href="/signup">
            <button className="btn btn-success ml-5 ">เพิ่มข้อมูล</button>
          </a>
        </td>
      </tr>
      <table className="table table-striped mt-5">
        <thead>
          <tr>
          <th>Profile</th>
            <th>Cust Id</th>
            <th>Cust Name</th>
            <th>Cust Lname</th>
            <th>Phone Num</th>
            <th>Email</th>
            <th>Role</th>
            <th>Edit</th>
            <th>Del</th>
          </tr>
        </thead>
        <tbody>
          {list.map((elt) => {
            return (
              <tr>
                <td><img className="  mx-auto d-block  rounded-circle"  style={{width: "50px", height:"50px" }} src={elt.profile_img}/></td>
                <td>{elt.cust_id}</td>
                <td>{elt.cust_name}</td>
                <td>{elt.cust_lname}</td>
                <td>{elt.phone_num}</td>
                <td>{elt.email}</td>
                <td>{elt.role}</td>
                
                <td>
                  <EditCustomer
                    cust_id={elt.cust_id}
                    cust_name={elt.cust_name}
                    cust_lname={elt.cust_lname}
                    phone_num={elt.phone_num}
                    credit_card={elt.credit_card}
                    email={elt.email}
                    role={elt.role}
                    profile_img ={elt.profile_img}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteItem(elt.cust_id)}
                  >
                    Del
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
