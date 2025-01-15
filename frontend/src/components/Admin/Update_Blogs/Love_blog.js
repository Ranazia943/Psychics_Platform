import React, { useEffect, useState } from "react";
import axios from "axios";
import getstart from "../../Images/getstart.jpg";
import { toast } from "react-toastify";
const Love_blog = ({ categorySlug }) => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(""); // State for notification message

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`/api/posts/love`);
        console.log("Blogs fetched:", response.data);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [categorySlug]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/blog/posts/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
      toast.success("Your blog has been deleted"); // Set notification message
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Blogs in {categorySlug}</h1>
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
        {/* Main content */}
        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <span className="text-white">Blog List</span>
              </h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                  title="Collapse"
                >
                  <i className="fas fa-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="remove"
                  title="Remove"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body p-0">
              {message && <div className="alert alert-success">{message}</div>}
              <table className="table table-striped projects">
                <thead>
                  <tr>
                    <th style={{ width: "2%" }} className="text-center">
                      SL
                    </th>
                    <th style={{ width: "10%" }} className="text-center">
                      Category Names
                    </th>
                    <th style={{ width: "5%" }} className="text-center">
                      Image
                    </th>
                    <th style={{ width: "15%" }} className="text-center">
                      Titles
                    </th>
                    <th style={{ width: "5%" }} className="text-center">
                      Status
                    </th>
                    <th style={{ width: "15%" }} className="text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.length > 0 ? (
                    blogs.map((blog, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <a>{blog.category}</a>
                        </td>
                        <td className="project-image">
                          <img
                            src={getstart}
                            alt="Blog Image"
                            style={{ maxWidth: "50px", maxHeight: "50px" }}
                          />
                        </td>
                        <td className="project-state">
                          <p>{blog.title}</p>
                        </td>
                        <td className="project-state">
                          <span
                            className={`badge ${
                              blog.status === "Active"
                                ? "badge-success"
                                : "badge-warning"
                            }`}
                          >
                            {blog.status}
                          </span>
                        </td>
                        <td className="project-actions text-right">
                          <button
                            className="btn btn-info btn-sm"
                            onClick={() => handleDelete(blog._id)}
                          >
                            <i className="fas fa-trash-alt text-white"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No blogs found</td>
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

export default Love_blog;
