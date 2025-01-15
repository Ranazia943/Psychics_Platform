import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PricingForm = () => {
  const [formField, setFormField] = useState({
    horoscopeBanner: "",
    intro_para: "",
    basic_price: "",
    premium_price: "",
    diamond_price: "",
    list1: [],
    list2: [],
    list3: [],
    last_para: "",
  });
  const [Image, setImage] = useState(null);
  const [ImagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/pricing");
        setFormField(response.data);
        if (response.data.horoscopeBanner) {
          setImagePreview(response.data.horoscopeBanner);
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

  const handleListChange = (e) => {
    const { name, value } = e.target;
    setFormField((prevData) => ({
      ...prevData,
      [name]: value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item),
    }));
  };

  const imageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImage(file);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = formField.horoscopeBanner;

    if (Image) {
      imageUrl = await uploadImage();
    }

    try {
      await axios.put("/api/update/pricing", {
        ...formField,
        horoscopeBanner: imageUrl,
      });
      toast.success("Pricing updated successfully");
    } catch (error) {
      console.error("Error updating pricing:", error);
      toast.error("Error updating pricing");
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="card card-orange">
                <div className="card-header">
                  <h3 className="card-title">Pricing Page Form</h3>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <div className="container mx-auto p-2 border">
                      {ImagePreview && (
                        <img
                          className="w-full"
                          src={ImagePreview}
                          alt="Preview"
                          style={{ width: "150px", height: "150px" }}
                        />
                      )}
                    </div>
                    <label>Upload Horoscope Banner</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={imageChange}
                      name="horoscopeBanner"
                    />
                  </div>

                  <div className="form-group">
                    <label>Intro Paragraph</label>
                    <textarea
                      className="form-control"
                      name="intro_para"
                      value={formField.intro_para}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Basic Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="basic_price"
                      value={formField.basic_price}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Premium Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="premium_price"
                      value={formField.premium_price}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Diamond Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="diamond_price"
                      value={formField.diamond_price}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>List 1 (comma-separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="list1"
                      value={formField.list1.join(",")}
                      onChange={handleListChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>List 2 (comma-separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="list2"
                      value={formField.list2.join(",")}
                      onChange={handleListChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>List 3 (comma-separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="list3"
                      value={formField.list3.join(",")}
                      onChange={handleListChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Last Paragraph</label>
                    <textarea
                      className="form-control"
                      name="last_para"
                      value={formField.last_para}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleSubmit}
                    >
                      Save Pricing
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingForm;
