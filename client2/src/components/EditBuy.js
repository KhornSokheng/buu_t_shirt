import React,{useState} from 'react'

export default function EditBuy(props) {

    const buy_id = props.buy_id;
    const [buy_date,setDate]=useState(props.buy_date);
    const [buy_status,setStatus]=useState(props.buy_status);

    const onUpdateData = (e)=>{
        e.preventDefault();
        try{      
            console.log(buy_date,buy_status);    
          const res = fetch(`http://localhost:5000/`)
        }catch (err){
            console.error(err.message);
        }
    }
    return (
        <div>
            <div>
                    <button
                      type="button"
                      className="btn btn-warning"
                      data-toggle="modal"
                      data-target="#myModal"
                    >
                      แก้ไข
                    </button>
                    {/* The Modal */}
                    <div className="modal" id="myModal">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          {/* Modal Header */}
                          <div className="modal-header">
                            <h4 className="modal-title">Edit Buy Report</h4>
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
                                  type="date"
                                  className="form-control"
                                  id="date"
                                  value = {buy_date}
                                  onChange={e=>{setDate(e.target.value)}}
                                />
                              </div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="status"
                                  value = {buy_status}
                                  onChange={e=>{setStatus(e.target.value)}}
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
