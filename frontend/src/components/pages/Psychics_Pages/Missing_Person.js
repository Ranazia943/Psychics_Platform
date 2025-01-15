import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import profile_img1 from "../../Images/profile_img1.jpg";
import love_couple from "../../Images/love_couple.jpg";

const Missing_Person = () => {

const [profiles, setProfiles] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [blogs, setBlogs] = useState([]);

useEffect(() => {
  axios
    .get("/api/posts/nature")
    .then((response) => setBlogs(response.data))
    .catch((error) =>
      console.error("There was an error fetching the blog posts!", error)
    );
}, []);

  // Fetch profiles by category
  useEffect(() => {
    fetchProfiles();
  }, [currentPage]);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get(
        `/api/profilestep2/category/Missing Person?page=${currentPage}&limit=6`
      );
      setProfiles(response.data.profiles);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching profiles", error);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const [crystalPage, setcrystalPage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getPerson"); // Update the URL if needed
        setcrystalPage(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!crystalPage) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container">
        <br />
        <div className="love_banner" data-aos="zoom-in-up">
          <img src={crystalPage.MediumBanner} alt="love banner" />
        </div>
        <br></br>
        <br></br>
        <div className="product-box">
          <div
            className="card card-solid"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
          ></div>
          <br />
          <br />

          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <React.Fragment key={profile._id}>
                {/* Start a new row for each profile */}
                <div
                  className="row"
                  data-aos="fade-up"
                  data-aos-anchor-placement="top-bottom"
                >
                  <div className="col-md-3">
                    {/* Profile Image */}
                    <div className="card card-primary card-outline">
                      <div className="card-body box-profile">
                        <div className="text-center">
                          <NavLink to={`/Psychicsprofile/${profile.Psychics}`}>
                            <img
                              className="profile-user-img  img-circle" 
                              src={profile.psychic.profileImage}
                              alt="User profile picture"
                            />
                          </NavLink>
                        </div>
                        <h3 className="profile-username text-center">
                        <b>{profile.psychic?.username}</b>
                       
                        </h3>
                        <p className="text-center">Category:{profile.category}</p>
                        <ul className="list-group list-group-unbordered">
                          <li className="list-group-item">
                            <b>Rating</b>
                            <a
                              className="float-right"
                              style={{ fontSize: "1em" }}
                            >
                              293
                            </a>
                          </li>
                          <li className="list-group-item">
                            <b>Price</b>
                            <p
                              className="float-right"
                              style={{ fontSize: "1em" }}
                            >
                              ${profile.chargesPerMin}{" "}
                              <del style={{ color: "gray" }}>
                                ${profile.videoChargesPerMin}
                              </del>
                            </p>
                          </li>
                        </ul>
                        <div className="btn_chat_psychics">
                          <button
                            className="btn_chat_psychics_btn"
                            style={{ color: "white", border: "none" }}
                          >
                            <Link
                              to="/"
                              style={{ color: "white", textDecoration: "none" }}
                            >
                              Chat
                            </Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-9">
                    <div className="card">
                    <div className="card-header-nav">
  <ul className="nav nav-pills d-flex justify-content-between">
    {/* Left Side - About / Skills */}
    <li className="nav-item">
      <a
        className="nav-link-nav"
        href="#about-skills"
        data-toggle="tab"
      >
        About / Skills
      </a>
    </li>

    {/* Right Side - Profile with Eye Icon */}
    <li className="nav-item">
      <Link to={`/Psychicsprofile/${profile.Psychics}`}
        className="nav-link-nav active"
        href="#profile"
        data-toggle="tab"
      >
        <i className="fas fa-eye text-white"></i> Profile
      </Link>
    </li>
  </ul>
</div>


                      <div className="love-card-body">
                        <div className="tab-content-love">
                          <div className="time-label">
                            <div className="joined-date">
                              Joined date{" "}
                              <span className="joined-date-day">
  {new Date(profile.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })}
