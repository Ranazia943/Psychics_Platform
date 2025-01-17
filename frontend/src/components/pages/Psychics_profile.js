import React, { useState, useEffect } from 'react';
import '../assets/style.css';
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router-dom"; // v4.4 uses withRouter HOC
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const Psychics_profile = (props) => {
  const [activeTab, setActiveTab] = useState('Activity');
  const [psychicData, setPsychicData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const psychicId = props.match.params.id;
    const fetchPsychicData = async () => {
      try {
        const response = await axios.get(`/api/profilestep2/${psychicId}`);
        setPsychicData(response.data);
        console.log('Fetched Psychic Data:', response.data);
      } catch (error) {
        console.error('Error fetching psychic data:', error);
        toast.error('Failed to fetch psychic data');
      } finally {
        setLoading(false);
      }
    };
    fetchPsychicData();
  }, [props.match.params.id]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!psychicData) {
    return <div>No data available</div>;
  }

  // Access the `data` object inside `psychicData`
  const {
    psychic,
    profile, // Note: This is `profile`, not `profileStep2`
    profileStep3,
    profileStep4,
    profileStep5,
  } = psychicData.data;


  return (
    <div className="container">

    <div className='container' data-aos="fade-right">
      <section className="content">
  <div className="container-fluid">
    <div className="row">

       <div className="col-md-3">
                     {/* Profile Image */}
                     <div className="card card-primary card-outline">
                       <div className="card-body box-profile">
                         <div className="text-center">
                           <img
                             className="profile-user-img img-fluid img-circle"
                             src={psychic?.profilePic || '../../dist/img/user4-128x128.jpg'}
                             alt="User profile picture"
                           />
                         </div>
                         <h3 className="profile-username text-center">{psychic?.username}</h3>
                         <p className="text-muted text-center">Category: {profile?.primarySkills?.join(', ') || 'No primary skills'}</p>
                         <ul className="list-group list-group-unbordered mb-3">
                           <li className="list-group-item">
                             <b style={{ color: '#636363' }}>Ratings</b>{' '}
                             <a className="float-right" style={{ fontSize: '1em' }}>
                               1,322
                             </a>
                           </li>
                           <li className="list-group-item">
                             <b style={{ color: '#636363' }}>Total Readings</b>{' '}
                             <a className="float-right" style={{ fontSize: '1em' }}>
                               543
                             </a>
                           </li>
                           <li className="list-group-item">
                             <b style={{ color: '#636363' }}>RatePermin</b>{' '}
                             <a className="float-right" style={{ fontSize: '1em' }}>
                               ${profile?.chargesPerMin}
                               <del style={{ color: 'gray', fontSize: '14px', marginRight: '10px', marginLeft: '5px' }}>
                                 {profile?.videoChargesPerMin}
                               </del>
                             </a>
                           </li>
                         </ul>
                         <NavLink to="/login" className="btn btn-block" style={{ background: '#ff6000', color: '#fff' }}>
                           <b>Chat</b>
                         </NavLink>
                       </div>
                     </div>
     
                     {/* About Me Box */}
                     <div className="card">
                       <div className="card-header" style={{ background: '#ff6000' }}>
                         <h3 className="card-title">
                           <span className="text-white">About Me</span>
                         </h3>
                       </div>
                       <div className="card-body">
                         <strong style={{ color: '#636363' }}>
                           <i className="fas fa-book mr-1" /> Primary Skills
                         </strong>
                         <p className="text-muted">{profile?.primarySkills?.join(', ') || 'No primary skills'}</p>
                         <hr />
                         <strong style={{ color: '#636363' }}>
                           <i className="fas fa-map-marker-alt mr-1" /> All Skills
                         </strong>
                         <p className="text-muted">{profile?.allSkills?.join(', ') || 'No skills'}</p>
                         <hr />
                       </div>
                     </div>
                   </div>
      <div className="col-md-9">
        <div className="card">
          <div className="card-header p-2">
            <ul className="nav nav-pills">
              <li className="nav-item"><a
                className={`nav-link ${activeTab === 'Activity'  ? 'active' : ''} `}
                onClick={() => handleTabClick('Activity')} 
                role="tab"
              >
                Profile
              </a></li>
              <li className="nav-item"> <a
                className={`nav-link ${activeTab === 'timeline' ? 'active' : ''}`}
                onClick={() => handleTabClick('timeline')}
                role="tab"
              >
                Sheduale
              </a></li>
              <li className="nav-item"> <a
                className={`nav-link ${activeTab === 'setting' ? 'active' : ''}`}
                onClick={() => handleTabClick('setting')}
                role="tab"
              >
                Montly Horoscopes
              </a></li>
            </ul>
          </div>{/* /.card-header */}
          <div className="card-body">
            <div className="tab-content">
            {activeTab === 'Activity' && (
            <div className="tab-pane active">

                <div className="post clearfix">
                  <div className="user-block">
                    <img className="img-circle img-bordered-sm"  src= "../../dist/img/user4-128x128.jpg" />
                    <span className="username">
                      <a href="#" className='psychics_profile_details'>{psychic.username}</a>
                      <a href="#" className="float-right btn-tool"></a>
                    </span>
                    </div>
                  {/* /.user-block */}
                  <p>
                  {profileStep4.longBio}

                  </p>
                 
                </div>
                <div className="col-md-12">
      {/* Box Comment */}
      <div className="card card-widget">
        <div className="card-header" style={{ background: '#ff6000' }}>
          <div className="user-block">
            <span className="username-testimonials"><a href="#">Testimonials</a></span>
          </div>
          <div className="card-tools">
            <button type="button" className="btn btn-tool" data-card-widget="collapse">
              <span className="text-white"><i className="far fa fa-minus" /></span>
            </button>
          </div>
        </div>
        
        {/* Card Comments Section */}
        <div className="card-footer card-comments">
 
    <div>Loading comments...</div>
  
      <div className="card-comment" >
        {/* Render each comment */}
        <img className="img-circle img-sm" src="../dist/img/user3-128x128.jpg" alt="User Image" />
        <div className="comment-text">
          <span className="username">
            Rana ali
            <span className="text-muted float-right"></span>
          </span>
          <div className="stars">
           
          </div>
         Most professional man 
        </div>
      </div>
   
</div>

      </div>
    </div>

                
              
              </div>
 )}
              
              
              {activeTab === 'timeline' && (
          <div className="tab-pane active">
          {/* The timeline */}
          <div className="timeline timeline-inverse">
            {/* timeline time label */}
            <div className="time-label">
              <span className="" style={{background:'#90009d',color:'#fff'}}>Online Availability</span>
            </div>
            {/* /.timeline-label */}
            
            {/* timeline item for availability */}
            <div>
              <i className="fas fa-clock" style={{background:'#90009d',color:'#fff'}}></i>
              <div className="timeline-item">
                <h3 className="timeline-header">
                  <a href="#" style={{textDecoration:'none',color:'gray'}}>Check Online Availability</a>
                </h3>
                <div className="timeline-body">
                                {profileStep5.availability.map(availability => (
                                  <ul key={availability._id}>
                                    <li>
                                      <i className="fas fa-clock"></i>
                                      {availability.day}:
                                      <span className="time-box">{availability.fromTime} - {availability.toTime}</span>
                                    </li>
                                  </ul>
                                ))}
                              </div>
              </div>
            </div>
          </div>
        </div>
          
               )}
              {/* /.tab-pane */}
              {activeTab === 'setting' && (
            <div className="tab-pane active">
               <form className="form-horizontal" >
      <div className="form-group row">
        <label htmlFor="name" className="col-sm-2 col-form-label text-black"></label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="name"
           
            placeholder="Name"
            required
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="email" className="col-sm-2 col-form-label"></label>
        <div className="col-sm-10">
          <input
            type="email"
            className="form-control"
            id="email"
           
            placeholder="Email"
            required
          />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="experience" className="col-sm-2 col-form-label"></label>
        <div className="col-sm-10">
          <textarea
            className="form-control"
            id="experience"
           
            placeholder="Experience"
            required
          />
        </div>
      </div>

      <div className="form-group row">
        <div className="offset">
          <button type="submit" className="btn" style={{ background: '#90009d', color: '#fff', float:'left', marginLeft:'10px' }}>
            Submit
          </button>
        </div>
      </div>

      {/* Display success or error message */}
     
    </form>
              </div>

)}
             
            </div>
           
          </div>
        </div>
       
      </div>
      {/* /.col */}
    </div>
    
  </div>
</section>

    </div>
   </div>
  )
}

export default withRouter(Psychics_profile);
