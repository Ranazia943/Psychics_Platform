import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Helpform = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerImagePreview, setBannerImagePreview] = useState(null);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [image1, setImage1] = useState(null);
  const [image1Preview, setImage1Preview] = useState(null);

  const [formField, setFormField] = useState({
    Banner: "",
    title1: "",
    content1: "",
    title2: "",
    content2: "",
    image_title: "",
    image_para: "",
    image: "",
    image_title1: "",
    image_para1: "",
    image1: "",
    card_title1: "",
    card_content1: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/help");
        setFormField(response.data);
        if (response.data.Banner) {
          setBannerImagePreview(response.data.Banner);
        }
        if (response.data.image) {
          setImagePreview(response.data.image);
        }
        if (response.data.image1) {
          setImage1Preview(response.data.image1);
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

  const handleImageChange = (e, setter, previewSetter) => {
    const file = e.target.files[0];
    if (file) {
      previewSetter(URL.createObjectURL(file));
      setter(file);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let bannerUrl = formField.Banner;
    let imageUrl = formField.image;
    let image1Url = formField.image1;

    if (bannerImage) {
      bannerUrl = await uploadImage(bannerImage);
    }

    if (image) {
      imageUrl = await uploadImage(image);
    }

    if (image1) {
      image1Url = await uploadImage(image1);
    }

    try {
      await axios.put("/api/update/help", {
        ...formField,
        Banner: bannerUrl,
        image: imageUrl,
        image1: image1Url,
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
                    <span className="text-white">About Page Form</span>
                  </h3>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <div className="container mx-auto p-2 border">
                      <img
                        className="w-full"
                        src={bannerImagePreview}
                        alt="Banner Preview"
                        style={{ width: "150px", height: "150px" }}
                      />
                    </div>
                    <label>Upload Banner Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) =>
                        handleImageChange(
                          e,
                          setBannerImage,
                          setBannerImagePreview
                        )
                      }
                      name="Banner"
                    />
                  </div>

                  <div className="form-group">
                    <label>Banner Title</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.title1 || ""}
                      name="title1"
                    />
                  </div>

                  <div className="form-group">
                    <label>Banner Content</label>
                    <textarea
                      className="form-control"
                      onChange={handleChange}
                      value={formField.content1 || ""}
                      name="content1"
                    />
                  </div>

                  <div className="form-group">
                    <label>Title 2</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.title2 || ""}
                      name="title2"
                    />
                  </div>

                  <div className="form-group">
                    <label>Content 2</label>
                    <textarea
                      className="form-control"
                      onChange={handleChange}
                      value={formField.content2 || ""}
                      name="content2"
                    />
                  </div>

                  <div className="form-group">
                    <label>Image Title</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formField.image_title || ""}
                      name="image_title"
                    />
                  </div>
                  <div className="form-group">
                    <label>Image Description</label>
                    <textarea
                      className="form-control"
                      onChange={handleChange}
                      value={formField.image_para || ""}
                      name="image_para"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <div className="form-group">
                  <div className="container mx-auto p-2 border">
                    <img
                      className="w-full"
                      src={imagePreview}
                      alt="Image Preview"
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                  <label>Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) =>
                      handleImageChange(e, setImage, setImagePreview)
                    }
                    name="image"
                  />
                </div>

                <div className="form-group">
                  <label>Image Title 1</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={formField.image_title1 || ""}
                    name="image_title1"
                  />
                </div>
                <div className="form-group">
                  <label>Image Description 1</label>
                  <textarea
                    className="form-control"
                    onChange={handleChange}
                    value={formField.image_para1 || ""}
                    name="image_para1"
                  />
                </div>

                <div className="form-group">
                  <div className="container mx-auto p-2 border">
                    <img
                      className="w-full"
                      src={image1Preview}
                      alt="Image 1 Preview"
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                  <label>Upload Image 1</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) =>
                      handleImageChange(e, setImage1, setImage1Preview)
                    }
                    name="image1"
                  />
                </div>

                <div className="form-group">
                  <label>Card Title</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={formField.card_title1 || ""}
                    name="card_title1"
                  />
                </div>

                <div className="form-group">
                  <label>Card Content</label>
                  <textarea
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={formField.card_content1 || ""}
                    name="card_content1"
                  />
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

export default Helpform;
