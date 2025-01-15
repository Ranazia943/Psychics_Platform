import React from 'react';
import MessageContainer from '../Chatcontainer/MessageContainer';
import Sidebar from '../Chatcontainer/Sidebar';

const Chatform = () => {
  return (
    <div>
      <main className="content">
        <div className="container p-0">
          <h1 className="h3">Messages</h1>
          <div className="card">
            <div className="row g-0">
              {/* Sidebar taking up 3 columns on extra small and small devices, and 2 columns on medium and larger devices */}
              <div className="col-12 col-sm-3 col-md-3 col-lg-3">
                <Sidebar />
              </div>
              {/* MessageContainer taking up 9 columns on extra small and small devices, and 10 columns on medium and larger devices */}
              <div className="col-12 col-sm-9 col-md-9 col-lg-9">
                <MessageContainer />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chatform;
