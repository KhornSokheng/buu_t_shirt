import React,{useState,useEffect} from 'react'
import Form from "react-bootstrap/Form";
import EditSale from './EditSale';

export default function Sale() {

    const [list,setList] = useState([]);
    const [sale_id,setID] = useState(["S"]);
    const [cost,setCost] = useState([]);
    const [price,setPrice] = useState([]);
    const [sale_list,setSalelist] = useState([]);
    const [revenue,setRevenue] = useState([]);

    const loadList = async () => {
        try {
          const resp = await fetch(`http://localhost:5000/getSale/${sale_id}`);
          const jsonData = await resp.json();
    
          setList(jsonData);
    
          console.log("Resp", resp);
          console.log("List:", list);
        } catch (err) {
          console.error(err.message);
        }
      };
      const loadCost = async () => {
        try {
          const resp = await fetch(`http://localhost:5000/getSalecost/${sale_id}`);
          const jsonData = await resp.json();
    
          setCost(jsonData);
    
          console.log("Resp", resp);
          console.log("List:", cost);
        } catch (err) {
          console.error(err.message);
        }
      };
      const loadPrice = async () => {
        try {
          const resp = await fetch(`http://localhost:5000/getSaleprice/${sale_id}`);
          const jsonData = await resp.json();
    
          setPrice(jsonData);
    
          console.log("Resp", resp);
          console.log("List:", cost);
        } catch (err) {
          console.error(err.message);
        }
      };
      const loadRevenue = async () => {
        try {
          const resp = await fetch(`http://localhost:5000/getSalerevenue/${sale_id}`);
          const jsonData = await resp.json();
    
          setRevenue(jsonData);
    
          console.log("Resp", resp);
          console.log("List:", cost);
        } catch (err) {
          console.error(err.message);
        }
      };

      useEffect(() => {
        console.log("Enter useEffect()");
        loadList();
        loadCost();
        loadPrice();
        loadRevenue();
      }, [sale_id]);
    return (
        <div>
        <h3 >SALE REPORT</h3>
        {cost.map((elt)=>{return (<p>Sale Cost:{elt.cost} BAHT</p>)})}
        {price.map((elt)=>{return (<p>Sale Price:{elt.price} BAHT</p>)})}
        {revenue.map((elt)=>{return (<p>Revenue:{elt.revenue} BAHT</p>)})}
        <div>
      <tr className="btn mt-1">
      <td>
          <Form.Control
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          onChange={(e) =>{
            setID(e.target.value)
          }}
          />
          {sale_list.map((item) => {
            return <p>{item.sale_id}</p>
          })}
        </td>
        {/* <td>
          <a href="/insertbuy">
            <button className="btn btn-success ml-3">เพิ่มข้อมูล</button>
          </a>
        </td> */}
      </tr>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sale id</th>
            <th>Sale date</th>
            <th>Customer id</th>
            <th>Receiver name</th>
            <th>Receiver phone</th>
            <th>Sale status</th>
            <th>Delivery id</th>
            <th>Delivery price</th>
            <th>Delivery begin date</th>
            <th>Delivery receive date</th>
            <th>Address</th>
            <th>Delivery status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {list.map((elt) => {
            return (
              <tr>
                <td>{elt.sale_id}</td>
                <td>{elt.sale_date}</td>
                <td>{elt.cust_id}</td>
                <td>{elt.receiver_name}</td>
                <td>{elt.receiver_phone}</td>
                <td>{elt.sale_status}</td>
                <td>{elt.delivery_id}</td>
                <td>{elt.delivery_price}</td>
                <td>{elt.delivery_begin_date}</td>
                <td>{elt.delivery_receive_date}</td>
                <td>{elt.address}</td>
                <td>{elt.delivery_status}</td>
                <td>
                  <EditSale
                    sale_id={elt.sale_id}
                    sale_status={elt.sale_status}
                    delivery_price={elt.delivery_price}
                    delivery_begin_date={elt.delivery_begin_date}
                    delivery_receive_date={elt.delivery_receive_date}
                    delivery_status={elt.delivery_status}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    )
}
