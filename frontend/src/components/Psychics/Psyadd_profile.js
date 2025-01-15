import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { PsyAuthContext } from "../../context/PsyAuthContext";
import axios from "axios";

const categories = [
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

const Psyadd_profile = () => {
  const { authPsychics } = useContext(PsyAuthContext);
  const [formField, setFormField] = useState({
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
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    const checkProfile = async () => {
      if (authPsychics) {
        try {
          const response = await axios.get(
            `/api/psychics/data/${authPsychics}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authPsychics}`,
              },
            }
          );
          if (response.data) {
            setProfileExists(true);
          }
        } catch (error) {
          console.error("Error checking profile:", error);
        }
      }
    };

    checkProfile();
  }, [authPsychics]);

  const handleChange = (e) => {
    setFormField({
      ...formField,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authPsychics) {
      toast.error("Please log in to add data");
      return;
    }

    if (profileExists) {
      toast.error("Profile already exists. You cannot add it again.");
      return;
    }

    try {
      const response = await axios.post(
        "/api/psychics/data/add",
        {
          ...formField,
          Psychics: authPsychics,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authPsychics}`,
          },
        }
      );
      toast.success("Data added successfully");
      setProfileExists(true);
    } catch (error) {
      console.error(
        "Error response from server:",
        error.response?.data || error.message
      );
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="content-wrapper">
      <section
        className="content-header"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-orange">
                <div className="card-header">
                  <h3 className="card-title">
                    <span className="text-white">Complete Profile</span>
                  </h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        {/* Column 1 */}
                        <div className="form-group">
                          <label htmlFor="expertCategory">
                            Expert Category
                          </label>
                          <select
                            className="form-control"
                            id="expertCategory"
                            name="expertCategory"
                            value={formField.expertCategory}
                            onChange={handleChange}
                          >
                            <option value="">Select Category</option>
                            {categories.map((category, index) => (
                              <option key={index} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Phone No</label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="far fa fa-phone" />
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              onChange={handleChange}
                              value={formField.phoneNo}
                              name="phoneNo"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Rate P/M</label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="far fa fa-dollar" />
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              onChange={handleChange}
                              value={formField.ratePM}
                              name="ratePM"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Cross Rate</label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="far fa fa-dollar" />
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              onChange={handleChange}
                              value={formField.crossRate}
                              name="crossRate"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Country</label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="far fa-edit" />
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              onChange={handleChange}
                              value={formField.country}
                              name="country"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        {/* Column 2 */}
                        <div className="form-group">
                          <label>Abilities</label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="far fa-edit" />
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              onChange={handleChange}
                              value={formField.abilities}
                              name="abilities"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Tools</label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="far fa-edit" />
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              onChange={handleChange}
                              value={formField.tools}
                              name="tools"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Topics</label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="far fa-edit" />
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              onChange={handleChange}
                              value={formField.topics}
                              name="topics"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Intro Line</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                            value={formField.Introlin}
                            name="Introlin"
                          />
                        </div>
                        <div className="form-group">
                          <label>About</label>
                          <textarea
                            className="form-control"
                            onChange={handleChange}
                            value={formField.about}
                            name="about"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-default float-right"
                      >
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

export default Psyadd_profile;
