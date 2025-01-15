import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FAQForm = () => {
  const [formField, setFormField] = useState({
    faqs: [
      { question: "", answer: "" },
      { question: "", answer: "" },
      { question: "", answer: "" },
      { question: "", answer: "" },
      { question: "", answer: "" },
      { question: "", answer: "" },
      { question: "", answer: "" },
      { question: "", answer: "" },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/faqs");
        setFormField({ faqs: response.data.faqs });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFaqs = formField.faqs.map((faq, i) =>
      i === index ? { ...faq, [name]: value } : faq
    );
    setFormField({ faqs: updatedFaqs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/update/faqs", { faqs: formField.faqs });
      toast.success("FAQs updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Error updating FAQs");
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
                    <span className="text-white">FAQs Form</span>
                  </h3>
                </div>
                <div className="card-body">
                  {formField.faqs.map((faq, index) => (
                    <div className="form-group" key={index}>
                      <label>Question {index + 1}</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => handleChange(index, e)}
                        value={faq.question || ""}
                        name="question"
                      />
                      <label>Answer {index + 1}</label>
                      <textarea
                        className="form-control"
                        onChange={(e) => handleChange(index, e)}
                        value={faq.answer || ""}
                        name="answer"
                      />
                    </div>
                  ))}
                </div>
                <div className="card-footer">
                  <div className="input-group">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="btn btn-default float-right"
                    >
                      <span className="text-white">Save</span>
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

export default FAQForm;
