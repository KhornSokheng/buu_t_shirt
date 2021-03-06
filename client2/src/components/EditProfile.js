import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/userSlice";

export default function EditProfile(props) {
  // const cust_id = props.cust_id;
  const [cust_id, setCust_id] = useState(props.cust_id);
  const [cust_name, setCust_Name] = useState(props.cust_name);
  const [cust_lname, setCust_Lname] = useState(props.cust_lname);
  const [phone_num, setPhone_Num] = useState(props.phone_num);
  const [credit_card, setCredit_Card] = useState(props.credit_card);
  const [email, setemail] = useState(props.email);
  const [profile_img, setprofile_img] = useState(props.profile_img);

  
  let currentUser= useSelector((state) => state.user.currentUser);
  let role = currentUser.role;
  const dispatch = useDispatch();

  const onUpdateData = async (e) => {
    e.preventDefault();
    try {
      const bodyData = { cust_id,cust_name,cust_lname,phone_num,credit_card,email,profile_img,role};
     
      const res = await fetch(
        `http://localhost:5000/updateProfile/${cust_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData)
        }
      );

      let newUser =  { cust_id,cust_name,cust_lname,phone_num,credit_card,email,profile_img,role};
      dispatch(update(newUser))

      window.location = "/profile";
      console.log(res);
    } catch (err) {
      console.error(err.message);
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
          data-target={`#cust_id${cust_id}`} //"#myModal"
        >
          Edit
        </button>
        {/* The Modal */}
        <div className="modal" id={`cust_id${cust_id}`}>
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header">
                <h4 className="modal-title">Edit Profile</h4>
                <button type="button" className="close" data-dismiss="modal">
                  ??
                </button>
              </div>
              {/* Modal body */}
              <div className="modal-body">
                <div>
                  <div class="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="usr"
                      value={cust_name}
                      onChange={(e) => {
                        setCust_Name(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <div class="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="usr"
                        value={cust_lname}
                        onChange={(e) => {
                          setCust_Lname(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="pwd"
                        value={phone_num}
                        onChange={(e) => {
                          setPhone_Num(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="pwd"
                        value={credit_card}
                        onChange={(e) => {
                          setCredit_Card(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="pwd"
                        value={email}
                        onChange={(e) => {
                          setemail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="pwd"
                        value={profile_img}
                        onChange={(e) => {
                          setprofile_img(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* Modal footer */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-warning"
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
    </div>
  );
}