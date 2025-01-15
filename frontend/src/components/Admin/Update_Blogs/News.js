import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const categoryToPageMap = {
  love: "love_blog",
  nature: "nature_blog",
  study:'study_blog',
  tarot: "tarot_blog",
  life: "blog_list",
  spirituality:'spirituality_blog',
  astrology: "astrology_blog",
  career: "career_blog",
  horoscopes: "horoscope_blog",
  mind: "mind_blog",
  relationship: "realtionship_blog",
  soulmate:'soulmate_blog',
};

const Testimonials = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Blogs</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Blogs</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <span className="text-white">Categories</span>
              </h3>
            </div>
            <div className="card-body p-0">
              <table className="table table-striped projects">
                <thead>
                  <tr>
                    <th style={{ width: "2%" }} className="text-center">
                      SL
                    </th>
                    <th style={{ width: "10%" }} className="text-center">
                      Category Name
                    </th>
                    <th style={{ width: "15%" }} className="text-center">
                      Blogs
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length > 0 ? (
                    categories.map((category, index) => (
                      <tr className="text-center" key={index}>
                        <td>{index + 1}</td>
                        <td>{category}</td>
                        <td className="project-actions text-right">
                          <NavLink
                            to={`/admin/pages/${categoryToPageMap[category]}`}
                          >
                            <button className="btn btn-secondary btn-sm ml-2">
                              <i className="fas fa-list text-white m-2"></i> All
                              Blogs
                            </button>
                          </NavLink>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="text-center">
                      <td colSpan="3">No categories found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Testimonials;
