import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Visittors = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await axios.get('/api/visitors'); // Make sure this URL is correct
        setVisitors(response.data);
      } catch (error) {
        console.error('Error fetching visitors:', error);
      }
    };

    fetchVisitors();
  }, []);

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <span className='text-white'> Browsers History</span>
                  </h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <table id="example2" className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Browser</th>
                        <th>Version</th>
                        <th>OS</th>
                        <th>Platform</th>
                        <th>Engine</th>
                        <th>IP Address</th>
                        <th>Visited At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visitors.map((visitor) => (
                        <tr key={visitor._id}>
                          <td>{visitor.browser}</td>
                          <td>{visitor.version}</td>
                          <td>{visitor.os}</td>
                          <td>{visitor.platform}</td>
                          <td>{visitor.engine}</td>
                          <td>{visitor.ipAddress}</td>
                          <td>{new Date(visitor.visitedAt).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Browser</th>
                        <th>Version</th>
                        <th>OS</th>
                        <th>Platform</th>
                        <th>Engine</th>
                        <th>IP Address</th>
                        <th>Visited At</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
    </div>
  );
}

export default Visittors;
