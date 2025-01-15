import React, { useEffect, useState } from 'react';
import axios from 'axios';
import avatar from '../Images/avatar.png';
import { PsyuseAuthContext } from '../../context/PsyAuthContext'; // Adjust the path accordingly

const Feed_back = () => {
  const { authPsychics } = PsyuseAuthContext();
  const [ratings, setRatings] = useState([]); // State to store ratings
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch ratings by psychic ID
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        if (!authPsychics || !authPsychics._id) {
          throw new Error('Psychic ID not found');
        }

        const response = await axios.get(`/api/rating/${authPsychics._id}`);
        setRatings(response.data.ratings);
      } catch (err) {
        console.error('Error fetching ratings:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [authPsychics]);

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <label key={i} style={{ color: i < rating ? '#ffcc00' : '#ccc' }}>
          ★
        </label>
      );
    }
    return stars;
  };

  return (
    <div className="content-wrapper">
      {/* Content Header */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="col-md-12" data-aos="fade-up" data-aos-duration="1000">
            {/* Box Comment */}
            <div className="card card-widget">
              <div className="card-header" style={{ background: '#ff6000' }}>
                <div className="user-block">
                  <span className="username-testimonials">
                    <a href="#">Testimonials</a>
                  </span>
                </div>
                {/* /.user-block */}
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="collapse"
                    style={{ color: '#fff' }}
                  >
                    <i className="fas fa-minus" />
                  </button>
                </div>
                {/* /.card-tools */}
              </div>
              {/* /.card-header */}

              {/* /.card-body */}
              <div className="card-footer card-comments">
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>Error: {error}</p>
                ) : ratings.length === 0 ? (
                  <p>No ratings found.</p>
                ) : (
                  ratings.map((rating) => (
                    <div className="card-comment" key={rating._id}>
                      {/* User image */}
                      <img
                        className="img-circle img-sm"
                        src={avatar}
                        alt="User Image"
                      />
                      <div className="comment-text">
                        <span className="username">
                          {rating.userId?.username || 'Anonymous'}
                          <span className="text-muted float-right">
                            {new Date(rating.createdAt).toLocaleString()}
                          </span>
                        </span>
                        {/* Star ratings */}
                        <div className="stars">
                          {renderStars(rating.rating)}
                        </div>
                        {/* Comment */}
                        {rating.comment}
                      </div>
                      {/* /.comment-text */}
                    </div>
                  ))
                )}
              </div>
              {/* /.card-footer */}
            </div>
            {/* /.card */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed_back;