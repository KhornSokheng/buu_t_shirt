import React,{useState} from 'react'

export default function EditSale(props) {

    const [sale_id,setSaleID] = useState(props.sale_id);
    const [sale_status,setSalestatus] = useState(props.sale_status);
    const [delivery_price,setDeprice] = useState(props.delivery_price);
    const [delivery_begin_date,setBedate] = useState(props.delivery_begin_date);
    const [delivery_receive_date,setRedate] = useState(props.delivery_receive_date);
    const [delivery_status,setDestatus] = useState(props.delivery_status);

    const onUpdateData = (e)=>{
        e.preventDefault();
        try{      
            const bodyIn = {sale_id,sale_status,delivery_price,delivery_begin_date,delivery_receive_date,delivery_status}  
          const res = fetch(`http://localhost:5000/updateSale/${sale_id}`,{
            method:"put",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(bodyIn)
          })
          window.location="/sale";
        }catch (err){
            console.error(err.message);
        }
    }

    return (
        <div>
            <div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target={`#sale_id${sale_id}`}
                    >
                      Edit
                    </button>
                    {/* The Modal */}
                    <div className="modal fade" id={`sale_id${sale_id}`}>
                      <div className="modal-dialog">
                        <div className="modal-content">
                          {/* Modal Header */}
                          <div className="modal-header">
                            <h4 className="modal-title">Edit Sale Report</h4>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                            >
                              ×
                            </button>
                          </div>
                          {/* Modal body */}
                          <div className="modal-body">
                            <div>
                            <div className="form-group">
                                <input
                                  type="name"
                                  className="form-control"
                                  id="id"
                                  value = {sale_id}
                                  onChange={e=>{setSaleID(e.target.value)}}
                                />
                              </div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="status"
                                  value = {sale_status}
                                  onChange={e=>{setSalestatus(e.target.value)}}
                                />
                              </div>
                              
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="price"
                                  value = {delivery_price}
                                  onChange={e=>{setDeprice(e.target.value)}}
                                />
                              </div>
                              <div className="form-group">
                                <input
                                  type="date"
                                  className="form-control"
                                  id="date"
                                  value = {delivery_begin_date}
                                  onChange={e=>{setBedate(e.target.value)}}
                                />
                              </div>
                              <div className="form-group">
                                <input
                                  type="date"
                                  className="form-control"
                                  id="date"
                                  value = {delivery_receive_date}
                                  onChange={e=>{setRedate(e.target.value)}}
                                />
                              </div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="status"
                                  value = {delivery_status}
                                  onChange={e=>{setDestatus(e.target.value)}}
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
    )
}