</span>
                            </div>
                          </div>

                          <div className="timeline timeline-inverse">
                            <div className="tab-pane" id="timeline">
                              <div className="timeline timeline-inverse">
                                <div>
                                  <i
                                    className="fas fa-user-plus"
                                    style={{
                                      background: "#94009d",
                                      color: "white",
                                    }}
                                  />
                                  <div className="timeline-item">
                                    <p
                                      className="timeline-header"
                                      style={{ color: "#94009d" }}
                                    >
                                      About
                                    </p>
                                    <div className="timeline-body">
                                    {profile.profileStep4?.longBio || "No bio available"}
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <i
                                    className="fas fa-tools"
                                    style={{
                                      background: "#94009d",
                                      color: "white",
                                    }}
                                  />
                                  <div className="timeline-item">
                                    <span className="time">
                                      <i className="far fa-clock" /> 27 mins ago
                                    </span>
                                    <p
                                      className="timeline-header"
                                      style={{ color: "#94009d" }}
                                    >
                                      Skills
                                    </p>
                                    <div className="timeline-body">
                                      {profile.allSkills}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End row for each profile */}
              </React.Fragment>
            ))
          ) : (
            <div>No profiles found.</div>
          )}

          <div className="card-footer">
            <nav aria-label="Contacts Page Navigation">
              <ul className="pagination justify-content-center m-0">
                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                      style={{
                        background:
                          currentPage === index + 1 ? "#ff6000" : "#fff",
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
          
          <br />
          <div class="underline">
            <div class="line"></div>
            <div class="star">&#9733;</div>
            <div class="line"></div>
          </div>
          <br />
          <br />
          {/*  Relationships have such an impact in our lives. */}
          <div className="row" data-aos="zoom-in">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <video className="d-block w-100" controls>
                          <source src={crystalPage.video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <div id="accordion">
                  <div className="card-primary">
                    <div
                      id="collapseOne"
                      className="collapse show"
                      data-parent="#accordion"
                    >
                      <div className="card-body">{crystalPage.video_para}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="frequntly asked questions" data-aos="fade-right">
            <div className="intro-question">
              <h4> FAQ's</h4>
            </div>
            <br />
            <section className="content">
              <div className="row ">
                <div className="col-md-6 col-sm-12" id="accordion">
                  <div className="card">
                    <div className="card-header  text-white d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">
                        <a
                          className="d-block text-white card-link"
                          data-toggle="collapse"
                          href="#collapseOne"
                        >
                          1. {crystalPage.question}
                        </a>
                      </h5>
                      <a
                        className="d-block text-white"
                        data-toggle="collapse"
                        href="#collapseOne"
                      >
                        <i className="fas fa-plus" id="iconOne"></i>
                      </a>
                    </div>
                    <div
                      id="collapseOne"
                      className="collapse"
                      data-parent="#accordion"
                    >
                      <div className="card-body">{crystalPage.answer}</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <br></br>
                   
            <h4>Latest Blogs</h4>
      <div className="row">
        <br />
        <br />
        {blogs.slice(0, 3).map((blog) => (
          <div className="col-md-4" key={blog._id}>
            <div className="card">
              <div className="card-header">
                <h3 className="card-title" style={{ fontSize: "1.1em" }}>
                  <i className="fas fa-text-width" style={{ padding: "3px" }} />
                  <span className="text-white">{blog.title}</span>
                </h3>
              </div>
              {/* /.card-header */}
              <div className="card-body clearfix">
                <blockquote className="quote-secondary">
                  <p>
                    {blog.content.substring(0, 100)}...
                  </p>
                  <small>Someone famous in </small>
                  <br />
                  <cite
                    title="Source Title"
                    style={{ color: "#ff6000", cursor: "pointer" }}
                  >
                    <NavLink
                      to={`/Blogdetails/${blog._id}`}
                      style={{ color: "#ff6000", textDecoration: "none" }}
                    >
                      Read More
                    </NavLink>
                  </cite>
                </blockquote>
              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}
          </div>
        ))}
      </div>


            {/* How pyschics work end */}
          </div>
        </div>
      </div>
   
  );
};

export default Missing_Person;
