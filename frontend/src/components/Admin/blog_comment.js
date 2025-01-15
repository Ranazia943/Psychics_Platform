import React, { useState, useEffect } from 'react';
import '../assets/style.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Psychics_profile_details = () => {
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchAllComments();
    }, [currentPage]);

    const fetchAllComments = () => {
        console.log("Fetching comments for page:", currentPage);
        axios
            .get(`/api/comment/allcomment?page=${currentPage}&limit=10`)
            .then((response) => {
                console.log("All comments fetched:", response.data);
                setComments(response.data.comments || []);
                setTotalPages(response.data.totalPages || 1);
            })
            .catch((error) => {
                console.error("Error fetching comments:", error.response || error);
            });
    };

    const handleDeleteComment = (commentId) => {
        axios
            .delete(`/api/comment/delete/${commentId}`)
            .then(() => {
                setComments(comments.filter(comment => comment._id !== commentId));
                toast.success("Comment has been deleted successfully!");
            })
            .catch((error) => {
                console.error("Error deleting comment:", error);
                toast.error("Error deleting comment.");
            });
    };

    const handleEditComment = (commentId) => {
        console.log("Editing comment with ID:", commentId);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
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
                                       
                                        <button onClick={() => handleDeleteComment(comment._id)} className="delete-button">
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                    <p className="comment-content">{comment.content}</p>
                                </div>
                            ))
                        )}
                        <div className="pagination text-right">
                            <button className="btn" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                            <span> Page {currentPage} of {totalPages} </span>
                            <button className='btn' onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </div>
    );
};

export default Psychics_profile_details;
