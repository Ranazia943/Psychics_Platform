import React, { useEffect, useState } from 'react';
import { PsyuseAuthContext } from '../../context/PsyAuthContext'; // Adjust the path accordingly

const Chathistory = () => {
  const { authPsychics } = PsyuseAuthContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch chat history when the component mounts
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        if (!authPsychics?._id) {
          throw new Error('Psychic ID is missing');
        }

        const response = await fetch(
          `/api/paidtimer/${authPsychics._id}/all-time-earnings`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setMessages(data.messages); // Set the messages state
      } catch (err) {
        console.error('Error fetching chat history:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, [authPsychics]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
                    <a href="#">Chat History</a>
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
                {messages.length > 0 ? (
                  messages.map((message, index) => (
                    <div className="card-comment" key={index}>
                      <div className="comment-text">
                        <span className="username">{message}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="card-comment">
                    <div className="comment-text">
                      <span className="username">No chat history found.</span>
                    </div>
                  </div>
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

export default Chathistory;