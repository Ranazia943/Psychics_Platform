import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PsyForm = () => {
  const [Image, setImage] = useState(null);
  const [ImagePreview, setImagePreview] = useState(null);

  const [formField, setFormField] = useState({
    MediumBanner:"",
    MediumPara:"",
    title1:"",
    Para1:"",
    title2:"",
    Para2:"",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getmediumpage");
        setFormField(response.data);
        if (response.data.MediumBanner) {
          setImagePreview(response.data.MediumBanner);
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

  const imageChange = (e) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
    setImage(file);
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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = formField.MediumBanner;
    if (Image) {
      imageUrl = await uploadImage();
    }
    try {
      await axios.put("/api/update/medium", {
        ...formField,
        MediumBanner: imageUrl,
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
                    <span className="text-white">Aura Psychics</span>
                  </h3>
                </div>
                <div className="card-body">
                  {/* Form Fields */}
                  <div className="form-group">
                    <div className="container mx-auto p-2 border">
                      <img
                        className="w-full"
                        src={ImagePreview}
                        alt=""
                        style={{ width: "50px", height: "50px" }}
                      />
                    </div>
                    <label>Welcome Image URL</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={imageChange}
                      name="MediumBanner"
                    />
                  </div>

                  <div className="form-group">
                    <label>Title 1</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.title1 || ""}
                      name="title1"
                    />
                  </div>

                  <div className="form-group">
                    <label>Para 1</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.Para1 || ""}
                      name="Para1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card card-orange">
                <div className="card-body">
                  <div className="form-group">
                    <label>Intro Paragraph</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.MediumPara || ""}
                      name="MediumPara"
                    />
                  </div>
                  <div className="form-group">
                    <label>Title 2</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.title2 || ""}
                      name="title1"
                    />
                  </div>

                  <div className="form-group">
                    <label>Para 2</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.Para2 || ""}
                      name="Para2"
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
