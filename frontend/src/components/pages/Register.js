import React from 'react'

const Register = () => {
  return (
    <div className="hold-transition login-page">
   <div className="register-box">
  <div className="card card-outline card-primary">
    <div className="card-header text-center">
      <a href="../../index2.html" className="h1"><b>Admin</b>LTE</a>
    </div>
    <div className="card-body">
      <p className="login-box-msg">Register a new membership</p>
      <form action="../../index.html" method="post">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Full name" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="email" className="form-control" placeholder="Email" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Password" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Retype password" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <div className="icheck-primary">
              <input type="checkbox" id="agreeTerms" name="terms" defaultValue="agree" />
              <label style={{color:'#000'}}>
                I agree to the terms
              </label>
            </div>
          </div>
          {/* /.col */}
          <div className="col-4">
            <button type="submit" className="btn  btn-block" style={{background:'#ff6000' ,color:'#fff'}}>Register</button>
          </div>
          {/* /.col */}
        </div>
      </form>
      {/* <div className="social-auth-links text-center">
        <a href="#" className="btn btn-block " style={{background:'#ff6000' ,color:'#fff'}}>
          <i className="fab fa-facebook mr-2" />
          Sign up using Facebook
        </a>
        <a href="#" className="btn btn-block " style={{background:'#90009d' ,color:'#fff'}}>
          <i className="fab fa-google-plus mr-2" />
          Sign up using Google+
        </a>
      </div> */}
      <a href="login.html" className="text-center">I already have a membership</a>
    </div>
    {/* /.form-box */}
  </div>{/* /.card */}
</div>

    </div>
  )
}

export default Register
