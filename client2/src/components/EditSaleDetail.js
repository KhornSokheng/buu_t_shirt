import React,{useState} from 'react'

export default function EditSaledetail(props) {

    const [sale_id,setSaleID] = useState();
    const [item,setItem] = useState();
    const [full_prod_id,setFull] = useState();
    const [sale_amount,setAmount] = useState();
    const [sale_cost,setCost] = useState();
    const [sale_price,setPrice] = useState();
    

    const onUpdateData = (e)=>{
        e.preventDefault();
        try{      
            const bodyIn = {sale_id,item,full_prod_id,sale_amount,sale_cost,sale_price}  
          const res = fetch(`http://localhost:5000/updateSale/${sale_id}`,{
            method:"put",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(bodyIn)
          })
          window.location="/saledetail";
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
                            <h4 className="modal-title">Edit Sale Detail</h4>
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
                                  id="saleid"
                                  value = {sale_id}
                                  onChange={e=>{setSaleID(e.target.value)}}
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
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="fullid"
                                  value = {full_prod_id}
                                  onChange={e=>{setFull(e.target.value)}}
                                />
                              </div>
                              <div className="form-group">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="amount"
                                  value = {sale_amount}
                                  onChange={e=>{setAmount(e.target.value)}}
                                />
                              </div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="cost"
                                  value = {sale_cost}
                                  onChange={e=>{setCost(e.target.value)}}
                                />
                              </div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="price"
                                  value = {sale_price}
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
    )
}
