import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const PsychicList = ({ category }) => {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch profiles by category
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(
          `/api/profilestep2/category/${category}?page=${currentPage}&limit=6`
        );
        setProfiles(response.data.profiles);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [category, currentPage]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Determine status color
  const getStatusColor = (status) => {
    return status === "online" ? "green" : "gray";
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="card card-solid" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500">
      <div className="card-body pb-0">
        <div className="row">
          {profiles.length > 0 ? (
            profiles.map((profile) => {
              const statusColor = getStatusColor(profile.psychic?.status); // Get status color
              return (
                <div key={profile._id} className="card-column">
                  <div className="card bg-light d-flex flex-fill">
                    <div className="card-header-psychics">
                      <span
                        className="status"
                        style={{ backgroundColor: statusColor }} // Apply status color
                      >
                        {profile.psychic?.status}
                      </span>
                      <span className="icon-eye float-right">
                        <NavLink to={`/Psychicsprofile/${profile.Psychics}`}>
                          <i className="fas fa-eye" style={{ color: "white" }}></i>
                        </NavLink>
                      </span>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-7">
                          <h2 className="lead">
                            <b>{profile.psychic?.username}</b>
                          </h2>
                          <p className="text-muted text-sm">
                            <b>About: </b>
                            <br />
                            {profile.profileStep4?.longBio || "No bio available"}
                          </p>
                          <ul className="fa-ul text-muted">
                            <li className="small">
                              <span className="fa-li">
                                <i className="fas fa-lg fa-comment" />
                              </span>
                              2300
                            </li>
                            <li className="small">
                              <span className="fa-li">
                                <i className="fas fa-lg fa-star" />
                              </span>
                              4.5
                            </li>
                          </ul>
                          <div className="chat-rate-container">
                            <h5>
                              ${profile.chargesPerMin}{" "}
                              <del>${profile.videoChargesPerMin}</del>
                            </h5>
                          </div>
                        </div>
                        <div className="col-5 text-center">
                          <img
                            src={profile.psychic?.profilePic}
                            alt="user-avatar"
                            style={{ marginLeft: "15px" }}
                            className="img-circle img-fluid"
                          />
                          <span className="experties">Expertise:</span>
                          <span className="experties-about">
                            {profile.category || "No category available"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="text-right">
                        <button className="chat-button">
                          <NavLink to="/">
                            <span className="text-white">Chat</span>
                          </NavLink>
                        </button>
                        <button className="profile-button">
                          <span className="text-white">Phone</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No profiles found.</div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="card-footer">
        <nav aria-label="Contacts Page Navigation">
          <ul className="pagination justify-content-center m-0">
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index + 1}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                  style={{
                    background: currentPage === index + 1 ? "#ff6000" : "#fff",
                    color: currentPage === index + 1 ? "#fff" : "#000",
                  }}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default PsychicList;