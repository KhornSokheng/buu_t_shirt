import React, { useState, useEffect } from "react";
import EditProfile from "./EditProfile";
import Form from "react-bootstrap/Form";

export default function Profile() {
  const [list, setList] = useState([]);
  const [cust_id, setID] = useState([]);
  const [cust_name, setName] = useState([""]);
  const [cust_list, setCustlist] = useState([]);
  let email="ananda@gmail.com"
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
        `http://localhost:5000/getCustomerByEmail/${email}`
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
  }, []);
  return (
    <div className="container">
      <h3>Your Profile</h3>
      {/* <tr className="btn mt-5">
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
      </tr> */}
      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th>Cust Id</th>
            <th>Cust Name</th>
            <th>Cust Lname</th>
            <th>Phone Num</th>
            <th>Credit Card</th>
            <th>Email</th>
            <th>Profile image</th>
            <th>Edit</th>
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
                <td>{elt.email}</td>
                <td><img className="  mx-auto d-block"  style={{width: "40px", height:"40px" }} src={elt.profile_img}/></td>
                <td>
                  <EditProfile
                    cust_id={elt.cust_id}
                    cust_name={elt.cust_name}
                    cust_lname={elt.cust_lname}
                    phone_num={elt.phone_num}
                    credit_card={elt.credit_card}
                    email={elt.email}
                    profile_img={elt.profile_img}
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
