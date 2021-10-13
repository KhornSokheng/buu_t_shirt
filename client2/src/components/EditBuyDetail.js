import React,{useState} from 'react'

export default function EditBuyDetail(props) {

    const [buy_id,setId]=useState(props.buy_id);
    const [item,setItem]=useState(props.item);
    const [full_prod_id,setFull]=useState(props.full_prod_id);
    const [prod_name,setName]=useState(props.prod_name);
    const [color,setColor]=useState(props.color);
    const [size,setSize]=useState(props.size);
    const [buy_amount,setAmount]=useState(props.buy_amount);
    const [buy_cost,setCost]=useState(props.buy_cost);

    const onUpdateData = (e)=>{
        e.preventDefault();
        try{      
            const bodyIn = {buy_id,item,buy_amount,buy_cost}  
          const res = fetch(`http://localhost:5000/updateBuyDetail/${full_prod_id}`,{
            method:"put",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(bodyIn)
          })
          window.location="/buydetail";
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
                      data-target={`#full_prod_id${full_prod_id}`}
                    >
                      แก้ไข
                    </button>
                    {/* The Modal */}
                    <div className="modal fade" id={`full_prod_id${full_prod_id}`}>
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
                                  type="text"
                                  className="form-control"
                                  id="id"
                                  value = {buy_id}
                                  onChange={e=>{setId(e.target.value)}}
                                />
                              </div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="item"
                                  value = {item}
                                  onChange={e=>{setItem(e.target.value)}}
                                />
                              </div>
                              {/* <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="fullid"
                                  value = {full_prod_id}
                                  onChange={e=>{setFull(e.target.value)}}
                                />
                              </div> */}
                              {/* <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="name"
                                  value = {prod_name}
                                  onChange={e=>{setName(e.target.value)}}
                                />
                              </div> */}
                              {/* <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="color"
                                  value = {color}
                                  onChange={e=>{setColor(e.target.value)}}
                                />
                              </div> */}
                              {/* <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="size"
                                  value = {size}
                                  onChange={e=>{setSize(e.target.value)}}
                                />
                              </div> */}
                              <div className="form-group">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="amount"
                                  value = {buy_amount}
                                  onChange={e=>{setAmount(e.target.value)}}
                                />
                              </div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="cost"
                                  value = {buy_cost}
                                  onChange={e=>{setCost(e.target.value)}}
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
