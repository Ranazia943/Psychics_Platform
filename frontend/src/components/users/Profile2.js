import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"; // For React Router v4
import axios from "axios";

const Profile2 = ({  }) => {
  const { authUser } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formFields, setFormFields] = useState({
    email: "",
    username: "",
    newPassword: "", // Update this
    confirmNewPassword: "", // Update thisadd bal
    profilePic: "",
    walletBalance:""
  });

  const [selectedProfilePic, setSelectedProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [notifications, setNotifications] = useState([]);
  
  // Fetch payment notifications when the component loads
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`/api/paypal/payment-notifications/${authUser._id}`);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching payment notifications:", error);
        toast.error("Failed to fetch payment notifications.");
      }
    };

    fetchNotifications();
  }, [authUser._id]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/auth/user/${authUser._id}`);
        console.log("Response Data:", response.data); // Debugging
        setFormFields({
          email: response.data.email,
          username: response.data.username,
          profilePic: response.data.profilePic,
          password: "", // clear password fields
          confirmPassword: "",
          walletBalance: response.data.walletBalance || "", // Assuming walletBalance is returned in user data
        });
        setProfilePicPreview(response.data.profilePic);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [authUser._id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicPreview(URL.createObjectURL(file));
      setSelectedProfilePic(file);
    }
  };

  const uploadProfilePic = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dqqejge0d/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const urlData = await response.json();
      return urlData.secure_url;
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      return "";
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let profilePicUrl = formFields.profilePic;

    if (selectedProfilePic) {
      profilePicUrl = await uploadProfilePic(selectedProfilePic);
    }

    if (
      formFields.newPassword && // Changed from formFields.password
      formFields.newPassword !== formFields.confirmNewPassword // Changed from formFields.confirmPassword
    ) {
      return toast.error("Passwords don't match");
    }

    try {
      await axios.put(`/api/auth/update/${authUser._id}`, {
        ...formFields,
        profilePic: profilePicUrl,
        newPassword: formFields.newPassword || null, // Changed from formFields.password
        confirmNewPassword: formFields.confirmNewPassword || null, // Changed from formFields.confirmPassword
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            {/* Profile Image */}
            <div className="card card-primary card-outline">
              <div className="card-body box-profile">
                <div className="text-center">
                  <img
                    className="profile-user-img img-fluid img-circle"
                    src={formFields.profilePic} // Display the preview or fetched picture
                    alt="User profile picture"
                  />
                </div>
                <h3 className="profile-username text-center"> {formFields.username}</h3>
                <ul className="list-group list-group-unbordered mb-3">
                 
                </ul>

                <Link to="/">
                  <a href="" className="btn btn-primary btn-block">
                    <b>Start Chat</b>
                  </a>
                </Link>
              </div>
            </div>
           
          </div>
          {/* /.col */}
          <div className="col-md-9">
            <div className="card">
              <div className="card-header p-2">
                <ul className="nav nav-pills">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      href="#activity"
                      data-toggle="tab"
                    >
                      Previous Chats
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#timeline" data-toggle="tab">
                      Wallet
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#settings" data-toggle="tab">
                      Following
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#notifications" data-toggle="tab">
                      Transaction History
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#settings" data-toggle="tab">
                      update profile
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#settings" data-toggle="tab">
                      Delete Account
                    </a>
                  </li>
                </ul>
              </div>
             
           
              {/* /.card-header */}
              <div className="card-body">
                <div className="tab-content">
                  <div className="active tab-pane" id="activity">
                    {/* Post */}
                    <div className="post">
                      <h4> Chat History</h4>
                      <br></br>
                      <div className="user-block">
                        <img
                          className="img-circle img-bordered-sm"
                          src=""
                          alt="user image"
                        />
                        <span className="username">
                          <a href="#">Jonathan Burke Jr.</a>
                          <a href="#" className="float-right btn-tool">
                            <i className="fas fa-times" />
                          </a>
                        </span>
                        <span className="description">
                          Shared publicly - 7:30 PM today
                        </span>
                      </div>
                      {/* /.user-block */}
                      <p>
                        Lorem ipsum represents a long-held tradition for
                       
                      </p>
                    </div>
                    {/* /.post */}
                    {/* Post */}

                    {/* /.post */}
                  </div>
                 
                  <div className="tab-pane" id="notifications">
                    <h5>Payments</h5>
                    {notifications.length > 0 ? (
                      <ul className="list-group">
                        {notifications.map((notification, index) => (
                          <li key={index} className="list-group-item">
                            <p>
                              <strong>Transaction ID:</strong> {notification.transactionId}
                            </p>
                            <p>
                              <strong>Amount:</strong> {notification.amount} {notification.currency}
                            </p>
                            <p>
                              <strong>Date:</strong> {new Date(notification.createdAt).toLocaleString()}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No payment notifications found.</p>
                    )}
                  </div>
                 
               

                  {/* /.tab-pane */}  
                  <div className="tab-pane" id="timeline">
      <div className="col-lg-3 col-6">
        <div
          className="small-box"
          style={{ backgroundColor: "hsl(290, 96.61%, 45.66%)" }}
        >
          <div className="inner">
          <small className="text-white">Your balance</small>
<h4 className="text-white">${Number(formFields.walletBalance).toFixed(2)}</h4>

            </div>
          <div className="icon text-white">
            <i className="ion ion">&#36;</i>
          </div>
          <button className="small-box-footer" style={{ background: 'transparent', border: 'none' }}>
  <Link 
    to="/checkout" 
    style={{ color: 'white', textDecoration: 'none', marginLeft:'10px' }}
  >
    Add Fund
    <i className="fas fa-arrow-circle-right" style={{ color: 'white', marginLeft: '8px' }} />
  </Link>
</button>

        </div>
      </div>
    </div>

                  {/* /.tab-pane */}
                  <div className="tab-pane" id="settings">
                    <form className="form-horizontal">
                      <div className="form-group row">
                        <label
                          htmlFor="inputName"
                          className="col-sm-2 col-form-label"
                        >
                          Username
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleInputChange}
                            value={formFields.username}
                            name="username"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputEmail"
                          className="col-sm-2 col-form-label"
                        >
                          Email
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="email"
                            className="form-control"
                            onChange={handleInputChange}
                            value={formFields.email}
                            name="email"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="form-group row">
                          <label
                            htmlFor="password"
                            className="col-sm-2 col-form-label"
                          >
                            Password
                          </label>
                          <div className="col-sm-10">
                            <div className="input-group">
                              <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                onChange={handleInputChange}
                                value={formFields.newPassword}
                                name="newPassword" // Ensure this matches the backend
                              />
                              <div className="input-group-append">
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group row">
                          <label
                            htmlFor="confirmPassword"
                            className="col-sm-4 col-form-label"
                          >
                            Confirm Password
                          </label>
                          <div className="col-sm-10">
                            <div className="input-group">
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="form-control"
                                onChange={handleInputChange}
                                value={formFields.confirmNewPassword}
                                name="confirmNewPassword" // Ensure this matches the backend
                              />
                              <div className="input-group-append">
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary"
                                  onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                  }
                                >
                                  {showConfirmPassword ? (
                                    <FaEyeSlash />
                                  ) : (
                                    <FaEye />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="d-block mb-2">Profile Photo</label>

                        <div className=" align-items-center">
                          {profilePicPreview && (
                            <img
                              src={profilePicPreview}
                              alt="Profile Preview"
                              className="border rounded"
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                marginRight: "10px",
                              }}
                            />
                          )}
                          <br></br>
                          <div>
                            <input
                              type="file"
                              className="form-control-file"
                              onChange={handleProfilePicChange}
                              name="profilePic"
                              style={{ width: "100px" }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-group row">
                        <button
                          type="submit"
                          onClick={handleFormSubmit}
                          className="btn btn-danger"
                        >
                          update
                        </button>
                      </div>
                    </form>
                  </div>
                  {/* /.tab-pane */}
                </div>
                {/* /.tab-content */}
              </div>
              {/* /.card-body */}
            </div>
            {/* /.nav-tabs-custom */}
          </div>
          {/* /.col */}
        </div>
        {/* /.row */}
      </div>
      {/* /.container-fluid */}
    </section>
  );
};

export default Profile2;
