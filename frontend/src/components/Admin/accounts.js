// components/SocialMediaForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SocialMediaForm = () => {
  const [formField, setFormField] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    youtube: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/social/get");
        setFormField(response.data);
      } catch (error) {
        console.error("Error fetching social media data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormField((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formField);

    try {
      await axios.put("/api/social/update", formField);
      toast.success("Social media accounts updated successfully");
    } catch (error) {
      console.error("Error updating social media accounts:", error);
      toast.error("Error updating social media accounts");
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
                    <span className="text-white">Social Media Accounts</span>
                  </h3>
                </div>
                <div className="card-body">
                  {/* Form Fields for Social Media URLs */}
                  <div className="form-group">
                    <label>Facebook URL</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.facebook || ""}
                      name="facebook"
                    />
                  </div>
                  <div className="form-group">
                    <label>Instagram URL</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.instagram || ""}
                      name="instagram"
                    />
                  </div>
                  <div className="form-group">
                    <label>Twitter URL</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.twitter || ""}
                      name="twitter"
                    />
                  </div>
                  <div className="form-group">
                    <label>LinkedIn URL</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.linkedin || ""}
                      name="linkedin"
                    />
                  </div>
                  <div className="form-group">
                    <label>YouTube URL</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.youtube || ""}
                      name="youtube"
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-default float-right"
                  >
                    <span className="text-white">Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SocialMediaForm;
