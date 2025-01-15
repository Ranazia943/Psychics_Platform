import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Runeform = () => {
  const [Image, setImage] = useState(null);
  const [ImagePreview, setImagePreview] = useState(null);
  const [Video, setVideo] = useState(null);
  const [VideoPreview, setVideoPreview] = useState(null);

  const [formField, setFormField] = useState({
    MediumBanner: "",
    MediumPara: "",
    video: "",
    video_para: "",
    question: "",
    answer: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/rune");
        setFormField(response.data);
        if (response.data.MediumBanner) {
          setImagePreview(response.data.MediumBanner);
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
    let imageUrl = formField.MediumBanner;
    let videoUrl = formField.video;

    if (Image) {
      imageUrl = await uploadImage();
    }

    if (Video) {
      videoUrl = await uploadVideo();
    }

    try {
      await axios.put("/api/update/rune", {
        ...formField,
        MediumBanner: imageUrl,
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
                    <span className="text-white">Runes Form</span>
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
                      name="MediumBanner"
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
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Runes Paragraph</label>
                <textarea
                  className="form-control"
                  onChange={handleChange}
                  value={formField.MediumPara || ""}
                  name="MediumPara"
                />
              </div>

              <div className="form-group">
                <label>Video Para</label>
                <textarea
                  className="form-control"
                  onChange={handleChange}
                  value={formField.video_para || ""}
                  name="video_para"
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

export default Runeform;
