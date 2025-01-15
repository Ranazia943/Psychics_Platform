import React from "react";
import { Link } from "react-router-dom";

const horoscopes_pages = () => {
  return (
    <div>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Testimonials</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Pages </li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          {/* Default box */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <span className="text-white">Horoscopes</span>
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
                      Page Name
                    </th>

                    <th style={{ width: "15%" }} className="text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td>1</td>
                    <td>
                      <a>Horoscope</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/update_horoscope"
                        className="btn btn-info btn-sm"
                        href="#"
                      >
                        <i className="fas fa-pencil-alt"></i>
                        Edit
                      </Link>
                    </td>
                  </tr>

                  <tr className="text-center">
                    <td>2</td>
                    <td>
                      <a>Capricorn Page</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/capricorn"
                        className="btn btn-info btn-sm"
                        href="#"
                      >
                        <i className="fas fa-pencil-alt"></i>
                        Edit
                      </Link>
                    </td>
                  </tr>
                  <tr className="text-center">
                    <td>3</td>
                    <td>
                      <a>Saturn Horoscope</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/saturn_update"
                        className="btn btn-info btn-sm"
                        href="#"
                      >
                        <i className="fas fa-pencil-alt"></i>
                        Edit
                      </Link>
                    </td>
                  </tr>
                  <tr className="text-center">
                    <td>4</td>
                    <td>
                      <a>Practical Horocopes</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/update_practical"
                        className="btn btn-info btn-sm"
                        href="#"
                      >
                        <i className="fas fa-pencil-alt"></i>
                        Edit
                      </Link>
                    </td>
                  </tr>

                  <tr className="text-center">
                    <td>5</td>
                    <td>
                      <a>Ambition Focus</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/ambition_update"
                        className="btn btn-info btn-sm"
                        href="#"
                      >
                        <i className="fas fa-pencil-alt"></i>
                        Edit
                      </Link>
                    </td>
                  </tr>

                  <tr className="text-center">
                    <td>6</td>
                    <td>
                      <a> Earth Sign</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/earthsign_update"
                        className="btn btn-info btn-sm"
                        href="#"
                      >
                        <i className="fas fa-pencil-alt"></i>
                        Edit
                      </Link>
                    </td>
                  </tr>
                  <tr className="text-center">
                    <td>7</td>
                    <td>
                      <a> Life Discipline</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/life_dis_update"
                        className="btn btn-info btn-sm"
                        href="#"
                      >
                        <i className="fas fa-pencil-alt"></i>
                        Edit
                      </Link>
                    </td>
                  </tr>

                  <tr className="text-center">
                    <td>8</td>
                    <td>
                      <a> Relationship Harmony</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/relation_ship_update"
                        className="btn btn-info btn-sm"
                        href="#"
                      >
                        <i className="fas fa-pencil-alt"></i>
                        Edit
                      </Link>
                    </td>
                  </tr>

                  <tr className="text-center">
                    <td>9</td>
                    <td>
                      <a> Financial Mastery</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/financial_update"
                        className="btn btn-info btn-sm"
                        href="#"
                      >
                        <i className="fas fa-pencil-alt"></i>
                        Edit
                      </Link>
                    </td>
                  </tr>

                  <tr className="text-center">
                    <td>10</td>
                    <td>
                      <a> Astro Blueprint</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/astro_update"
                        className="btn btn-info btn-sm"
                        href="#"
                      >
                        <i className="fas fa-pencil-alt"></i>
                        Edit
                      </Link>
                    </td>
                  </tr>

                  <tr className="text-center">
                    <td>11</td>
                    <td>
                      <a> Goal Analysis</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/anaylsis_update"
                        className="btn btn-info btn-sm"
                        href="#"
                      >
                        <i className="fas fa-pencil-alt"></i>
                        Edit
                      </Link>
                    </td>
                  </tr>

                  {/* Add more testimonials as needed */}
                </tbody>
              </table>
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </section>
        {/* /.content */}
      </div>
    </div>
  );
};

export default horoscopes_pages;
