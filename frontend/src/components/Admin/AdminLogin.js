import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, withRouter } from 'react-router-dom';
import { useAdminAuthContext } from '../../context/AdminAuthContext';

const AdminLogin = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAdminUser } = useAdminAuthContext();

  const handleInputErrors = (username, password) => {
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return false;
    }
    return true;
  };

  const login = async (username, password) => {
    const success = handleInputErrors(username, password);
    if (!success) return;

    setLoading(true);
    try {
      const endpoint = "/api/auth/login";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.role === 'admin') {
        localStorage.setItem("admin-user", JSON.stringify(data));
        setAdminUser(data);
        history.push("/admin/pages/Home");
      } else {
        toast.error("You do not have access to this panel");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="hold-transition login-page" data-aos="zoom-in-right">
      <div className="login-box">
        <div className="card card-outline">
          <div className="card-header text-center">
            <span className='text-white'> Admin Panel</span>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Sign in to access the admin panel</p>
            <form id="login" onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <button
                    type="submit"
                    id="login_button"
                    className="btn btn-block"
                    style={{ background: '#ff6000', color: '#fff' }}
                  >
                    {loading ? <span className='loading loading-spinner'></span> : "Login"}
                  </button>
                </div>
              </div>
            </form>
            <p className="mb-1">
              <Link to="/forgot-password">I forgot my password</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(AdminLogin);
