import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PsychicsDetail = () => {
  const [psychics, setPsychics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch psychics based on the current page
  useEffect(() => {
    const fetchPsychics = async () => {
      try {
        const response = await axios.get(`/api/psychics/all?page=${currentPage}`);
        setPsychics(response.data.psychics);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError('Failed to fetch psychics');
      } finally {
        setLoading(false);
      }
    };

    fetchPsychics();
  }, [currentPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setLoading(true);
    }
  };

  // Handle delete psychic
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this psychic?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/psychics/psychic/${id}`);
      toast.success("Psychic deleted successfully!");
      setPsychics((prevPsychics) => prevPsychics.filter((psychic) => psychic._id !== id));
    } catch (err) {
      toast.error("Failed to delete psychic!");
    }
  };

  // Handle verify psychic (only allow verifying if not already verified)
  const handleVerify = async (id, isCurrentlyVerified) => {
    try {
      // If the psychic is already verified, do nothing
      if (isCurrentlyVerified) {
        toast.warning("Psychic is already verified!");
        return;
      }

      // Call the backend API to verify the psychic
      const response = await axios.put(`/api/psychics/data/verify/${id}`, {
        verified: true, // Set verified to true
      });

      // Show success toast message
      toast.success("Psychic verified successfully!");

      // Update the psychic's verification status in the state
      setPsychics((prevPsychics) =>
        prevPsychics.map((psychic) =>
          psychic._id === id ? { ...psychic, verified: true } : psychic
        )
      );
    } catch (err) {
      console.error('API Error:', err);
      toast.error("Failed to verify psychic!");
    }
  };

  return (
    <div>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <Link to="">
                  <button className="btn"> Add New Psychics </button>
                </Link>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">Psychics Profile</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title"><span className="text-white">Psychics Profile</span></h3>
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
              <table className="table table-striped projects">
                <thead>
                  <tr>
                    <th style={{ width: '1%' }}>Sr.no</th>
                    <th style={{ width: '10%' }}>Psychic's Name</th>
                    <th style={{ width: '20%' }}>Profile Picture</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th style={{ width: '35%' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {psychics.map((psychic, index) => (
                    <tr key={psychic._id}>
                      <td>{index + 1 + (currentPage - 1) * 10}</td>
                      <td>
                        <a>{psychic.username}</a>
                      </td>
                      <td>
                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <img alt="Avatar" className="table-avatar" src={psychic.profileImage || 'https://via.placeholder.com/150'} />
                          </li>
                        </ul>
                      </td>
                      <td>{psychic.email}</td>
                      <td>{psychic.gender}</td>
                      <td className="project-actions text-right">
                        <NavLink to={`/admin/pages/psychic_profile/${psychic._id}`} className="btn btn-primary btn-sm">
                          <i className="fas fa-eye text-white"></i> View
                        </NavLink>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleVerify(psychic._id, psychic.verified)}
                          disabled={psychic.verified} // Disable the button if already verified
                        >
                          {psychic.verified ? (
                            <i className="fas fa-check-circle text-white"></i>
                          ) : (
                            <i className="fas fa-times-circle text-white"></i>
                          )}
                          {psychic.verified ? " Verified" : " Verify"}
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(psychic._id)}
                        >
                          <i className="fas fa-trash text-white"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <br /><br />

              {/* Pagination Controls */}
              <div className="pagination-controls text-right">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="btn text-right"
                >
                  Previous
                </button>
                <span> Page {currentPage} of {totalPages} </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="btn text-right"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default PsychicsDetail;