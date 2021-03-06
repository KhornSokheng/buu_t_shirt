import React, { useState } from "react";
import Cart from "./Cart";
// the idea is
// get props
// insert to table sale + sale_detail
// then go to page /cart

export default function CheckOut(props) {
  console.log(props.prod_id);
  const prod_id = props.prod_id;
  const color = props.color;
  const size = props.size;
  const sale_amount = props.sale_amount;
  const prod_price = props.prod_price;
  const [cust_id, setCustId] = useState([]);
  const sale_id = props.sale_id;
  const email = props.email;
  const [receiverName, setReceiverName] = useState([]);
  const [receiverPhone, setReceiverPhone] = useState([]);
  const [address, setAddress] = useState([]);
  const [credit_card, setCreditCard] = useState([]);
  // const [prod_id,color, size, sale_amount,prod_price] = props;

  const doCheckOut = async (e) => {
    e.preventDefault();
    try {
      const bodyData = { sale_id,receiverName,receiverPhone,address };
      const res = await fetch(`http://localhost:5000/checkOut/${sale_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      //   window.location = `/cart/${sale_id}`;
      window.location = `/history`;
      

      console.log(res);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <div>
        {/* Button to Open the Modal */}
        <button
          type="button"
          className="btn btn-danger m-3"
          data-toggle="modal"
          data-target={`#cust_id`} //"#myModal"
        >
          <i className="ti-shopping-cart-full" /> CHECK OUT 
        </button>
        {/* The Modal */}
        <div className="modal " id={`cust_id`}>
          <div className="modal-dialog">
            <div className="modal-content ">
              {/* Modal Header */}
              <div className="modal-header">
                <h4 className="modal-title">Just a little more...{sale_id}</h4>
                
                <button type="button" className="close" data-dismiss="modal">
                  ??
                </button>
              </div>
              {/* Modal body */}
              <div className="modal-body">
                <div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="sale"
                      placeholder="Receiver Name"
                      //   value={price}
                      onChange={(e) => {
                        setReceiverName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="cust"
                      placeholder="Receiver Phone Number"
                      //   value="C0000"
                      onChange={(e) => {
                        setReceiverPhone(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      type="text"
                      className="form-control"
                      id="cust"
                      placeholder="Address"
                      //   value="C0000"
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="cust"
                      placeholder="Credit Card"
                      //   value="C0000"
                      onChange={(e) => {
                        setCreditCard(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Modal footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={(e) => {
                    doCheckOut(e);
                  }}
                >
                  CONFIRM ORDER 
                  {/* <i className="ti-credit-card" />  */}
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
