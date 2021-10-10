import React from 'react'

export default function InsertBuy() {
    return (
        <div>
            <button
                      type="button"
                      className="btn btn-success"
                      data-toggle="modal"
                      data-target="#myModal"
                    >
                      เพิ่มข้อมูล
                    </button>
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
                                />
                              </div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="id"
                                />
                              </div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="status"
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
    )
}
