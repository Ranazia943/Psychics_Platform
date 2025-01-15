import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Multipages = ({ categorySlug }) => {
  
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
              <table className="table table-striped projects">
                <thead>
                  <tr>
                    <th style={{ width: "2%" }} className="text-center">
                      SL
                    </th>
                    <th style={{ width: "40%" }} className="text-center">
                      Category Names
                    </th>

                    <th style={{ width: "15%" }} className="text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="project-state">
                      <p>1</p>
                    </td>
                    <td className="project-state">
                      <p>About Page</p>
                    </td>

                    <td className="project-state">
                      <NavLink to="/admin/pages/about_update">
                        <i className="fas fa-pencil-alt text-purple"></i>
                      </NavLink>
                    </td>
                  </tr>

                  <tr>
                    <td className="project-state">
                      <p>2</p>
                    </td>
                    <td className="project-state">
                      <p>How Work Page</p>
                    </td>

                    <td className="project-state">
                      <NavLink to="/admin/pages/how_work_update">
                        <i className="fas fa-pencil-alt text-purple"></i>
                      </NavLink>
                    </td>
                  </tr>

                  <tr>
                    <td className="project-state">
                      <p>3</p>
                    </td>
                    <td className="project-state">
                      <p>Help Page</p>
                    </td>

                    <td className="project-state">
                      <NavLink to="/admin/pages/how_help_update">
                        <i className="fas fa-pencil-alt text-purple"></i>
                      </NavLink>
                    </td>
                  </tr>

                  <tr>
                    <td className="project-state">
                      <p>3</p>
                    </td>
                    <td className="project-state">
                      <p>Pricing Page</p>
                    </td>

                    <td className="project-state">
                      <NavLink to="/admin/pages/pricing_update">
                        <i className="fas fa-pencil-alt text-purple"></i>
                      </NavLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Multipages;
