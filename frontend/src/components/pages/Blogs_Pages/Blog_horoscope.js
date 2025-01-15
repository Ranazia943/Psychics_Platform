import React, { useState, useEffect } from "react";
import axios from "axios";
import Horoscopes_add from "../../Images/Horoscopes_add.png";
import { NavLink } from "react-router-dom";

const Blog_horocope = () => { // Correctly capitalized component name
  const [blogs, setBlogs] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [profiles, setProfiles] = useState([]); // State to hold psychic profiles

  useEffect(() => {
    // Fetching blog posts
    axios
      .get("/api/posts/horoscopes")
      .then((response) => setBlogs(response.data))
      .catch((error) =>
        console.error("There was an error fetching the blog posts!", error)
      );

    // Fetching psychic profiles
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(
          `/api/psychics/data/category/Astrologer`
        );
        setProfiles(response.data.profiles); // Ensure the response structure is correct
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles(); // Call to fetch the psychic profiles
  }, []);

  const handleLike = (id) => {
    const userId = "currentUserId"; // Replace this with actual user ID retrieval logic

    const isLiked = likedPosts.has(id);

    axios
      .post(`/api/posts/${id}/like`, { userId })
      .then((response) => {
        setBlogs(blogs.map((blog) => (blog._id === id ? response.data : blog)));
        const newLikedPosts = new Set(likedPosts);
        if (isLiked) {
          newLikedPosts.delete(id);
        } else {
          newLikedPosts.add(id);
        }
        setLikedPosts(newLikedPosts);
      })
      .catch((error) =>
        console.error("There was an error liking the blog post!", error)
      );
  };
  return (
    <div className="container">
      <br />

      {blogs.length > 0 && (
        <div className="love_banner" data-aos="zoom-in-up">
          <img src={blogs[0].Blog_Banner} alt="Blog Banner" />
        </div>
      )}
      <br />
      <br />
      <br />
      <div className="card-body">
        <div className="tab-content">
          <div className="card p-2" id="activity">
            <ul className="Horoscope-btn">
              <h4>Psychics Blogs</h4>
              <div className="centered-row">
                <h6>Topics:</h6>
                <NavLink to="/blog_astrology">
                  <li className="Horoscope-list-btn">Astrology</li>
                </NavLink>
                <NavLink to="/blog_tarot">
                  <li className="Horoscope-list-btn">Tarot Blogs</li>
                </NavLink>
                <NavLink to="/blog_spirtual">
                  <li className="Horoscope-list-btn">Spirituality</li>
                </NavLink>
                <NavLink to="/blog_horoscope">
                  <li className="Horoscope-list-btn">Horoscope</li>
                </NavLink>
                <NavLink to="/blog_relationship">
                  {" "}
                  <li className="Horoscope-list-btn">Relationship Active</li>
                </NavLink>
                <NavLink to="/blog_couple">
                  <li className="Horoscope-list-btn">Couple Love</li>
                </NavLink>
                <NavLink to="/blog_soulmate">
                  <li className="Horoscope-list-btn">Soulmate</li>
                </NavLink>
                <NavLink to="/blog_mind">
                  {" "}
                  <li className="Horoscope-list-btn">Mind, Body</li>
                </NavLink>
                <NavLink to="/blog_career">
                  <li className="Horoscope-list-btn"> Career blog</li>
                </NavLink>
              </div>
            </ul>
            <br />

            <div className="post">
              {/* Profile Section */}
              <div className="row">
                <div className="col-md-3">
                  {/* Profile Card */}
                  <div
                    className="card card-primary card-outline"
                    data-aos="fade-up"
                    data-aos-duration="1500"
                  >
                    <div className="card-body box-profile">
                    <NavLink to="/numerology">
                  <div className="text-center">
                    <img
                      src={Horoscopes_add}
                      alt="horoscopes"
                      className="horoscope_add"
                    />

                  </div>
                  </NavLink>
                    </div>
                  </div>

                  <div
                    className="card card-primary card-outline"
                    data-aos="fade-up"
                    data-aos-duration="1500"
                  >
                  
                  {profiles.slice(0, 2).map((profile) => (
                <div className="card card-primary card-outline" key={profile._id}>
                  <div className="card-body box-profile">
                    <div className="text-center">
                      <img
                        className="profile-user-img img-fluid img-circle"
                        src={profile.Psychics.profilePic || "../../dist/img/user4-128x128.jpg"}
                        alt="User profile picture"
                      />
                    </div>
                    <h6 className="profile-name text-center">
                      {profile.Psychics.username}
                    </h6>
                    <span className="text-muted text-center" style={{ fontSize: "0.7em" }}>
                      {profile.about || "No description available"}
                    </span>
                    <ul className="list-group list-group-unbordered">
                      <li className="list-group-item">
                        <span style={{ color: "#636363", fontSize: "0.7em" }}>
                          ${profile.ratePM}/Min{" "}
                          <span>
                            <del> $5.00</del>{" "}
                          </span>
                        </span>
                        <a className="float-right" style={{ fontSize: "0.7em" }}>
                          Rating (4.5)
                          <label htmlFor="star5">★</label>
                        </a>
                        <a className="float-left" style={{ fontSize: "0.7em", color: "#636363" }}>
                          Reading Since 2001 (4.5)
                        </a>
                      </li>
                    </ul>
                    <br />
                    <div className="btn-chat-group">
                      <a href="#" className="btn btn-block-chat" style={{ background: "#ff6000", color: "#fff" }}>
                      <NavLink to={`/Psychicsprofile/${profile.Psychics._id}`} style={{color:'white'}}> Profile</NavLink>
                      
                      </a>
                      <a href="#" className="btn btn-block-chat" style={{ background: "#ff6000", color: "#fff" }}>
                       <NavLink to="/" style={{color:'white'}}>Message</NavLink> 
                      </a>
                    </div>
                  </div>
                </div>
              ))}
                  </div>
                </div>

                {/* Blogs Section */}
                <div className="col-md-9">
                  <div className="row">
                    {blogs.map((blog) => (
                      <div className="col-md-4" key={blog._id}>
                        <div
                          className="card"
                          data-aos="fade-up"
                          data-aos-duration="1500"
                        >
                          <img
                            className="card-img-top"
                            style={{
                              width: "270px",
                              height: "160px",
                              objectFit: "cover",
                            }}
                            src={blog.image}
                            alt={blog.title}
                          />
                          <div className="card-body">
                            <h5 className="card-title">
                              {blog.title.substring(0, 40)}
                            </h5>
                            <p className="card-text">
                              {blog.content.substring(0, 100)}...
                            </p>
                            <button
                              className="blog_btn"
                              style={{
                                color: "white",
                                border: "none",
                                padding: "3px 5px",
                              }}
                            >
                              <NavLink
                                to={`/Blogdetails/${blog._id}`}
                                style={{
                                  color: "inherit",
                                  textDecoration: "none",
                                }}
                              >
                                Read More
                              </NavLink>
                            </button>
                          </div>
                          <div className="card-footer">
                            <div className="row">
                              <div className="col-sm-4">
                                <i
                                  className={`fa${
                                    likedPosts.has(blog._id) ? "s" : "r"
                                  } fa-thumbs-up`}
                                  onClick={() => handleLike(blog._id)}
                                  style={{
                                    cursor: "pointer",
                                    color: likedPosts.has(blog._id)
                                      ? "blue"
                                      : "black",
                                  }}
                                ></i>

                                <span className="icon">{blog.likes}</span>
                              </div>
                              <div className="col-sm-4">
                                <i className="far fa-comment"></i>
                                <span className="icon">{blog.comments}</span>
                              </div>
                              <div className="col-sm-4">
                                <i className="far fa-share-square"></i>
                                <span className="icon"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog_horocope;
