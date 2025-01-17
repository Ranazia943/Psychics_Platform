import React, { useContext, useState, useEffect } from 'react';
import '../assets/style.css';
import { NavLink } from 'react-router-dom';
import avatar from '../Images/avatar.png';
import { PsyAuthContext } from '../../context/PsyAuthContext';
import axios from 'axios';

const PsyProfile = () => {
  const { authPsychics } = useContext(PsyAuthContext);
  const [activeTab, setActiveTab] = useState('Profile');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const psychicId = authPsychics?._id; // Use `_id` from `authPsychics`

  useEffect(() => {
    const fetchPsychicData = async () => {
      try {
        if (!psychicId) {
          throw new Error('Psychic ID not found');
        }

        console.log('Fetching data for psychicId:', psychicId); // Debugging

        const response = await axios.get(`/api/profilestep2/${psychicId}`);
        console.log('API Response:', response.data); // Debugging

        if (response.data && response.data.data) {
          setProfileData(response.data.data);
        } else {
          throw new Error('No data found in response');
        }
      } catch (err) {
        console.error('Error fetching psychic data:', err); // Debugging
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPsychicData();
  }, [psychicId]); // Dependency on `psychicId`

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>No profile data found.</div>;
  }

  const { psychic, profile, profileStep3, profileStep4, profileStep5 } = profileData;

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row" data-aos="fade-up" data-aos-duration="500">
            <div className="col-md-3">
              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <img
                      className="profile-user-img img-fluid img-circle"
                      src={psychic.profilePic || avatar}
                      alt="User profile picture"
                    />
                  </div>
                  <h3 className="profile-username text-center">
                    {psychic.username}
                  </h3>
                  <p className="text-muted text-center">
                    {psychic.role}
                  </p>
                  <ul className="list-group list-group-unbordered mb-3">
                    <li className="list-group-item">
                      <b style={{ color: "#636363" }}>Ratings</b>{" "}
                      <a className="float-right" style={{ fontSize: "1em" }}>
                        320
                      </a>
                    </li>
                    <li className="list-group-item">
                      <b style={{ color: "#636363" }}>Total Readings</b>{" "}
                      <a className="float-right" style={{ fontSize: "1em" }}>
                        234
                      </a>
                    </li>
                    <li className="list-group-item">
                      <b style={{ color: "#636363" }}>Rate/Min</b>{" "}
                      <a className="float-right" style={{ fontSize: "1em" }}>
                        ${profile.chargesPerMin}
                      </a>
                    </li>
                  </ul>
                  <a
                    href=""
                    className="btn btn-block"
                    style={{ background: "#ff6000", color: "#fff" }}
                  >
                    <b>
                      <NavLink to="/psychics/pages/update_profile">
                        <span className="text-white">Update Profile</span>
                      </NavLink>
                    </b>
                  </a>
                </div>
              </div>

              <div className="card">
                <div className="card-header" style={{ background: "#ff6000" }}>
                  <h3 className="card-title">
                    {" "}
                    <span className="text-white">About Me</span>
                  </h3>
                </div>
                <div className="card-body">
                  <strong style={{ color: "#636363" }}>
                    <i className="fas fa-book mr-1" /> Topics
                  </strong>
                  <p className="text-muted">{profileStep4?.qualitiesOfPsychic}</p>
                  <hr />
                  <strong style={{ color: "#636363" }}>
                    <i className="fas fa-map-marker-alt mr-1" /> Tools
                  </strong>
                  <p className="text-muted">{profileStep3?.learnedAstrologyFrom}</p>
                  <hr />
                     </div>
              </div>
            </div>

            <div className="col-md-9">
              <div className="card">
                <div className="card-header p-2">
                  <ul className="nav nav-pills">
                    <li className="nav-item">
                      <a
                        className={`nav-link ${activeTab === "Profile" ? "active" : ""}`}
                        onClick={() => setActiveTab("Profile")}
                        role="tab"
                      >
                        Profile
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${activeTab === "ProfileStep3" ? "active" : ""}`}
                        onClick={() => setActiveTab("ProfileStep3")}
                        role="tab"
                      >
                        Profile Step 3
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${activeTab === "ProfileStep4" ? "active" : ""}`}
                        onClick={() => setActiveTab("ProfileStep4")}
                        role="tab"
                      >
                        Profile Step 4
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${activeTab === "ProfileStep5" ? "active" : ""}`}
                        onClick={() => setActiveTab("ProfileStep5")}
                        role="tab"
                      >
                        Profile Step 5
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <div className="tab-content">
                    {activeTab === "Profile" && (
                      <div className="tab-pane active">
                        <div className="post clearfix">
                          <div className="user-block">
                            <img
                              className="img-circle img-bordered-sm"
                              src={psychic.profilePic || avatar}
                              alt="User Image"
                            />
                            <span className="username">
                              <a href="#" className="psychics_profile_details">
                                {psychic.username}
                              </a>
                            </span>
                          </div>
                          <p>{profileStep4?.longBio}</p>
                        </div>
                      </div>
                    )}

                    {activeTab === "ProfileStep3" && (
                      <div className="tab-pane active">
                        <div className="table-responsive">
                          <table className="table table-bordered table-striped">
                            <thead>
                              <tr>
                                <th>Field</th>
                                <th>Details</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Business Source</td>
                                <td>{profileStep3.businessSource}</td>
                              </tr>
                              <tr>
                                <td>Qualification</td>
                                <td>{profileStep3.qualification}</td>
                              </tr>
                              <tr>
                                <td>Degree/Diploma</td>
                                <td>{profileStep3.degreeDiploma}</td>
                              </tr>
                              <tr>
                                <td>College Name</td>
                                <td>{profileStep3.collegeName}</td>
                              </tr>
                              <tr>
                                <td>Learned Astrology From</td>
                                <td>{profileStep3.learnedAstrologyFrom}</td>
                              </tr>
                              <tr>
                                <td>Instagram Profile</td>
                                <td>
                                  <a href={profileStep3.instagramProfile} target="_blank" rel="noopener noreferrer">
                                    {profileStep3.instagramProfile}
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td>Facebook Profile</td>
                                <td>
                                  <a href={profileStep3.facebookProfile} target="_blank" rel="noopener noreferrer">
                                    {profileStep3.facebookProfile}
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td>LinkedIn Profile</td>
                                <td>
                                  <a href={profileStep3.linkedInProfile} target="_blank" rel="noopener noreferrer">
                                    {profileStep3.linkedInProfile}
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td>YouTube Profile</td>
                                <td>
                                  <a href={profileStep3.youtubeProfile} target="_blank" rel="noopener noreferrer">
                                    {profileStep3.youtubeProfile}
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td>Website Profile</td>
                                <td>
                                  <a href={profileStep3.websiteProfile} target="_blank" rel="noopener noreferrer">
                                    {profileStep3.websiteProfile}
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {activeTab === "ProfileStep4" && (
                      <div className="tab-pane active">
                        <div className="table-responsive">
                          <table className="table table-bordered table-striped">
                            <thead>
                              <tr>
                                <th>Field</th>
                                <th>Details</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Min Earning Expectation</td>
                                <td>${profileStep4.minEarningExpectation}</td>
                              </tr>
                              <tr>
                                <td>Max Earning Expectation</td>
                                <td>${profileStep4.maxEarningExpectation}</td>
                              </tr>
                              <tr>
                                <td>Countries Traveled</td>
                                <td>{profileStep4.countriesTraveled}</td>
                              </tr>
                              <tr>
                                <td>Current Job Status</td>
                                <td>{profileStep4.currentJobStatus}</td>
                              </tr>
                              <tr>
                                <td>Long Bio</td>
                                <td>{profileStep4.longBio}</td>
                              </tr>
                              <tr>
                                <td>Qualities of Psychic</td>
                                <td>{profileStep4.qualitiesOfPsychic}</td>
                              </tr>
                              <tr>
                                <td>Biggest Challenge</td>
                                <td>{profileStep4.biggestChallenge}</td>
                              </tr>
                              <tr>
                                <td>Repeated Question Handling</td>
                                <td>{profileStep4.repeatedQuestionHandling}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {activeTab === "ProfileStep5" && (
                      <div className="tab-pane active">
                        <div className="table-responsive">
                          <table className="table table-bordered table-striped">
                            <thead>
                              <tr>
                                <th>Day</th>
                                <th>From Time</th>
                                <th>To Time</th>
                              </tr>
                            </thead>
                            <tbody>
                              {profileStep5.availability.map((slot, index) => (
                                <tr key={index}>
                                  <td>{slot.day}</td>
                                  <td>{slot.fromTime}</td>
                                  <td>{slot.toTime}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
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

export default PsyProfile;