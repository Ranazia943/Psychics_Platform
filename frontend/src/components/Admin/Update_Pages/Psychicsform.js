import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Psychicsform = () => {
  const [formField, setFormField] = useState({
    welcomeImage: "",
    expert: "",
    NewCustomerOffer: "",
    basic: "",
    premium: "",
    advance: "",
    basic_list: [],
    premium_list: [],
    advance_list: [],
    titlewhytalk: "",
    experiences: [],
    bannerImage: "",
    discountText: "",
    paragraphText: "",
    question: "",
    answer: "",
    endtitle: "",
    enddescription: "",
    videoUrl: "",
  });

  const [welcomeImage, setWelcomeImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [welcomeImagePreview, setWelcomeImagePreview] = useState("");
  const [bannerImagePreview, setBannerImagePreview] = useState("");
  const [videoPreview, setVideoPreview] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/PsyPage");
        setFormField(response.data);
        setWelcomeImagePreview(response.data.welcomeImage);
        setBannerImagePreview(response.data.bannerImage);
        setVideoPreview(response.data.videoUrl);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormField((prevData) => ({
      ...prevData,
      [name]: value.split(","),
    }));
  };

  const handleFileChange = (e, setter, previewSetter) => {
    const file = e.target.files[0];
    if (file) {
      previewSetter(URL.createObjectURL(file));
      setter(file);
    }
  };

  const uploadFile = async (file, url, preset) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", preset);
    try {
      const response = await fetch(url, {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error("Error uploading file:", error);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFields = { ...formField };

      if (welcomeImage) {
        updatedFields.welcomeImage = await uploadFile(
          welcomeImage,
          "https://api.cloudinary.com/v1_1/dqqejge0d/image/upload",
          "ml_default"
        );
      }

      if (bannerImage) {
        updatedFields.bannerImage = await uploadFile(
          bannerImage,
          "https://api.cloudinary.com/v1_1/dqqejge0d/image/upload",
          "ml_default"
        );
      }

      if (videoFile) {
        updatedFields.videoUrl = await uploadFile(
          videoFile,
          "https://api.cloudinary.com/v1_1/dqqejge0d/video/upload",
          "ml_default"
        );
      }

      await axios.put("/api/update/PsyPage", updatedFields);
      toast.success("Data updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Error updating data");
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
            <div className="col-md-6">
              <div className="card card-orange">
                <div className="card-header">
                  <h3 className="card-title">
                    <span className="text-white">PsyPage Form</span>
                  </h3>
                </div>
                <div className="card-body">
                  {/* Welcome Image */}
                  <div className="form-group">
                    <label>Welcome Image</label>
                    {welcomeImagePreview && (
                      <img
                        src={welcomeImagePreview}
                        alt="Welcome Preview"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileChange(
                          e,
                          setWelcomeImage,
                          setWelcomeImagePreview
                        )
                      }
                    />
                  </div>

                  {/* Banner Image */}
                  <div className="form-group">
                    <label>Banner Image</label>
                    {bannerImagePreview && (
                      <img
                        src={bannerImagePreview}
                        alt="Banner Preview"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileChange(
                          e,
                          setBannerImage,
                          setBannerImagePreview
                        )
                      }
                    />
                  </div>

                  {/* Video Upload */}
                  <div className="form-group">
                    <label>Upload Video</label>
                    {videoPreview && (
                      <video width="150" height="150" controls>
                        <source src={videoPreview} type="video/mp4" />
                      </video>
                    )}
                    <input
                      type="file"
                      className="form-control"
                      accept="video/*"
                      onChange={(e) =>
                        handleFileChange(e, setVideoFile, setVideoPreview)
                      }
                    />
                  </div>

                  {/* Other form fields */}
                  <div className="form-group">
                    <label>Expert</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.expert || ""}
                      name="expert"
                    />
                  </div>

                  <div className="form-group">
                    <label>New Customer Offer</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.NewCustomerOffer || ""}
                      name="NewCustomerOffer"
                    />
                  </div>

                  <div className="form-group">
                    <label>Basic Price</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.basic || ""}
                      name="basic"
                    />
                  </div>

                  <div className="form-group">
                    <label>Premium Price</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.premium || ""}
                      name="premium"
                    />
                  </div>

                  <div className="form-group">
                    <label>Advance Price</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.advance || ""}
                      name="advance"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <div className="form-group">
                  <label>Basic List (comma separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleArrayChange}
                    value={formField.basic_list.join(",") || ""}
                    name="basic_list"
                  />
                </div>

                <div className="form-group">
                  <label>Premium List (comma separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleArrayChange}
                    value={formField.premium_list.join(",") || ""}
                    name="premium_list"
                  />
                </div>

                <div className="form-group">
                  <label>Advance List (comma separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleArrayChange}
                    value={formField.advance_list.join(",") || ""}
                    name="advance_list"
                  />
                </div>

                <div className="form-group">
                  <label>Title Why Talk</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={formField.titlewhytalk || ""}
                    name="titlewhytalk"
                  />
                </div>

                <div className="form-group">
                  <label>Discount Text</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={formField.discountText || ""}
                    name="discountText"
                  />
                </div>

                <div className="form-group">
                  <label>Paragraph Text</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={formField.paragraphText || ""}
                    name="paragraphText"
                  />
                </div>

                <div className="form-group">
                  <label>Question</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={formField.question || ""}
                    name="question"
                  />
                </div>

                <div className="form-group">
                  <label>Answer</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={formField.answer || ""}
                    name="answer"
                  />
                </div>

                <div className="form-group">
                  <label>End Title</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={formField.endtitle || ""}
                    name="endtitle"
                  />
                </div>

                <div className="form-group">
                  <label>End Description</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={formField.enddescription || ""}
                    name="enddescription"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Psychicsform;
