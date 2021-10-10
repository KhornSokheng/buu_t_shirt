import React from "react";

export default function InsertBuy() {
  return (
    <div>
      <div className = "container">
        <div className="form-group">
          <label htmlFor="usr">Name:</label>
          <input type="text" className="form-control" id="usr" />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password:</label>
          <input type="password" className="form-control" id="pwd" />
        </div>
      </div>
    </div>
  );
}
