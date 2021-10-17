import React, { useState } from "react";

export default function EditProduct(props) {
  const [full_prod_id, setFull] = useState(props.full_prod_id);
  const [prod_name, setName] = useState(props.prod_name);
  const [color, setColor] = useState(props.color);
  const [size, setSize] = useState(props.size);
  const [total_amount, setTotalAmount] = useState(props.total_amount);
  const [sold_amount, setSoldAmount] = useState(props.sold_amount);
  const [prod_cost, setProdCost] = useState(props.prod_cost);
  const [prod_price, setProdPrice] = useState(props.prod_price);
  const [prod_id, setProdId] = useState(props.prod_id);
  const [prod_color_id, setProdColorId] = useState(props.prod_color_id);


  const onUpdateData = (e) => {
    e.preventDefault();
    try {
      const bodyIn = { full_prod_id,prod_name,color,size,total_amount,sold_amount,prod_cost,prod_price,prod_id,prod_color_id};
      const res = fetch(
        `http://localhost:5000/updateProduct/${full_prod_id}`,
        {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyIn),
        }
      );
      window.location = "/warehouse";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target={`#full_prod_id${full_prod_id}`}
        >
          Edit
        </button>
        {/* The Modal */}
        <div className="modal fade" id={`full_prod_id${full_prod_id}`}>
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header">
                <h4 className="modal-title">Edit Product</h4>
                <button type="button" className="close" data-dismiss="modal">
                  ×
                </button>
              </div>
              {/* Modal body */}
              <div className="modal-body">
                <div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="id"
                      value={full_prod_id}
                      onChange={(e) => {
                        setFull(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="item"
                      value={prod_name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="item"
                      value={color}
                      onChange={(e) => {
                        setColor(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="item"
                      value={size}
                      onChange={(e) => {
                        setSize(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="item"
                      value={total_amount}
                      onChange={(e) => {
                        setTotalAmount(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="item"
                      value={sold_amount}
                      onChange={(e) => {
                        setSoldAmount(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="item"
                      value={prod_cost}
                      onChange={(e) => {
                        setProdCost(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="item"
                      value={prod_price}
                      onChange={(e) => {
                        setProdPrice(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="item"
                      value={prod_id}
                      onChange={(e) => {
                        setProdId(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="item"
                      value={prod_color_id}
                      onChange={(e) => {
                        setProdColorId(e.target.value);
                      }}
                    />
                  </div>
                  
                  
                </div>
              </div>
              {/* Modal footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  data-dismiss="modal"
                  onClick={(e) => {
                    onUpdateData(e);
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
