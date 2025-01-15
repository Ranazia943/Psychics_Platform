import React from 'react';
import { useAuthContext } from '../../context/AuthContext';


const Profile2 = () => {
  const { authUser } = useAuthContext();


  return (
    
<div className='container' data-aos="fade-right">
      
      <div className="container-fluid">
      
       <div class="card-body">
            
            <div class="row">
              <div class="col-5 col-sm-3">
                <div class="nav flex-column nav-tabs h-100" id="vert-tabs-tab" role="tablist" aria-orientation="vertical">
                  <a class="nav-link active" id="vert-tabs-home-tab" data-toggle="pill" href="#vert-tabs-home" role="tab" aria-controls="vert-tabs-home" aria-selected="true">Profile</a>
                  <a class="nav-link" id="vert-tabs-profile-tab" data-toggle="pill" href="#vert-tabs-profile" role="tab" aria-controls="vert-tabs-profile" aria-selected="false">Recent Activitie</a>
                  <a class="nav-link" id="vert-tabs-messages-tab" data-toggle="pill" href="#vert-tabs-messages" role="tab" aria-controls="vert-tabs-messages" aria-selected="false">Wallet </a>
                  <a class="nav-link" id="vert-tabs-settings-tab" data-toggle="pill" href="#vert-tabs-settings" role="tab" aria-controls="vert-tabs-settings" aria-selected="false">Account Details</a>
                  
                  <a class="nav-link" id="vert-tabs-password-tab" data-toggle="pill" href="#vert-tabs-password" role="tab" aria-controls="vert-tabs-password" aria-selected="false">Update</a>
                
                  <button class="nav-link" role="tab" data-toggle="pill" style={{textAlign:'left'}} >
      Logout
    </button>
                </div>  
              </div>


              <div class="col-7 col-sm-9">
                <div class="tab-content" id="vert-tabs-tabContent">
                  <div class="tab-pane text-left fade show active" id="vert-tabs-home" role="tabpanel" aria-labelledby="vert-tabs-home-tab">
                  <div className="col-md-12">
                {/* Widget: user widget style 1 */}
                <div className="card card-widget widget-user">
      <div className="widget-user-header bg-orange">
        <h2 className="widget-user-desc text-white">Hello {authUser.username}</h2>
      </div>
      <div className="widget-user-image">
        <img className="img-circle elevation-2" src={authUser.profilePic} style={{ width: '100px', height: '100px' }} alt="User" />
      </div>
      <div className="card-footer">
        <div className="row">
          <div className="col-sm-4 border-right">
            <div className="description-block">
              <h5 className="description-header">Email</h5>
              <span className="description-text">{authUser.email}</span>
            </div>
          </div>
          <div className="col-sm-4 border-right">
            <div className="description-block">
              <h5 className="description-header">Total Chats</h5>
              <span className="description-text">0</span> {/* You need to fetch this data from somewhere */}
            </div>
          </div>
          <div className="col-sm-4">
            <div className="description-block">
              <h5 className="description-header">Joined Date</h5>
              <span className="description-text">{authUser.date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
                {/* /.widget-user */}
              </div> 
                  </div>
                  <div class="tab-pane fade" id="vert-tabs-profile" role="tabpanel" aria-labelledby="vert-tabs-profile-tab">
                  <div className="row">
    <div className="col-12">
      <h4>Recent Chats</h4>
      <div className="post">
        <div className="user-block">
          <img className="img-circle img-bordered-sm" src="" alt="user image" />
          <span className="username">
            <a href="#">Jonathan Burke Jr.</a>
          </span>
          <span className="description">Shared publicly - 7:45 PM today</span>
        </div>
        {/* /.user-block */}
        <p>
          Lorem ipsum represents a long-held tradition for designers,
          typographers and the like. Some people hate it and argue for
          its demise, but others ignore.
        </p>
        <p>
          <a href="#" className="link-black text-sm"><i className="fas fa-link mr-1" /> Demo File 1 v2</a>
        </p>
      </div>
      <div className="post clearfix">
        <div className="user-block">
          <img className="img-circle img-bordered-sm" src="../../dist/img/user7-128x128.jpg" alt="User Image" />
          <span className="username">
            <a href="#">Sarah Ross</a>
          </span>
          <span className="description">Sent you a message - 3 days ago</span>
        </div>
        {/* /.user-block */}
        <p>
          Lorem ipsum represents a long-held tradition for designers,
          typographers and the like. Some people hate it and argue for
          its demise, but others ignore.
        </p>
        <p>
          <a href="#" className="link-black text-sm"><i className="fas fa-link mr-1" /> Demo File 2</a>
        </p>
      </div>
      <div className="post">
        <div className="user-block">
          <img className="img-circle img-bordered-sm" src="../../dist/img/user1-128x128.jpg" alt="user image" />
          <span className="username">
            <a href="#">Jonathan Burke Jr.</a>
          </span>
          <span className="description">Shared publicly - 5 days ago</span>
        </div>
        {/* /.user-block */}
        <p>
          Lorem ipsum represents a long-held tradition for designers,
          typographers and the like. Some people hate it and argue for
          its demise, but others ignore.
        </p>
        <p>
          <a href="#" className="link-black text-sm"><i className="fas fa-link mr-1" /> Demo File 1 v1</a>
        </p>
      </div>
    </div>
  </div> </div>
                  <div class="tab-pane fade" id="vert-tabs-messages" role="tabpanel" aria-labelledby="vert-tabs-messages-tab">
                  <div className="row">
    

                  <div className="col-lg-4 col-6">
        {/* small box */}
        <div className="small-box " style={{backgroundColor: '#ff6000'}}>
          <div className="inner">
          <p className='text-white'>Balance</p>
            <h3 className='text-white'>53</h3>
            
          </div>
          <div className="icon text-white">
          <i className="ion ion">&#36;</i>
          </div>
          <a href="" className="small-box-footer">
           
             
        </a>
        </div>
      </div>
      {/* /.form-group */}
      
      {/* /.form-group */}
    </div>
    {/* /.col */}
   
   
    </div>
                  {/* Update profile  */}

                  <div class="tab-pane fade" id="vert-tabs-settings" role="tabpanel" aria-controls="vert-tabs-settings">
                  <div className="row">
     
      {/* /.col (left) */}
    <div className="col-md-9 col-sm-3">
        <div className="card card-orange">
          <div className="card-header">
            <h3 className="card-title"><span className='text-white'>Profile Information</span></h3>
          </div>
          <div className="card-body">
            {/* Date */}

            <div className="form-group">
            <label> Street</label>
              <div className="input-group">
                <div className="input-group-prepend">
                    
                  <span className="input-group-text"><i className="far fa-edit" /></span>
                </div>
                <input type="text" className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="mm/dd/yyyy" data-mask name="street" />

              </div>
              {/* /.input group */}
            </div>
            <div className="form-group">
            <label> City</label>
              <div className="input-group">
                <div className="input-group-prepend">
                    
                  <span className="input-group-text"><i className="far fa-edit" /></span>
                </div>
                <input type="text" className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="mm/dd/yyyy" data-mask name="country" />

              </div>
              {/* /.input group */}
            </div> 
            <div className="form-group">
            <label> Zip Code</label>
              <div className="input-group">
                <div className="input-group-prepend">
                    
                  <span className="input-group-text"><i className="far fa-edit" /></span>
                </div>
                <input type="text" className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="mm/dd/yyyy" data-mask name="country" />

              </div>
              {/* /.input group */}
            </div>
            <div className="form-group">
            <label> Country</label>
              <div className="input-group">
                <div className="input-group-prepend">
                    
                  <span className="input-group-text"><i className="far fa-edit" /></span>
                </div>
                <input type="text" className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="mm/dd/yyyy" data-mask name="country" />

              </div>
              {/* /.input group */}
            </div>


            <div className="form-group">
            <label> State</label>
              <div className="input-group">
                <div className="input-group-prepend">
                    
                  <span className="input-group-text"><i className="far fa-edit" /></span>
                </div>
                <input type="text" className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="mm/dd/yyyy" data-mask name="country" />

              </div>
              {/* /.input group */}
            </div>

            <div className="form-group">
            <label> Telephone</label>
              <div className="input-group">
                <div className="input-group-prepend">
                    
                  <span className="input-group-text"><i className="far fa-edit" /></span>
                </div>
                <input type="text" className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="mm/dd/yyyy" data-mask name="country" />

              </div>
              {/* /.input group */}
            </div>
            <div className="form-group">
            <label> Fax</label>
              <div className="input-group">
                <div className="input-group-prepend">
                    
                  <span className="input-group-text"><i className="far fa-edit" /></span>
                </div>
                <input type="text" className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="mm/dd/yyyy" data-mask name="country" />

              </div>
              {/* /.input group */}
            </div>
          </div>
       
        </div>
        
      </div>
    </div>



</div>

{/* update profile end here  */}

<div class="tab-pane fade" id="vert-tabs-password" role="tabpanel" aria-controls="vert-tabs-password">
                  <div className="row">
                  <div className="col-md-9 col-sm-3">
        <div className="card card-orange">
          <div className="card-header">
            <h3 className="card-title"><span className='text-white'>Profile Information</span></h3>
          </div>
          <div className="card-body">
            {/* Date */}

            <div className="form-group">
            <label> Street</label>
              <div className="input-group">
                <div className="input-group-prepend">
                    
                  <span className="input-group-text"><i className="far fa-edit" /></span>
                </div>
                <input type="text" className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="mm/dd/yyyy" data-mask name="street" />

              </div>
              {/* /.input group */}
            </div>
            <div className="form-group">
            <label> City</label>
              <div className="input-group">
                <div className="input-group-prepend">
                    
                  <span className="input-group-text"><i className="far fa-edit" /></span>
                </div>
                <input type="text" className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="mm/dd/yyyy" data-mask name="country" />

              </div>
              {/* /.input group */}
            </div> 
            <div className="form-group">
            <label> Zip Code</label>
              <div className="input-group">
                <div className="input-group-prepend">
                    
                  <span className="input-group-text"><i className="far fa-edit" /></span>
                </div>
                <input type="text" className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="mm/dd/yyyy" data-mask name="country" />

              </div>
              {/* /.input group */}
            </div>
            <div className="form-group">
            <label> Country</label>
              <div className="input-group">
                <div className="input-group-prepend">
                    
                  <span className="input-group-text"><i className="far fa-edit" /></span>
                </div>
                <input type="text" className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="mm/dd/yyyy" data-mask name="country" />

              </div>
              {/* /.input group */}
            </div>


            <div className="form-group">
            <label> State</label>
              <div className="input-group">
                <div className="input-group-prepend">
                    
                  <span className="input-group-text"><i className="far fa-edit" /></span>
                </div>
                <input type="text" className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="mm/dd/yyyy" data-mask name="country" />

              </div>
              {/* /.input group */}
            </div>

            <div className="form-group">
            <label> Telephone</label>
              <div className="input-group">
                <div className="input-group-prepend">
                    
                  <span className="input-group-text"><i className="far fa-edit" /></span>
                </div>
                <input type="text" className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="mm/dd/yyyy" data-mask name="country" />

              </div>
              {/* /.input group */}
            </div>
            <div className="form-group">
            <label> Fax</label>
              <div className="input-group">
                <div className="input-group-prepend">
                    
                  <span className="input-group-text"><i className="far fa-edit" /></span>
                </div>
                <input type="text" className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="mm/dd/yyyy" data-mask name="country" />

              </div>
              {/* /.input group */}
            </div>
          </div>
       
        </div>
        
      </div></div>
    </div>



                </div>
              </div>
            </div>
            
          </div>
    </div>
    </div>

     
    
   
  )
}

export default Profile2
