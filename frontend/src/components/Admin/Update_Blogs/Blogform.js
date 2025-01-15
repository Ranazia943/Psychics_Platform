import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddBlogPost = () => {
  const [formData, setFormData] = useState({
    Blog_Banner: "",
    title: "",
    content: "",
    title1: "",
    content1: "",
    title2: "",
    content2: "",
    title3: "",
    content3: "",
    image: "",
    category: "love", // default value
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const imageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const bannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerPreview(URL.createObjectURL(file));
      setBannerFile(file);
    }
  };

  const uploadImage = async (file) => {
    if (!file) return ""; // No file to upload
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ml_default"); // Ensure this is correct

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
    let imageUrl = formData.image;
    let bannerUrl = formData.Blog_Banner;

    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    if (bannerFile) {
      bannerUrl = await uploadImage(bannerFile);
    }

    console.log("Form Data:", {
      ...formData,
      image: imageUrl,
      Blog_Banner: bannerUrl,
    }); // Debugging line

    try {
      const response = await axios.post("/api/add-post", {
        ...formData,
        image: imageUrl,
        Blog_Banner: bannerUrl,
      });

      toast.success("Data updated successfully", response.data);
      // Reset form after submission
      setFormData({
        Blog_Banner: "",
        title: "",
        content: "",
        title1: "",
        content1: "",
        title2: "",
        content2: "",
        title3: "",
        content3: "",
        image: "",
        category: "love",
      });
      setImageFile(null);
      setImagePreview(null);
      setBannerFile(null);
      setBannerPreview(null);
    } catch (error) {
      console.error("There was an error adding the blog post!", error);
    }
  };

  return (
    <div className="content-wrapper">
      <section
        className="content-header"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h2>Add a New Blog Post</h2>
        <form onSubmit={handleSubmit}>
          {/* Banner Upload */}
          <div className="form-group">
            <label htmlFor="Blog_Banner">Blog Banner Upload</label>
            <input
              type="file"
              className="form-control"
              id="Blog_Banner"
              onChange={bannerChange}
            />
            {bannerPreview && (
              <div className="image-preview mt-2">
                <img
                  src={bannerPreview}
                  alt="Preview"
                  style={{ width: "150px", height: "150px" }}
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              className="form-control"
              id="content"
              name="content"
              rows="5"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Title1</label>
            <input
              type="text"
              className="form-control"
              id="title1"
              name="title1"
              value={formData.title1}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content1</label>
            <textarea
              className="form-control"
              id="content1"
              name="content1"
              rows="5"
              value={formData.content1}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="title2">Title2</label>
            <input
              type="text"
              className="form-control"
              id="title2"
              name="title2"
              value={formData.title2}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content2">Content2</label>
            <textarea
              className="form-control"
              id="content2"
              name="content2"
              rows="5"
              value={formData.content2}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="title3">Title3</label>
            <input
              type="text"
              className="form-control"
              id="title3"
              name="title3"
              value={formData.title3}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content3">Content3</label>
            <textarea
              className="form-control"
              id="content3"
              name="content3"
              rows="5"
              value={formData.content3}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image Upload</label>
            <input
              type="file"
              className="form-control"
              id="image"
              onChange={imageChange}
            />
            {imagePreview && (
              <div className="image-preview mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: "150px", height: "150px" }}
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              className="form-control"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {/* enum: ["love", "life", "study", "family", "astrology",
              "horoscopes", "soumate", "mind", "career", "health", "tarot"], */}
              <option value="love">Love</option>
              <option value="family">Family</option>
              <option value="study">Study</option>
              <option value="nature"> Nature</option>
              <option value="life">life</option>
              <option value="astrology">astrology</option>
              <option value="horoscopes">horoscopes</option>
              <option value="soulmate">soulmate</option>
              <option value="mind">mind, body</option>
              <option value="relationship"> realtionship </option>
              <option value="career">career</option>
              <option value="spirituality"> spirituality</option>
              <option value="health">Health</option>
              <option value="tarot">Tarot</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default AddBlogPost;
