import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SendEmail = () => {
  // State for form fields
  const [formField, setFormField] = useState({
    recipient: "",
    subject: "",
    body: "",
  });

  // Handle change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post("/api/mail/send-email", formField);
      toast.success("Email sent successfully!");
      console.log(response.data);
      // Clear form fields after successful submission
      setFormField({ recipient: "", subject: "", body: "" });
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : "An error occurred!";
      toast.error(errorMessage);
      console.error("Error:", error);
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content-header" data-aos="fade-up" data-aos-duration="1000">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-orange">
                <div className="card-header">
                  <h3 className="card-title">
                    <span className="text-white">Send Email</span>
                  </h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      {/* Recipient Email */}
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Recipient Email</label>
                          <input
                            type="email"
                            className="form-control"
                            onChange={handleChange}
                            value={formField.recipient}
                            name="recipient"
                            required
                          />
                        </div>
                      </div>
                      {/* Subject */}
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Subject</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                            value={formField.subject}
                            name="subject"
                            required
                          />
                        </div>
                      </div>
                      {/* Email Body */}
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Email Body</label>
                          <textarea
                            className="form-control"
                            onChange={handleChange}
                            value={formField.body}
                            name="body"
                            rows="4"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-default float-right">
                        <span className="text-white">Send Email</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SendEmail;
