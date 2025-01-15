import React, { useState, useEffect } from "react";
import axios from "axios";
import Horoscopes_add from "../../Images/Horoscopes_add.png";
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
const Blogdetails = ({ match }) => {
  const { id } = match.params; // Accessing the blog ID from the route params
  const [blog, setBlog] = useState(null);
  const [commentData, setCommentData] = useState({
    name: "",
    email: "",
    content: "",
  });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch the blog details
    axios
      .get(`/api/blog/post/${id}`)
      .then((response) => {
        setBlog(response.data);

        // Fetch comments related to the blog post category
        fetchComments(response.data.category); // Fetch comments by category from the blog post data
      })
      .catch((error) =>
        console.error("Error fetching the blog details!", error)
      );
  }, [id]);

  const fetchComments = (category) => {  // Accept category as a parameter
    console.log("Fetching comments for category ID:", category);
    axios
      .get(`/api/comment/category/${category}`) // Use the correct category ID
      .then((response) => {
        console.log("Comments fetched:", response.data);
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error.response || error);
      });
  };

  // Handle input changes for the comment form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommentData({
      ...commentData,
      [name]: value,
    });
  };

  // Submit comment to the backend
  const submitComment = async () => {
    try {
      const response = await axios.post("/api/comment/addComment", {
        blogPostId: blog._id,
        name: commentData.name,
        email: commentData.email,
        content: commentData.content,
        category: blog.category, // You can dynamically get the category from the blog
      });
      toast.success ("Comment has been submitted Successfully")
      // Optionally, fetch comments again after adding a new one
      fetchComments(blog.category);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  // Return early if blog data is still loading
  if (!blog) {
    return <div>Loading...</div>;
  }

 
  return (
    <div className="container">
      <div className="card-body">
        <div className="tab-content">
          <div className="active tab-pane" id="activity">
            <div className="post">
              
 
          
              <div className="row mb-3">
                <div className="col-sm-3">
                  {/* Profile Image */}
                  <div className="card card-primary card-outline">
                    <div className="card-body box-profile">
                      <div className="text-center">
                        <Link to="/Psychics"> <img
                          src={Horoscopes_add}
                          alt="horoscopes"
                          className="horoscope_add"
                        /></Link>
                       
                      </div>
                    </div>
                  </div>
 
                  {/* About Me Box */}
                  <div className="card card-primary card-outline">
                    <div className="card-body box-profile">
                      <div className="text-center">
                        <img
                          className="profile-user-img img-fluid img-circle"
                          src="../../dist/img/user4-128x128.jpg"
                          alt="User profile"
                        />
                      </div>
                      <h6 className="profile-name text-center">Naninkan</h6>
                      <span
                        className="text-muted text-center"
                        style={{ fontSize: "0.7em" }}
                      >
                        Love & Relationships Destiny & Life Path Money & Finance
                      </span>
                      <ul className="list-group list-group-unbordered">
                        <li className="list-group-item">
                          <span style={{ color: "#636363", fontSize: "0.7em" }}>
                            $2.00/Min{" "}
                            <span>
                              <del> $5.00</del>{" "}
                            </span>
                          </span>
                          <a
                            className="float-right"
                            style={{ fontSize: "0.7em" }}
                          >
                            {" "}
                            Rating (4.5)
                            <label htmlFor="star5">★</label>
                          </a>
                          <a
                            className="float-left"
                            style={{ fontSize: "0.7em", color: "#636363" }}
                          >
                            {" "}
                            Reading Since 2001 (4.5)
                          </a>
                        </li>
                      </ul>
                      <br />
                      <div className="btn-chat-group">
                        <a
                          href="#"
                          className="btn btn-block-chat"
                          style={{ background: "#ff6000", color: "#fff" }}
                        >
                          {" "}
                          Call{" "}
                        </a>
                        <a
                          href="#"
                          className="btn btn-block-chat"
                          style={{ background: "#ff6000", color: "#fff" }}
                        >
                          {" "}
                          Message{" "}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Horoscope Subscription */}
                  <div className="card card-danger">
                    <div className="card-header">
                      <h5 className="title-book">
                        Get Your Personal Horoscopes Daily
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-border"
                          placeholder="Enter full name"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-border border-width-2"
                          placeholder="Enter email"
                        />
                      </div>
                      <div className="appointment-btn">
                        <button type="submit" className="btn">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blog Details */}
                <div className="col-sm-9">
                <div className="user-block">
                <h4 className="mb" style={{ marginLeft: "20px" }}>{blog.title}</h4>
                
              
              </div>
                  <img className="img-fluid" src={blog.image} alt="Blog" />
                  <br></br> <br></br>
                  <div className="col-sm-12">
                    <div className="post">
                      <div className="user-block">
                        <h4>{blog.title}</h4>
                      </div>
                      <p className="card-text">{blog.content}</p>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="post">
                      <div className="user-block">
                        <h4>{blog.title1}</h4>
                      </div>
                      <p className="card-text">{blog.content1}</p>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="post">
                      <div className="user-block">
                        <h4>{blog.title2}</h4>
                      </div>
                      <p className="card-text">{blog.content2}</p>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="post">
                      <div className="user-block">
                        <h4>{blog.title3}</h4>
                      </div>
                      <p className="card-text">{blog.content3}</p>
                    </div>
                  </div>
                </div>
              </div>
             
              <div className="comments-section">
  <h5 className="comments-title">Comments</h5>
  {comments.length === 0 ? (
    <p className="no-comments">No comments yet.</p>
  ) : (
    comments.map((comment) => (
      <div className="comment" key={comment._id}>
        <div className="comment-header">
          <strong className="comment-author">{comment.name}</strong>
          <span className="comment-date">{new Date(comment.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="comment-content">{comment.content}</p>
      </div>
    ))
  )}
</div>

                  {/* Comment Form */}
                  <div className="col-sm-12 mt-4">
                    <h5>Leave a Comment</h5>
                    <form onSubmit={submitComment}>
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={commentData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={commentData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="content">Comment</label>
                        <textarea
                          className="form-control"
                          name="content"
                          value={commentData.content}
                          onChange={handleInputChange}
                          rows="3"
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit Comment
                      </button>
                    </form>
                  </div>

              
              {/* Contact to psychics end */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogdetails;
