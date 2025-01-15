import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const expertCategories = [
  "Medium",
  "Aura Reading",
  "Crystal Reading",
  "Pet Psychics",
  "Money Psychics",
  "Past Life",
  "Missing Person",
  "Astrologer",
  "Tarot Reader",
  "Numerologist",
  "Career Advice",
  "Runes Psychics",
  "Love Psychics",
  "Breakup Psychics",
  "Cheating Affairs",
  "Family Affairs",
  "Maritial",
  "Parents Children",
  "Empath Psychics",
  "Dream Analysis",
  "Clairvoyant",
  "Clarisentient",
];

const Psychics_add = () => {
  // State for form fields
  const [formField, setFormField] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    expertCategory: "",
    phoneNo: "",
    ratePM: "",
    crossRate: "",
    country: "",
    about: "",
    Introlin: "",
    topics: "",
    tools: "",
    abilities: "",
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
      const response = await axios.post("/api/psychics/data/addPsychicCompleteProfile", formField);
      toast.success("Profile created successfully!");
      console.log(response.data);
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
                    <span className="text-white">Psychic Registration Form</span>
                  </h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      {/* First Row */}
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            onChange={handleChange}
                            value={formField.email}
                            name="email"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Username</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                            value={formField.username}
                            name="username"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            type="password"
                            className="form-control"
                            onChange={handleChange}
                            value={formField.password}
                            name="password"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Confirm Password</label>
                          <input
                            type="password"
                            className="form-control"
                            onChange={handleChange}
                            value={formField.confirmPassword}
                            name="confirmPassword"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Gender</label>
                          <select
                            className="form-control"
                            onChange={handleChange}
                            value={formField.gender}
                            name="gender"
                            required
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Expert Category</label>
                          <select
                            className="form-control"
                            onChange={handleChange}
                            value={formField.expertCategory}
                            name="expertCategory"
                            required
                          >
                            <option value="">Select Expert Category</option>
                            {expertCategories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {/* Second Row */}
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Phone Number</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                            value={formField.phoneNo}
                            name="phoneNo"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Rate per Minute</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                            value={formField.ratePM}
                            name="ratePM"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Cross Rate</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                            value={formField.crossRate}
                            name="crossRate"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Country</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                            value={formField.country}
                            name="country"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>About</label>
                          <textarea
                            className="form-control"
                            onChange={handleChange}
                            value={formField.about}
                            name="about"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Intro Line</label>
                          <textarea
                            className="form-control"
                            onChange={handleChange}
                            value={formField.Introlin}
                            name="Introlin"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Topics</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                            value={formField.topics}
                            name="topics"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Tools</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                            value={formField.tools}
                            name="tools"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Abilities</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                            value={formField.abilities}
                            name="abilities"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-default float-right">
                        <span className="text-white">Save</span>
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

export default Psychics_add;
