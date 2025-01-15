import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Disciplineform = () => {
  const [Image, setImage] = useState(null);
  const [ImagePreview, setImagePreview] = useState(null);
  const [Video, setVideo] = useState(null);
  const [VideoPreview, setVideoPreview] = useState(null);

  const [formField, setFormField] = useState({
    horoscopeBanner: "",
    daily_date: "",
    daily_para: "",
    weekly_date: "",
    weekly_heading: "",
    weekly_para: "",
    monthly_date: "",
    monthly_para: "",
    y_heading: "",
    year: "",
    generalOverview: "",
    whatToLookForwardTo: [],
    whatToWatchOutFor: [],
    lovePredictions: "",
    importantDates: "",
    video: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/get/discipline");
        setFormField(response.data);
        if (response.data.horoscopeBanner) {
          setImagePreview(response.data.horoscopeBanner);
        }
        if (response.data.video) {
          setVideoPreview(response.data.video);
        }
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

  const imageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoPreview(URL.createObjectURL(file));
      setVideo(file);
    }
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", Image);
    data.append("upload_preset", "ml_default");
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dqqejge0d/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const urlData = await response.json();
      return urlData.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return "";
    }
  };

  const uploadVideo = async () => {
    const data = new FormData();
    data.append("file", Video);
    data.append("upload_preset", "ml_default"); // or use a specific preset for videos
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dqqejge0d/video/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const urlData = await response.json();
      return urlData.secure_url;
    } catch (error) {
      console.error("Error uploading video:", error);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = formField.horoscopeBanner;
    let videoUrl = formField.video;

    if (Image) {
      imageUrl = await uploadImage();
    }

    if (Video) {
      videoUrl = await uploadVideo();
    }

    try {
      await axios.put("/api/update/discipline", {
        ...formField,
        horoscopeBanner: imageUrl,
        video: videoUrl,
      });
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
                    <span className="text-white">Horoscope Form</span>
                  </h3>
                </div>
                <div className="card-body">
                  {/* Form Fields */}
                  <div className="form-group">
                    <div className="container mx-auto p-2 border">
                      <img
                        className="w-full"
                        src={ImagePreview}
                        alt="Preview"
                        style={{ width: "150px", height: "150px" }}
                      />
                    </div>
                    <label>Upload Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={imageChange}
                      name="horoscopeBanner"
                    />
                  </div>
                  <div className="form-group">
                    {VideoPreview && (
                      <div className="container mx-auto p-2 border">
                        <video width="150" height="150" controls>
                          <source src={VideoPreview} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                    <label>Upload Video</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleVideoChange}
                      name="video"
                    />
                  </div>
                  {/* Other form fields */}
                  <div className="form-group">
                    <label>Daily Date</label>
                    <input
                      type="date"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.daily_date || ""}
                      name="daily_date"
                    />
                  </div>
                  <div className="form-group">
                    <label>Daily Paragraph</label>
                    <textarea
                      className="form-control"
                      onChange={handleChange}
                      value={formField.daily_para || ""}
                      name="daily_para"
                    />
                  </div>
                  <div className="form-group">
                    <label>Weekly Date</label>
                    <input
                      type="date"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.weekly_date || ""}
                      name="weekly_date"
                    />
                  </div>
                  <div className="form-group">
                    <label>Weekly Heading</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.weekly_heading || ""}
                      name="weekly_heading"
                    />
                  </div>
                  <div className="form-group">
                    <label>Weekly Paragraph</label>
                    <textarea
                      className="form-control"
                      onChange={handleChange}
                      value={formField.weekly_para || ""}
                      name="weekly_para"
                    />
                  </div>
                  <div className="form-group">
                    <label>Monthly Date</label>
                    <input
                      type="month"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.monthly_date || ""}
                      name="monthly_date"
                    />
                  </div>
                  <div className="form-group">
                    <label>Monthly Paragraph</label>
                    <textarea
                      className="form-control"
                      onChange={handleChange}
                      value={formField.monthly_para || ""}
                      name="monthly_para"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Year Heading</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  value={formField.y_heading || ""}
                  name="y_heading"
                />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={handleChange}
                  value={formField.year || ""}
                  name="year"
                />
              </div>
              <div className="form-group">
                <label>General Overview</label>
                <textarea
                  className="form-control"
                  onChange={handleChange}
                  value={formField.generalOverview || ""}
                  name="generalOverview"
                />
              </div>
              <div className="form-group">
                <label>What To Look Forward To (comma-separated)</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleArrayChange}
                  value={formField.whatToLookForwardTo.join(",") || ""}
                  name="whatToLookForwardTo"
                />
              </div>
              <div className="form-group">
                <label>What To Watch Out For (comma-separated)</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleArrayChange}
                  value={formField.whatToWatchOutFor.join(",") || ""}
                  name="whatToWatchOutFor"
                />
              </div>
              <div className="form-group">
                <label>Love Predictions</label>
                <textarea
                  className="form-control"
                  onChange={handleChange}
                  value={formField.lovePredictions || ""}
                  name="lovePredictions"
                />
              </div>
              <div className="form-group">
                <label>Important Dates</label>
                <textarea
                  className="form-control"
                  onChange={handleChange}
                  value={formField.importantDates || ""}
                  name="importantDates"
                />
              </div>
              <div className="form-group">
                <label>Heading (H2)</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  value={formField.h2 || ""}
                  name="h2"
                />
              </div>
              <div className="form-group">
                <label>Paragraph</label>
                <textarea
                  className="form-control"
                  onChange={handleChange}
                  value={formField.paragraph || ""}
                  name="paragraph"
                />
              </div>
              <div className="form-group">
                <label>Video URL</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  value={formField.video || ""}
                  name="video"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn btn-default float-right"
                  id="daterange-btn"
                >
                  <span className="text-white">Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Disciplineform;
