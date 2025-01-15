import React, { useEffect, useState } from 'react'

import {Link} from 'react-router-dom';

import skrill from '../Admin/payment/skrill.png';
import bank from '../Admin/payment/bank.jpg';
import squre from '../Admin/payment/squre.png';
import payoneer from '../Admin/payment/payoneer.png';
import stripe from '../Admin/payment/stripe.png';
import axios from 'axios'

const Psy_History = () => {
 const [users, setUsers] = useState([]);

 useEffect(() => {
   const fetchUsers = async () => {
     try {
       const response = await axios.get("/api/messages/users"); // No userId required here
       setUsers(response.data);
       console.log(response.data);
     } catch (error) {
       console.error("Error fetching users who have chatted:", error);
     }
   };

   fetchUsers();
 }, []);
  return (
    <div>
      <div className="content-wrapper">
        <div className="card-footer clearfix">
          <a
            href="javascript:void(0)"
            className="btn btn-sm btn-info float-left"
          >
            {" "}
            <Link to="/psychics/pages/chatlive">
              <span className="text-white">Go Live</span>{" "}
            </Link>{" "}
          </a>
        </div>
        {/* Content Header */}
        <div className="content-header">
          <div className="container-fluid"></div>
          <div className="row" data-aos="zoom-in-down">
            {/* /.col */}

            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <span className="text-white">Latest Clients</span>
                  </h3>
                  <div className="card-tools">
                    <span className="badge badge-danger">
                      {users.length} New Members
                    </span>
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="remove"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
                <div className="card-body p-0">
                  <ul className="users-list clearfix">
                    {users.map((user) => (
                      <li key={user._id}>
                        <img
                          src={user.profilePic || "default-avatar.png"}
                          alt="User Image"
                        />
                        <a className="users-list-name" href="#">
                          {user.name}
                        </a>
                        <span className="users-list-date">{user.username}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer text-center">
                  <a href="#">View All Clients</a>
                </div>
              </div>
            </div>
            {/* /.col */}
          </div>

          <div className="row" data-aos="fade-up" data-aos-duration="500">
            {/* Content Header (Page header) */}

            <div className="col-md-6">
              <div className="card">
                <div className="card-header border-transparent">
                  <h3 className="card-title">
                    <span className="text-white">Banned Users</span>
                  </h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="remove"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
                {/* /.card-header */}
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table m-0">
                      <thead>
                        <tr>
                          <th>Profile ID</th>
                          <th>Name</th>
                          <th>Status</th>
                          <th>Reason</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <a href="">OR9842</a>
                          </td>
                          <td>Arolnad</td>
                          <td>
                            <span className="badge badge-warning">Warn</span>
                          </td>
                          <td>
                            <div
                              className="sparkbar"
                              data-color="#00a65a"
                              data-height={20}
                            >
                              Imcomplete
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="">OR1848</a>
                          </td>
                          <td>Samual</td>
                          <td>
                            <span className="badge badge-danger">Rejected</span>
                          </td>
                          <td>
                            <div
                              className="sparkbar"
                              data-color="#f39c12"
                              data-height={20}
                            >
                              Misbehave
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="">OR7429</a>
                          </td>
                          <td>Jinshin</td>
                          <td>
                            <span className="badge badge-danger">Rejected</span>
                          </td>
                          <td>
                            <div
                              className="sparkbar"
                              data-color="#f56954"
                              data-height={20}
                            >
                              No Paid
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <a href="">OR1848</a>
                          </td>
                          <td>Samual</td>
                          <td>
                            <span className="badge badge-danger">Rejected</span>
                          </td>
                          <td>
                            <div
                              className="sparkbar"
                              data-color="#f39c12"
                              data-height={20}
                            >
                              Misbehave
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="">OR1848</a>
                          </td>
                          <td>Samual</td>
                          <td>
                            <span className="badge badge-warning">Pending</span>
                          </td>
                          <td>
                            <div
                              className="sparkbar"
                              data-color="#f39c12"
                              data-height={20}
                            >
                              Time Wasted
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="">OR9842</a>
                          </td>
                          <td>Donayal</td>
                          <td>
                            <span className="badge badge-danger">Rejected</span>
                          </td>
                          <td>
                            <div
                              className="sparkbar"
                              data-color="#00a65a"
                              data-height={20}
                            >
                              Misbehave
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* /.table-responsive */}
                </div>
                {/* /.card-body */}
                <div className="card-footer clearfix">
                  <a
                    href="javascript:void(0)"
                    className="btn btn-sm btn-info float-left"
                  >
                    Visit Profiles
                  </a>
                </div>
                {/* /.card-footer */}
              </div>
            </div>
            {/* Main content */}
            <div className="col-md-6">
              {/* Default box */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <span className="text-white"> Payment Cleared</span>
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
                        <th style={{ width: "1%" }}>SL.No</th>
                        <th style={{ width: "20%" }}>Name</th>
                        <th style={{ width: "30%" }}>Images</th>
                        <th>Payment Gateways</th>
                        <th style={{ width: "8%" }} className="text-center">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          <a>Addon Anela</a>
                          <br />
                          <small>Date 01.01.2019</small>
                        </td>
                        <td>
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar.png"
                              />
                            </li>
                          </ul>
                        </td>
                        <td className="text-center">
                          <img
                            src={skrill}
                            alt="Payment Gateway 1"
                            style={{ maxWidth: "50px", maxHeight: "50px" }}
                          />
                        </td>
                        <td className="project-state">
                          <span className="badge badge-success">Success</span>
                        </td>
                      </tr>

                      <tr>
                        <td>2</td>
                        <td>
                          <a>Addon Anela</a>
                          <br />
                          <small>Date 01.01.2019</small>
                        </td>
                        <td>
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar.png"
                              />
                            </li>
                          </ul>
                        </td>
                        <td className="text-center">
                          <img
                            src={stripe}
                            alt="Payment Gateway 1"
                            style={{ maxWidth: "50px", maxHeight: "50px" }}
                          />
                        </td>
                        <td className="project-state">
                          <span className="badge badge-success">Success</span>
                        </td>
                      </tr>

                      <tr>
                        <td>3</td>
                        <td>
                          <a>Addon Anela</a>
                          <br />
                          <small>Date 01.01.2019</small>
                        </td>
                        <td>
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar.png"
                              />
                            </li>
                          </ul>
                        </td>
                        <td className="text-center">
                          <img
                            src={squre}
                            alt="Payment Gateway 1"
                            style={{ maxWidth: "50px", maxHeight: "50px" }}
                          />
                        </td>
                        <td className="project-state">
                          <span className="badge badge-success">Success</span>
                        </td>
                      </tr>

                      <tr>
                        <td>4</td>
                        <td>
                          <a>Addon Anela</a>
                          <br />
                          <small>Date 01.01.2019</small>
                        </td>
                        <td>
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar.png"
                              />
                            </li>
                          </ul>
                        </td>
                        <td className="text-center">
                          <img
                            src={payoneer}
                            alt="Payment Gateway 1"
                            style={{ maxWidth: "50px", maxHeight: "50px" }}
                          />
                        </td>
                        <td className="project-state">
                          <span className="badge badge-success">Success</span>
                        </td>
                      </tr>

                      <tr>
                        <td>5</td>
                        <td>
                          <a>Addon Anela</a>
                          <br />
                          <small>Date 01.01.2019</small>
                        </td>
                        <td>
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar.png"
                              />
                            </li>
                          </ul>
                        </td>
                        <td className="text-center">
                          <img
                            src={bank}
                            alt="Payment Gateway 1"
                            style={{ maxWidth: "50px", maxHeight: "50px" }}
                          />
                        </td>
                        <td className="project-state">
                          <span className="badge badge-success">Success</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* /.content */}
          </div>

          <div className="col-md-6"></div>
        </div>
      </div>
    </div>
  );
};

export default Psy_History
