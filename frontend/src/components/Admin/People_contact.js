import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // For showing toast messages
import 'react-toastify/dist/ReactToastify.css'; // Import the toast styles


const RequestList = () => {
  const [requests, setRequests] = useState([]);

  // Fetch the list of requests when the component mounts
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/requestcontact/fetchallrequest');
        setRequests(response.data.data); // assuming response.data.data contains the array of requests
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  // Delete request handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/requestcontact/requests/${id}`);
      setRequests(requests.filter((request) => request._id !== id));
      toast.success('Request has been deleted successfully!'); // Show toast on success
    } catch (error) {
      console.error('Error deleting request:', error);
      toast.error('Error deleting the request.');
    }
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <section className="content">
            <div className="card">
              <div className="card-header">
                <h1 className='text-white'> Request Queries</h1>
              </div>

              <div className="card-footer card-comments">
                {requests.length > 0 ? (
                  requests.map((request, index) => (
                    <div key={index} className="card-comment">
                      <div className="comment-text">
                        <span className="username">
                          {request.name}
                          <span className="text-muted float-right">
                            {/* Add timestamp or other info if needed */}
                            <span className="float-right">
  <i 
    className="fas fa-trash" 
    style={{ cursor: 'pointer' }} 
    onClick={() => handleDelete(request._id)} 
  ></i>
  <strong> Delete</strong>
</span>

                          </span>
                        </span>
                        <div className="stars">
                          {/* Add static or dynamic star ratings */}
                        </div>
                        <p>{request.message}</p>
                      </div>
                      {/* /.comment-text */}
                    </div>
                  ))
                ) : (
                  <p>No requests found</p>
                )}
              </div>

            </div>
          </section>
        </div>
      </section>

      {/* Toast container for displaying messages */}
      <ToastContainer />
    </div>
  );
};

export default RequestList;
