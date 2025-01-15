import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PsyForm = () => {
  const [welcomeImage, setWelcomeImage] = useState(null);
  const [image, setImage] = useState(null);

  const [bannerImage, setBannerImage] = useState(null);
  const [bannerImagePreview, setBannerImagePreview] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [formField, setFormField] = useState({
    welcomeImage: "",
    expertPsychics: "",
    NewCustomerOffer: "",
    basic: "",
    premium: "",
    advance: "",
    basic_list: [],
    premium_list: [],
    advance_list: [],
    titlewhytalk: "",
    experiences: [],
    discountText: "",
    paragraphText: "",
    question: "",
    answer: "",
    endtitle: "",
    enddescription: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/PsyPage");
        setFormField(response.data);
        if (response.data.welcomeImage) {
          setWelcomeImage(response.data.welcomeImage);
        }
        if (response.data.bannerImage) {
          setBannerImagePreview(response.data.bannerImage);
        }
        if (response.data.videoUrl) {
          setVideoUrl(response.data.videoUrl);
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

 


 
  
  const handleImageChange = (e, setImage, setImagePreview) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
    setImage(file);
  };

  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
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
    }
  };

  const imageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setWelcomeImage(file); // Update this line to set the welcomeImage
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    let welcomeImageUrl = formField.welcomeImage; // Preserve existing welcomeImage URL
    let bannerImageUrl = formField.bannerImage; // Preserve existing bannerImage URL
  
    // Handle welcome image upload
    if (welcomeImage) {
      welcomeImageUrl = await uploadImage(welcomeImage);
    }
  
    // Handle banner image upload
    if (bannerImage) {
      bannerImageUrl = await uploadImage(bannerImage);
    }
  
    const updatedData = {
      ...formField,
      welcomeImage: welcomeImageUrl,
      bannerImage: bannerImageUrl,
      videoUrl: videoUrl,
    };
  
    try {
      await axios.put("/api/update/PsyPage", {
        id: formField._id, // Ensure you're passing the ID
        ...updatedData,
      });
      toast.success("Data updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Error updating data");
    }
  };
  
  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormField((prevData) => ({
      ...prevData,
      [name]: value.split(",").map((item) => item.trim()), // Split and trim values
    }));
  };
  
  return (
    <div className="content-wrapper">
      <section className="content-header" data-aos="fade-up" data-aos-duration="1000">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="card card-orange">
                <div className="card-header">
                  <h3 className="card-title">
                    <span className="text-white">Psychics Page</span>
                  </h3>
                </div>
                <div className="card-body">
                  {/* Form Fields */}
                  <div className="form-group">
                    <div className="container mx-auto p-2 border">
                      <img
                        className="w-full"
                        src={imagePreview}
                        alt=""
                        style={{ width: "50px", height: "50px" }}
                      />
                    </div>
                    <label>Welcome Image URL</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={imageChange}
                      name="welcomeImage"
                    />
                  </div>
                  <div className="form-group">
                    <label>Expert Psychics</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.expertPsychics || ""}
                      name="expertPsychics"
                    />
                  </div>
                  <div className="form-group">
                    <label>Customer Offer</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.NewCustomerOffer || ""}
                      name="NewCustomerOffer"
                    />
                  </div>
                  <div className="form-group">
                    <label>Basic Rate</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.basic || ""}
                      name="basic"
                    />
                  </div>
                  <div className="form-group">
                    <label>Premium Rate</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.premium || ""}
                      name="premium"
                    />
                  </div>
                  <div className="form-group">
                    <label>Advance Rate</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.advance || ""}
                      name="advance"
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

                  {/* New fields for lists */}
                  <div className="form-group">
                    <label>Basic List (comma separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleArrayChange}
                      value={formField.basic_list.join(", ") || ""}
                      name="basic_list"
                    />
                  </div>
                  <div className="form-group">
                    <label>Premium List (comma separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleArrayChange}
                      value={formField.premium_list.join(", ") || ""}
                      name="premium_list"
                    />
                  </div>
                  <div className="form-group">
                    <label>Advance List (comma separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleArrayChange}
                      value={formField.advance_list.join(", ") || ""}
                      name="advance_list"
                    />
                  </div>
                 
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card card-orange">
                <div className="card-header">
                  <h3 className="card-title">
                    <span className="text-white">Complete Profile</span>
                  </h3>
                </div>
                <div className="card-body">
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
                    <textarea
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
                    <textarea
                      className="form-control"
                      onChange={handleChange}
                      value={formField.answer || ""}
                      name="answer"
                    />
                  </div>
                  <div className="form-group">
                    <label>End Description</label>
                    <textarea
                      className="form-control"
                      onChange={handleChange}
                      value={formField.enddescription || ""}
                      name="enddescription"
                    />
                  </div>
                  <div className="form-group">
                    <div className="container mx-auto p-2 border">
                      <img
                        className="w-full"
                        src={bannerImagePreview}
                        alt="Banner"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </div>
                    <label>Banner Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => handleImageChange(e, setBannerImage, setBannerImagePreview)}
                      name="bannerImage"
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
                    <label>Video URL</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setVideoUrl(e.target.value)}
                      value={videoUrl}
                      name="videoUrl"
                    />
                  </div>
                </div>
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

export default PsyForm;
