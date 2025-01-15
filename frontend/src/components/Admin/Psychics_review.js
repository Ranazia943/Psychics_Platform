import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast for notifications

const Psychics_review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/rating/all');
        setReviews(response.data);
      } catch (err) {
        setError('Error fetching reviews');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`/api/rating/comment/${commentId}`);
      setReviews(reviews.filter((review) => review._id !== commentId));
      toast.success('Comment deleted successfully'); // Show success message
    } catch (err) {
      toast.error('Error deleting comment'); // Show error message
      console.error(err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="card card-widget">
            <div className="card-header" style={{ background: '#ff6000' }}>
              <div className="user-block">
                <span className="username-testimonials"><a href="#">Testimonials</a></span>
              </div>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                  <span className='text-white'><i className="far fa fa-minus" /></span>
                </button>
              </div>
            </div>
            <div className="card-footer card-comments">
              {reviews.map((review) => (
                <div className="card-comment" key={review._id}>
                  <div className="comment-text">
                    <span className="username">
                      {review.userId.username} {/* Displaying user name */}
                      <span className="text-muted float-right">{new Date(review.createdAt).toLocaleString()}</span>
                    </span>
                    <div className="stars">
                      {[...Array(review.rating)].map((_, index) => (
                        <label key={index} htmlFor={`star${index + 1}`}>★</label> // Display stars based on rating
                      ))}
                    </div>
                    {review.comment}
                    <button
                      className="btn btn-danger btn-sm float-right" // Add styling for the delete button
                      onClick={() => handleDelete(review._id)} // Call handleDelete with review ID
                    >
                      <i className="fas fa-trash" /> {/* Trash icon */}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Psychics_review;
