import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is installed
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

const Testimonials = () => {
  const [horoscopes, setHoroscopes] = useState([]);

  // Fetch all horoscopes when the component mounts
  useEffect(() => {
    const fetchHoroscopes = async () => {
      try {
        const response = await axios.get('/api/monthly/horoscopes'); // Update with your actual API endpoint
        setHoroscopes(response.data);
      } catch (error) {
        console.error('Error fetching horoscopes:', error);
        toast.error('Error fetching horoscopes'); // Show error toast
      }
    };

    fetchHoroscopes();
  }, []);

  // Function to handle deletion of a horoscope
  const handleDelete = async (id) => {
    try {
      // Confirm deletion from the user
      const confirmDelete = window.confirm('Are you sure you want to delete this horoscope?');
      if (confirmDelete) {
        await axios.delete(`/api/monthly/horoscope/${id}`); // Update with your actual API endpoint
        setHoroscopes(horoscopes.filter(horoscope => horoscope._id !== id)); // Update state after deletion
        toast.success('Horoscope deleted successfully'); // Show success toast
      }
    } catch (error) {
      console.error('Error deleting horoscope:', error);
      toast.error('Error deleting horoscope'); // Show error toast
    }
  };

  return (
    <div>
      <ToastContainer /> {/* Add ToastContainer to render toasts */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Testimonials</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">Testimonials</li>
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
              <h3 className="card-title"><span className='text-white'>Testimonials</span></h3>
            </div>
            <div className="card-body p-0">
              <table className="table table-striped projects">
                <thead>
                  <tr>
                    <th style={{ width: '2%' }} className="text-center">SL</th>
                    <th style={{ width: '10%' }} className="text-center">Name</th>
                    <th style={{ width: '5%' }} className="text-center">Email</th>
                    <th style={{ width: '15%' }} className="text-center">Testimonial</th>
                    <th style={{ width: '15%' }} className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {horoscopes.map((horoscope, index) => (
                    <tr key={horoscope._id} className='text-center'>
                      <td>{index + 1}</td>
                      <td>
                        <a>{horoscope.name}</a>
                      </td>
                      <td className="project-image">{horoscope.email}</td>
                      <td className="project-state">
                        <p>{horoscope.experience}</p>
                      </td>
                      <td className="project-actions text-right">
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(horoscope._id)} // Call handleDelete with the horoscope ID
                        >
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </section>
        {/* /.content */}
      </div>
    </div>
  );
};

export default Testimonials;
