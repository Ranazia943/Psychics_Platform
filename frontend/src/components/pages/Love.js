import React, { useEffect, useState } from 'react'
import Love_psychics_team from './Love_psychics_team';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';

const Love = () => {



  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("/api/posts/love")
      .then((response) => setBlogs(response.data))
      .catch((error) =>
        console.error("There was an error fetching the blog posts!", error)
      );
  }, []);
  useEffect(() => {
    fetchProfiles();
  }, [currentPage]);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get(
        `/api/psychics/data/category/Love Psychics?page=${currentPage}&limit=6`
      );
      setProfiles(response.data.profiles);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching profiles", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
const [lovePageData, setLovePageData] = useState(null);

  useEffect(() => {
    const fetchLovePageData = async () => {
      try {
        const response = await axios.get("/api/love_Page");
        setLovePageData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLovePageData();
  }, []);

  if (!lovePageData) {
    return <div>Loading...</div>;
  }

  const {
    Love_Banner,
    fallInLoveIntro,
    fallInLoveImage,
    fallInLoveParagraph,
    fallInLoveList,
    relationshipsIntro,
    relationshipsList,
    relationshipsImage,
    videoUrl,
    videoDescription,
    loveGuideIntro,
    loveGuideParagraph,
    loveGuideList,
  } = lovePageData;



  return (
    <div className="container">
      <br />
      <div className="love_banner" data-aos="zoom-in-up">
        <img src={Love_Banner} alt />
      </div>
      {/* filter start here  */}
      <br></br>
      <br></br>
      <div className="card-body">
        <div>
        
        
        </div>
      </div>
      {/* filter end hre  */}
       <br></br>
          <br></br>
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
                        <NavLink to={`/Psychicsprofile/${profile.Psychics._id}`}>
                          <img
                            className="profile-user-img img-fluid img-circle"
                            src={
                              profile.Psychics.profilePic ||
                              "default-profile-pic.png"
                            }
                            alt="User profile picture"
                          />
                          </NavLink>
                        </div>
                        <h3 className="profile-username text-center">
                          {profile.Psychics.username}
                          <i
                            className="fas fa-heart"
                            style={{ color: "#940094" }}
                          />
                        </h3>
                        <p className="text-center">
                          {profile.Psychics.Introlin}
                        </p>
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
                              ${profile.ratePM}{" "}
                              <del style={{ color: "gray" }}>
                                ${profile.crossRate}
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
                        <ul className="nav nav-pills">
                          <li className="nav-item">
                            <a
                              className="nav-link-nav active"
                              href="#activity"
                              data-toggle="tab"
                            >
                              Topics / Abilities
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div className="love-card-body">
                        <div className="tab-content-love">
                          <div className="time-label">
                            <div className="joined-date">
                              Joined date{" "}
                              <span className="joined-date-day">
                                5.feb-2020
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
                                      Abilities/Topics
                                    </p>
                                    <div className="timeline-body">
                                      {profile.abilities}
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
                                      Tools
                                    </p>
                                    <div className="timeline-body">
                                      {profile.tools}
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
       
       


      <div className="container">
        <div className="help_banner" data-aos="flip-left">
          <img src={Love_Banner} alt="Love Banner" />
          <div className="love_caption">
            <h4 className="love_banner_content">
              Need Help Just finding best Psychics
            </h4>
            <button className="Match_me"><Link to="/Psychologist" style={{color:"white"}}   >Match Me</Link></button>
          </div>
        </div>

        <div className="underline">
          <div className="line"></div>
          <div className="star">&#9733;</div>
          <div className="line"></div>
        </div>

        <h4 className="fallinlove_intro">{fallInLoveIntro}</h4>
        <div className="fallinlove_container">
          <div className="fallinlove_container_content" data-aos="fade-right">
            <img
              src={fallInLoveImage}
              alt="Fall In Love"
              className="fallinlove_img"
            />
          </div>
          <div className="fallinlove_container_content">
            <p>{fallInLoveParagraph}</p>
            <ul className="fallinlove_list">
              {fallInLoveList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="underline">
          <div className="line"></div>
          <div className="star">&#9733;</div>
          <div className="line"></div>
        </div>

        <div className="relationships_container">
          <div className="relationships_content">
            <h4>{relationshipsIntro}</h4>
            <ul className="relationship_list" style={{fontSize:'14px'}}>
              {relationshipsList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="relationships_img" data-aos="fade-left">
            <img src={relationshipsImage} alt="Love Couple" />
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="underline">
          <div className="line"></div>
          <div className="star">&#9733;</div>
          <div className="line"></div>
        </div>

        <br />
        <br />

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
                        <source src={videoUrl} type="video/mp4" />
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
                    <div className="card-body">{videoDescription}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />
        <hr className="underline" />
        <div
          className="love_guider_container"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <h4>{loveGuideIntro}</h4>
          <p>{loveGuideParagraph}</p>
          <div className="love_guider_content">
            <ul className="love_guide_list">
              {loveGuideList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        {/* Get ready for Love Readings! Ends */}
        {/* Blog section start hre */}
        <br />
        <br />
        <br />
        <hr className="underline" />
            
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
      </div>
      </div>
    
  );
}

export default Love
