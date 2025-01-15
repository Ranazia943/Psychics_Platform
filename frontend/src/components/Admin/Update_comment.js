import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'; // Import withRouter
import axios from 'axios';

const UpdateComment = (props) => {
    const [commentData, setCommentData] = useState({
        name: "",
        email: "",
        content: "",
    });

    const categoryid = props.match.params.id; // Get comment ID from URL parameters

    useEffect(() => {
        fetchComment();
    }, []);

    const fetchComment = async () => {
        try {
            const response = await axios.get(`/api/comment/category${categoryid}`); // Fetch the comment data
            setCommentData(response.data.comment); // Assuming the response contains a `comment` object
        } catch (error) {
            console.error("Error fetching comment:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCommentData({ ...commentData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/comment/update/${categoryid}`, commentData); // Update the comment data
            // Optionally, redirect or notify user of success
            props.history.push('/admin/pages/comments'); // Redirect after successful update
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Name"
                                    value={commentData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Email"
                                    value={commentData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    id="message"
                                    name="content"
                                    className="form-control"
                                    placeholder="Message"
                                    rows="5"
                                    value={commentData.content}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn-contact">Update</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default withRouter(UpdateComment); // Wrap withRouter to access router props
