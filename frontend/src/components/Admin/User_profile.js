import React from 'react';
import avatar from '../Images/avatar.png';



const User_profile = () => {
    

  return (
    <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <section className="content-header">
      <div className="container-fluid">
  
<div className="row-profile">
 
  <div className="col-12 col-sm-12">
    <div className="card card-primary card-outline card-outline-tabs">
      <div className="card-head p-0 border-bottom-0">
        <ul className="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" id="custom-tabs-four-home-tab" data-toggle="pill" href="#custom-tabs-four-home" role="tab" aria-controls="custom-tabs-four-home" aria-selected="true">Profile</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="custom-tabs-four-profile-tab" data-toggle="pill" href="#custom-tabs-four-profile" role="tab" aria-controls="custom-tabs-four-profile" aria-selected="false">Recent Activities</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="custom-tabs-four-messages-tab" data-toggle="pill" href="#custom-tabs-four-messages" role="tab" aria-controls="custom-tabs-four-messages" aria-selected="false">Payment Gateways</a>
          </li>
         
        </ul>
      </div>
      <div className="card-body">
        <div className="tab-content" id="custom-tabs-four-tabContent">
          <div className="tab-pane fade show active" id="custom-tabs-four-home" role="tabpanel" aria-labelledby="custom-tabs-four-home-tab">
          <div className="col-md-12">
                {/* Widget: user widget style 1 */}
                <div className="card card-widget widget-user">
                  {/* Add the bg color to the header using any of the bg-* classes */}
                  <div className="widget-user-header bg-orange">
                    
                    <h2 className="widget-user-desc text-white" ></h2>
                  </div>
                  <div className="widget-user-image">
                    <img className="img-circle  elevation-2" src={avatar}  style={{width:'70px', height:'70px'}}/>
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      <div className="col-sm-4 border-right">
                        <div className="description-block">
                          <h5 className="description-header">Email</h5>
                          <span className="description-text">Ninjian@gmail.com</span>
                        </div>
                        {/* /.description-block */}
                      </div>
                      {/* /.col */}
                      <div className="col-sm-4 border-right">
                        <div className="description-block">
                          <h5 className="description-header">Total Chats</h5>
                          <span className="description-text">0</span>
                        </div>
                        {/* /.description-block */}
                      </div>
                      {/* /.col */}
                      <div className="col-sm-4">
                        <div className="description-block">
                          <h5 className="description-header">Joined Date</h5>
                          <span className="description-text"> 12.03.2021</span>
                        </div>
                        {/* /.description-block */}
                      </div>
                      {/* /.col */}
                    </div>
                    {/* /.row */}
                  </div>
                </div>
                {/* /.widget-user */}
              </div>   </div>



          <div className="tab-pane fade" id="custom-tabs-four-profile" role="tabpanel" aria-labelledby="custom-tabs-four-profile-tab">
         <div className="col-12">
  
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
          <img className="img-circle img-bordered-sm" src="" alt="user image" />
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
  </div>
</div>  </div>
          <div className="tab-pane fade" id="custom-tabs-four-messages" role="tabpanel" aria-labelledby="custom-tabs-four-messages-tab">
      
          <div className="card-body">
  <div className="row">
    <div className="col-md-9">



      <div className="form-group">
<label> Payment Gateways</label>
<p> Paypal </p>
<label> Total Invest</label>
<p> $0.00 </p>

        </div>
      {/* /.form-group */}
      
      {/* /.form-group */}
    </div>
    {/* /.col */}
   
   
  </div>
  {/* /.row */}
  
  {/* /.row */}
</div>    </div>
         </div>
      </div>
      {/* /.card */}
    </div>
  </div>
</div>
</div>
</section>

</div>

   
  )
}

export default User_profile;
