import React from "react";
import { Link } from "react-router-dom";

const Testimonials = () => {
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
                  <li className="breadcrumb-item active">Testimonials</li>
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
                <span className="text-white">Testimonials</span>
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
                      <a>Psychic</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/updatePsy"
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
                      <a>Aura Page</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/updateAura"
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
                      <a>Crystal Reading</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/update_crystal"
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
                      <a>Pet Page</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/petpage"
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
                      <a>Medium Page</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/medium_update"
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
                      <a>Money Page</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/money_update"
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
                      <a>Past Life Page</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/past_life_update"
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
                      <a>Missing Person Page</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/person_update"
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
                      <a>Astrology Page</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/astrology_update"
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
                      <a>Numerology Page</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/numerology_update"
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
                      <a>Career Advice Page</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/career_update"
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
                      <a>Runes Page</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/rune_update"
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

export default Testimonials;
