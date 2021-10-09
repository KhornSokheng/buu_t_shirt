import React, { useState } from "react";

export default function EditComp(props) {
  const id = props.id;
  const [name, setName] = useState(props.name);
  const [price, setPrice] = useState(props.price);

  const onUpdateData = async (e)=>{
    e.preventDefault();
    try {
        const bodyData = {name, price}
        const res = await fetch(`http://localhost:4000/update/${id}`,{
          method:"PUT",
          headers:{"Content-Type": "application/json"},
          body: JSON.stringify(bodyData)
        })
        window.location = "/"
        console.log(res)
    } catch (err) {
        console.error(err.message)
    }
  }

  return (
    <div>
      <div>
        {/* Button to Open the Modal */}
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target= {`#id${id}`} //"#myModal"
        >
          Edit
        </button>
        {/* The Modal */}
        <div className="modal " id={`id${id}`}>
          <div className="modal-dialog">
            <div className="modal-content bg-primary">
              {/* Modal Header */}
              <div className="modal-header">
                <h4 className="modal-title">Edit Fruit</h4>
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
                      id="usr"
                      value={name}
                      onChange={e=>{setName(e.target.value)}}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      id="pwd"
                      value={price}
                      onChange={e=>{setPrice(e.target.value)}}
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
                  onClick={e=>{onUpdateData(e)}}
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
