import React from "react"


const UpdateProfile = () => {
  return (
   
    <div className="row wrapper">
      <div className="col-md-6">
        <form  className="shadow-lg" encType='multipart/form-data'>
          <h1 className="mt-2 mb-5 text-center purple">Update Profile</h1>
  
          <div className="form-group">
            <label htmlFor="name_field">Name</label>
            <input
              type="name"
              id="name_field"
              className="form-control"
              name='name'
             
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="email_field">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name='email'
             
            />
          </div>
  
          <div className='form-group'>
            <label htmlFor='avatar_upload'>Avatar</label>
            <div className='d-flex align-items-center'>
              <div>
                <figure className='avatar mr-3 item-rtl'>
                  <img
                    src=""
                    className='rounded-circle'
                    alt='Avatar Preview'
                  />
                </figure>
              </div>
              <div className='custom-file'>
                <input
                  type='file'
                  name='avatar'
                  className='custom-file-input'
                  id='customFile'
                 
                />
                <label className='custom-file-label' htmlFor='customFile'>
                  Choose Avatar
                </label>
              </div>
            </div>
          </div>
  
          <button type="submit" className="btn update-btn btn-block mt-4 mb-3"  >Update</button>
        </form>
      </div>
  
      <div className="col-md-6">
        <form className="shadow-lg" >
          <h2 className="mt-2 mb-5 text-center purple">Update Password</h2>
          <div className="form-group">
            <label htmlFor="old_password_field">Old Password</label>
            <input
              type="password"
              id="old_password_field"
              className="form-control"
              />
          </div>
          <div className="form-group">
            <label htmlFor="new_password_field">New Password</label>
            <input
              type="password"
              id="new_password_field"
              className="form-control"
               />
          </div>
          <button type="submit"  className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
        </form>
      </div>
    </div>

  





  )
}

export default UpdateProfile
