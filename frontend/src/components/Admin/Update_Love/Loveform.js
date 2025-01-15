import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const LoveForm = () => {
  const [Image, setImage] = useState(null);
  const [ImagePreview, setImagePreview] = useState(null);
  const [Video, setVideo] = useState(null);
  const [VideoPreview, setVideoPreview] = useState(null);
  const [FallInLoveImage, setFallInLoveImage] = useState(null);
  const [FallInLoveImagePreview, setFallInLoveImagePreview] = useState(null);
  const [RelationshipsImage, setRelationshipsImage] = useState(null);
  const [RelationshipsImagePreview, setRelationshipsImagePreview] =
    useState(null);

  const [formField, setFormField] = useState({
    Love_Banner: "",
    fallInLoveIntro: "",
    fallInLoveImage: "",
    fallInLoveParagraph: "",
    fallInLoveList: [],
    relationshipsIntro: "",
    relationshipsList: [],
    relationshipsImage: "",
    videoUrl: "",
    videoDescription: "",
    loveGuideIntro: "",
    loveGuideParagraph: "",
    loveGuideList: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/Love_Page");
        setFormField(response.data);
        if (response.data.Love_Banner) {
          setImagePreview(response.data.Love_Banner);
        }
        if (response.data.fallInLoveImage) {
          setFallInLoveImagePreview(response.data.fallInLoveImage);
        }
        if (response.data.relationshipsImage) {
          setRelationshipsImagePreview(response.data.relationshipsImage);
        }
        if (response.data.videoUrl) {
          setVideoPreview(response.data.videoUrl);
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

  const handleFallInLoveImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFallInLoveImagePreview(URL.createObjectURL(file));
      setFallInLoveImage(file);
    }
  };

  const handleRelationshipsImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRelationshipsImagePreview(URL.createObjectURL(file));
      setRelationshipsImage(file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoPreview(URL.createObjectURL(file));
      setVideo(file);
    }
  };

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
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
    data.append("upload_preset", "ml_default");
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
    let imageUrl = formField.Love_Banner;
    let fallInLoveImageUrl = formField.fallInLoveImage;
    let relationshipsImageUrl = formField.relationshipsImage;
    let videoUrl = formField.videoUrl;

    if (Image) {
      imageUrl = await uploadImage(Image);
    }

    if (FallInLoveImage) {
      fallInLoveImageUrl = await uploadImage(FallInLoveImage);
    }

    if (RelationshipsImage) {
      relationshipsImageUrl = await uploadImage(RelationshipsImage);
    }

    if (Video) {
      videoUrl = await uploadVideo();
    }

    try {
      await axios.put("/api/update/Love_Page", {
        ...formField,
        Love_Banner: imageUrl,
        fallInLoveImage: fallInLoveImageUrl,
        relationshipsImage: relationshipsImageUrl,
        videoUrl: videoUrl,
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
                    <span className="text-white">Love Page Form</span>
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
                    <label>Upload Banner Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={imageChange}
                      name="Love_Banner"
                    />
                  </div>
                  <div className="form-group">
                    <label>Fall In Love Intro</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.fallInLoveIntro || ""}
                      name="fallInLoveIntro"
                    />
                  </div>
                  <div className="form-group">
                    {FallInLoveImagePreview && (
                      <div className="container mx-auto p-2 border">
                        <img
                          src={FallInLoveImagePreview}
                          alt="Fall In Love Preview"
                          style={{ width: "150px", height: "150px" }}
                        />
                      </div>
                    )}
                    <label>Upload Fall In Love Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFallInLoveImageChange}
                      name="fallInLoveImage"
                    />
                  </div>
                  <div className="form-group">
                    <label>Fall In Love Paragraph</label>
                    <textarea
                      className="form-control"
                      onChange={handleChange}
                      value={formField.fallInLoveParagraph || ""}
                      name="fallInLoveParagraph"
                    />
                  </div>
                  <div className="form-group">
                    <label>Fall In Love List (comma-separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleArrayChange}
                      value={formField.fallInLoveList.join(",") || ""}
                      name="fallInLoveList"
                    />
                  </div>
                  <div className="form-group">
                    <label>Relationships Intro</label>
                    <textarea
                      className="form-control"
                      onChange={handleChange}
                      value={formField.relationshipsIntro || ""}
                      name="relationshipsIntro"
                    />
                  </div>
                  <div className="form-group">
                    <label>Relationships List (comma-separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleArrayChange}
                      value={formField.relationshipsList.join(",") || ""}
                      name="relationshipsList"
                    />
                  </div>
                  <div className="form-group">
                    {RelationshipsImagePreview && (
                      <div className="container mx-auto p-2 border">
                        <img
                          src={RelationshipsImagePreview}
                          alt="Relationships Preview"
                          style={{ width: "150px", height: "150px" }}
                        />
                      </div>
                    )}
                    <label>Upload Relationships Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleRelationshipsImageChange}
                      name="relationshipsImage"
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
                      name="videoUrl"
                    />
                  </div>
                  <div className="form-group">
                    <label>Video Description</label>
                    <textarea
                      className="form-control"
                      onChange={handleChange}
                      value={formField.videoDescription || ""}
                      name="videoDescription"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Love Guide Intro</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  value={formField.loveGuideIntro || ""}
                  name="loveGuideIntro"
                />
              </div>
              <div className="form-group">
                <label>Love Guide Paragraph</label>
                <textarea
                  className="form-control"
                  onChange={handleChange}
                  value={formField.loveGuideParagraph || ""}
                  name="loveGuideParagraph"
                />
              </div>
              <div className="form-group">
                <label>Love Guide List (comma-separated)</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleArrayChange}
                  value={formField.loveGuideList.join(",") || ""}
                  name="loveGuideList"
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

export default LoveForm;
