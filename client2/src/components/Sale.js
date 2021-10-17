import React,{useState,useEffect} from 'react'
import Form from "react-bootstrap/Form";

export default function Sale() {

    const [list,setList] = useState([]);
    const [sale_id,setID] = useState(["S"]);

    const loadList = async () => {
        try {
          const resp = await fetch(`http://localhost:5000/getSale`);
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
      }, [sale_id]);
    return (
        <div className="container">
        <h3 >SALE REPORT</h3>
        {/* {cost.map((elt)=>{return (<p>Total Cost:{elt.total} BAHT</p>)})} */}
        <div>
      <tr className="btn mt-1">
      <td>
          {/* <Form.Control
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          onChange={(e) =>{
            setID(e.target.value)
          }}
          /> */}
          {/* {buy_list.map((item) => {
            return <p>{item.buy_id}</p>
          })} */}
        </td>
        <td>
          <a href="/insertbuy">
            <button className="btn btn-success ml-3">เพิ่มข้อมูล</button>
          </a>
        </td>
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
                {/* <td>
                  <EditBuy
                    buy_date={elt.buy_date}
                    buy_id={elt.buy_id}
                    buy_status={elt.buy_status}
                  />
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    )
}
