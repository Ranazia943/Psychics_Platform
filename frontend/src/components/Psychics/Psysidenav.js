  import React, { useState, useContext } from 'react';
  import {NavLink } from 'react-router-dom';
  import logo from '../Images/logo.png';
  import { PsyAuthContext } from '../../context/PsyAuthContext';

  import usePsyLogout from '../../hooks/usePsyLogout';

  function Psysidnav() {
    const { authPsychics } = useContext(PsyAuthContext);

    
    const { loading, logout } = usePsyLogout();


    const [isDropdownOpen, setIsDropdownOpen] = useState(null);

    const toggleDropdown = (dropdownId) => {
      setIsDropdownOpen((prevId) => (prevId === dropdownId ? null : dropdownId));
    };

    return (
      <div>
        <aside className="main-sidebar elevation-4">
          {/* Brand Logo */}
          <a
            href="index3.html"
            className="brand-link"
            style={{ textDecoration: "none" }}
          >
            <img
              src={logo}
              className="brand-image img-circle elevation-3"
              alt="AdminLTE Logo"
            />
            <p>Talk To Psychics</p>
          </a>

          {/* Sidebar */}
          <div className="sidebar">
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  src={authPsychics && authPsychics.profilePic}
                  className="img-circle elevation-2"
                />
              </div>
              <div className="info">
                <a href="#" className="d-block">
                  {authPsychics && authPsychics.username}{" "}
                </a>
              </div>
            </div>

            {/* SidebarSearch Form */}
            <div className="form-inline">
              <div className="input-group" data-widget="sidebar-search">
                <input
                  className="form-control form-control-sidebar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div className="input-group-append">
                  <button className="btn btn-sidebar">
                    <i className="fas fa-search fa-fw" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                {/* Add icons to the links using the .nav-icon class with font-awesome or any other icon font library */}

                <li className="nav-item">
                  <NavLink to="/psychics/pages/Home" className="nav-link">
                    <i
                      className="far fa fa-tachometer-alt"
                      style={{ marginRight: "8px" }}
                    />
                    <p>Dashboard</p>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/psychics/pages/Profile" className="nav-link">
                    <i
                      className="far fa fa-user"
                      style={{ marginRight: "8px" }}
                    />
                    <p>Account</p>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/psychics/pages/chatlive" className="nav-link">
                    <i
                      className="fas fa-external-link-alt"
                      style={{ marginRight: "8px", color: "gray" }}
                    />
                    <p>Go Live</p>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/psychics/pages/gate_way" className="nav-link">
                    <i
                      className="far fa fa-user"
                      style={{ marginRight: "8px" }}
                    />
                    <p>Withdraw Request</p>
                  </NavLink>
                </li>

               

                <li className="nav-item">
                  <NavLink to="/psychics/pages/update_profile" className="nav-link">
                    <i
                      className="fas fa-edit"
                      style={{ marginRight: "8px", color: "gray" }}
                    />
                    <p>Update Profile</p>
                  </NavLink>
                </li>

              

                <li className="nav-item">
                  <NavLink to="/psychics/pages/feed_back" className="nav-link">
                    <i
                      className="fas fa-comment"
                      style={{ marginRight: "8px", color: "gray" }}
                    />
                    <p>Feedback</p>
                  </NavLink>
                </li>

               

                <li className="nav-item">
                  <NavLink to="#" className="nav-link">
                    <i
                      className="fas fa-sign-out-alt"
                      style={{ marginRight: "8px", color: "gray" }}
                    />
                    <p onClick={logout}>Exit</p>
                  </NavLink>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
      </div>
    );
}

export default Psysidnav;
