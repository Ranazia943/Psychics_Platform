import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import UserFundmodal from './UserFundmodal';
import { toast } from 'react-toastify'; // Import toast for notifications
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]); // State to hold all users
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedUser, setSelectedUser] = useState(null); // State to hold the user to which funds will be added
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages state
  
  useEffect(() => {
    const fetchAllUsers = async (page = 1) => {
      try {
        const response = await axios.get(`/api/auth/all-users?page=${page}`); // Include the page number in the request
        setUsers(response.data.users); // Set user data
        setTotalPages(response.data.totalPages); // Set total pages
      } catch (err) {
        setError('Failed to fetch users'); // Handle error
        console.error(err);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    
   
      fetchAllUsers(currentPage); // Fetch users for the current page
    }, [currentPage]); // Depend on currentPage
    
  const handleAddFunds = async (userId, amount) => {
    try {
      const response = await axios.put('/api/auth/users/add-fund', { userId, amount });

      // Display success toast
      toast.success(response.data.message); // Notify user of success
      
      const updatedUsers = users.map(user => 
        user._id === userId ? { ...user, walletBalance: response.data.walletBalance } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      // Enhanced error handling
      console.error('Error adding funds:', error);
      const errorMessage = error.response && error.response.data
        ? error.response.data.message // Check for error message in response
        : error.message; // Fallback to error message

      // Display error toast
      toast.error('Error adding funds: ' + errorMessage); // Notify user of error
    }
  };

  // New function to handle user deletion
  const handleDeleteUser = async (userId, username) => {
    try {
      await axios.delete(`/api/auth/users/${userId}`); // API call to delete user
      
      // Update state to remove the deleted user
      const updatedUsers = users.filter(user => user._id !== userId);
      setUsers(updatedUsers);
      
      // Show success toast notification
      toast.success(`${username} deleted successfully!`, {
        position: toast.POSITION.TOP_RIGHT, // Positioning the toast
        autoClose: 3000, // Auto close after 3 seconds
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      const errorMessage = error.response && error.response.data
        ? error.response.data.message // Check for error message in response
        : error.message; // Fallback to error message

      // Display error toast
      toast.error('Error deleting user: ' + errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  if (loading) return <p>Loading...</p>; // Loading state
  if (error) return <p>{error}</p>; // Error handling

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <Link to="/admin/pages/adduser"><button className='btn'> Add User </button></Link>
              
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">All Users</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      {/* Main content */}
      <section className="content">
        {/* Default box */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title"><span className='text-white'> Users List</span></h3>
            <div className="card-tools">
              <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                <i className="fas fa-minus text-white" />
              </button>
              <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                <i className="fas fa-times text-white" />
              </button>
            </div>
          </div>
          <div className="card-body p-0">
            <div>
              {users.length > 0 ? (
                <table className="table table-striped projects">
                  <thead>
                    <tr>
                      <th style={{ width: '15%' }}>User Name</th>
                      <th style={{ width: '20%' }}>Email</th>
                      <th style={{ width: '15%' }}>Wallet Balance</th>
                      <th style={{ width: '20%' }}>Profile Picture</th>
                      <th style={{ width: '30%' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} style={{ height: '50px' }}> {/* Set height of the row */}
                        <td>
                          <a>{user.username}</a>
                          <br />
                        </td>
                        <td>
                          <a>{user.email}</a>
                          <br />
                        </td>
                        <td>
                          <a>
                            <strong>$</strong> {user.walletBalance.toFixed(2)} {/* Format wallet balance */}
                          </a>
                          <br />
                        </td>
                        <td>
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <img alt="Avatar" className="table-avatar" src={user.profilePic || '../../dist/img/avatar.png'} />
                            </li>
                          </ul>
                        </td>
                        <td className="project-actions text-right">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => {
                              setSelectedUser(user); // Set the selected user
                              setShowModal(true); // Show the modal
                            }}
                          >
                            <i className="fas fa-plus text-white"></i> Add Fund
                          </button>
                          <a 
                            className="btn btn-danger btn-sm" 
                            href="#"
                            onClick={() => handleDeleteUser(user._id, user.username)} // Call delete handler
                          >
                            <i className="fas fa-trash text-white"></i> Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No users found.</p> // Message if no users exist
              )}
            </div>
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </section>
      <div className="pagination text-right">
  <button className='btn'
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    Previous
  </button>
  <span>Page {currentPage} of {totalPages}</span>
  <button className='btn'
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Next
  </button>
</div>

      {/* /.content */}
      
      {/* Add Fund Modal */}
      {selectedUser && (
        <UserFundmodal
          show={showModal}
          onClose={() => setShowModal(false)}
          onAddFunds={handleAddFunds}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default withRouter(Users); 
