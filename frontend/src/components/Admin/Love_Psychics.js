import React from "react";
import { Link } from "react-router-dom";

const Testimonials = () => {
  return (
    <div>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid"></div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          {/* Default box */}
          <div className="card">
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
                      <a>Love Page</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/love_update"
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
                      <a>Break_up Page</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/update_break_up"
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
                      <a>Cheating Affairs </a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/update_cheating_page"
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
                      <a>Clairvoyant Page</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/clariyont_update"
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
                      <a>Clarisentient  Page</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/clarisentient_update"
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
                      <a>Dream Page</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/dream_update"
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
                      <a>Empath Page</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/empath_update"
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
                      <a>Family Page</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/family_update"
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
                      <a>Martial Page</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/martial_update"
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
                    <td>11</td>
                    <td>
                      <a>Parent Page</a>
                    </td>

                    <td className="project-actions text-right">
                      <Link
                        to="/admin/pages/parent_update"
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
