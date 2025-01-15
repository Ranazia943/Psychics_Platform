import React from 'react'
import { Link } from "react-router-dom";
import GenderCheckbox from "../users/GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup"

  const UserRegister = () => {
    const [inputs, setInputs] = useState({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  
    const { loading, signup } = useSignup();
  
    const handleCheckboxChange = (gender) => {
      setInputs({ ...inputs, gender });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await signup(inputs);
    };
  
  return (

    
    <div className="hold-transition login-page"data-aos="zoom-in-right" >
   <div className="register-box">
  <div className="card card-outline card-primary">
    <div className="card-header text-center">
      <span className='text-white'> Talktopsychics</span>
     
    </div>
    <div className="card-body">
      <p className="login-box-msg">Register a new membership</p>
      <form encType='multipart/form-data' onSubmit={handleSubmit} >

      <div className="input-group mb-3">
          <input type="email" className="form-control" placeholder="Email"  
               value={inputs.email}
               onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          
          <input type="text" className="form-control" placeholder="username" 
          value={inputs.username}
          onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
      />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user" />
            </div>
          </div>
        </div>
       
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Password" 
         value={inputs.password}
         onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>

        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Confirm Password"  
        value={inputs.confirmPassword}
        onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
      />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
       
        

        <div className="row">
         <div className='col-8 '>
        <GenderCheckbox  onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
        </div>
          <div className="col-4">
            
          <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Add User"}
						</button>      
                </div>
          {/* /.col */}
        </div>
      </form>
    
    </div>
    {/* /.form-box */}
  </div>{/* /.card */}
</div>  

    </div>
    
  )
}

export default UserRegister
