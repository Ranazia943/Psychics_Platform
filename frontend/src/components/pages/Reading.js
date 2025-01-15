import React, { useState } from 'react';
import '../assets/style.css'
const Psychics_profile = () => {

  const [activeTab, setActiveTab] = useState('Activity');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  return (
    <div className='container' data-aos="fade-right">
      <section className="content">
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-3">
        {/* Profile Image */}
        <div className="card card-primary card-outline">
          <div className="card-body box-profile">
            <div className="text-center">
              <img className="profile-user-img img-fluid img-circle" src="../../dist/img/user4-128x128.jpg" alt="User profile picture" />
            </div>
            <h3 className="profile-username text-center">Nina Mcintire</h3>
            <p className="text-muted text-center">Love & Relationships
Destiny & Life Path
Money & Finance</p>
            <ul className="list-group list-group-unbordered mb-3">
              <li className="list-group-item">
                <b style={{color:'#636363'}}>Ratings</b> <a className="float-right" style={{fontSize:'1em'}}>1,322</a>
              </li>
              <li className="list-group-item">
                <b style={{color:'#636363'}}>Total Readings</b> <a className="float-right" style={{fontSize:'1em'}}>543</a>
              </li>
              <li className="list-group-item">
                <b style={{color:'#636363'}}>Rate/Mins</b> <a className="float-right" style={{fontSize:'1em'}}>13,287</a>
              </li>
            </ul>
            <a href="#" className="btn btn-block" style={{background:'#ff6000', color:'#fff'}}><b> Chat </b></a>
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
        {/* About Me Box */}
        <div className="card">
          <div className="card-header" style={{background:'#ff6000'}}>
            <h3 className="card-title" style={{color:'#fff'}}>About Me</h3>
          </div>
          {/* /.card-header */}
          <div className="card-body">
            <strong style={{color:'#636363'}}><i className="fas fa-book mr-1" /> Topics</strong>
            <p className="text-muted">
            Love & Relationships
Destiny & Life Path
Money & Finance </p>
            <hr />
            <strong style={{color:'#636363'}} ><i className="fas fa-map-marker-alt mr-1" /> Tools</strong>
            <p className="text-muted">Tarot
Crystals</p>
            <hr />
            <strong style={{color:'#636363'}}><i className="fas fa-pencil-alt mr-1" /> Styles</strong>
            
             <p className='text-muted'>Compassionate</p>
            
            <hr />
            <strong style={{color:'#636363'}}><i className="far fa-file-alt mr-1" /> Abilities</strong>
            <p className="text-muted">Empath, Medium,  Channeling</p>
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </div>
      {/* /.col */}
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
                    <img className="img-circle img-bordered-sm" src="../../dist/img/user4-128x128.jpg" alt="User Image" />
                    <span className="username">
                      <a href="#" className='psychics_profile_details'>Nina Mcintire</a>
                      <a href="#" className="float-right btn-tool"></a>
                    </span>
                    </div>
                  {/* /.user-block */}
                  <p>
                  Nina has been reading professionally for 10 years. Her psychic intuition tunes her into her caller’s energies, feelings, emotions, spiritual guides. Through Tarot Cards, Spirit Guides, and Angel Cards, she receives confirmations during readings. As a Channeling and Empath, she uses her psychic abilities to guide her callers on a directional pathway. She aims to be honest, nonjudgmental, empathetic, and a good listener. Her experience in counseling allows her to bring a unique perspective with guidance and direction. She specializes in love, relationship, career, and financial readings.

                  </p>
                 
                </div>
          <div className="col-md-12">
  {/* Box Comment */}
  <div className="card card-widget">
    <div className="card-header" style={{background:'#ff6000'}}>
      <div className="user-block">
        <span className="username-testimonials"><a href="#">Testimonials</a></span>
        </div>
      {/* /.user-block */}
      <div className="card-tools">
      
        <button type="button" className="btn btn-tool" data-card-widget="collapse" style={{color:'#fff'}}>
          <i className="fas fa-minus" />
        </button>
      
      </div>
      {/* /.card-tools */}
    </div>
    {/* /.card-header */}
   
    {/* /.card-body */}
    <div className="card-footer card-comments">
      <div className="card-comment">
        {/* User image */}
        <img className="img-circle img-sm" src="../dist/img/user3-128x128.jpg" alt="User Image" />
        <div className="comment-text">
          <span className="username">
            Maria Gonzales
            <span className="text-muted float-right">8:03 PM Today</span>
          </span>{/* /.username */}
          
  
  <div class="stars">
    <label for="star5">★</label>
    <label for="star4">★</label>
    <label for="star3">★</label>
    <label for="star2">★</label>
    <label for="star1">★</label>
  </div>



          It is a long established fact that a reader will be distracted
          by the readable content of a page when looking at its layout.
        </div>
        {/* /.comment-text */}
      </div>
      <div className="card-comment">
        {/* User image */}
        <img className="img-circle img-sm" src="../dist/img/user3-128x128.jpg" alt="User Image" />
        <div className="comment-text">
          <span className="username">
            Maria Gonzales
            <span className="text-muted float-right">8:03 PM Today</span>
          </span>{/* /.username */}
          <div class="stars">
    <label for="star5">★</label>
    <label for="star4">★</label>
    <label for="star3">★</label>
    <label for="star2">★</label>
    <label for="star1">★</label>
  </div>
          It is a long established fact that a reader will be distracted
          by the readable content of a page when looking at its layout.
        </div>
        {/* /.comment-text */}
      </div><div className="card-comment">
        {/* User image */}
        <img className="img-circle img-sm" src="../dist/img/user3-128x128.jpg" alt="User Image" />
        <div className="comment-text">
          <span className="username">
            Maria Gonzales
            <span className="text-muted float-right">8:03 PM Today</span>
          </span>{/* /.username */}
          <div class="stars">
    <label for="star5">★</label>
    <label for="star4">★</label>
    <label for="star3">★</label>
    <label for="star2">★</label>
    <label for="star1">★</label>
  </div>
          It is a long established fact that a reader will be distracted
          by the readable content of a page when looking at its layout.
        </div>
        {/* /.comment-text */}
      </div><div className="card-comment">
        {/* User image */}
        <img className="img-circle img-sm" src="../dist/img/user3-128x128.jpg" alt="User Image" />
        <div className="comment-text">
          <span className="username">
            Maria Gonzales
            <span className="text-muted float-right">8:03 PM Today</span>
          </span>{/* /.username */}
          <div class="stars">
    <label for="star5">★</label>
    <label for="star4">★</label>
    <label for="star3">★</label>
    <label for="star2">★</label>
    <label for="star1">★</label>
  </div>
          It is a long established fact that a reader will be distracted
          by the readable content of a page when looking at its layout.
        </div>
        {/* /.comment-text */}
      </div>
      {/* /.card-comment */}
      <div className="card-comment">
        {/* User image */}
        <img className="img-circle img-sm" src="../dist/img/user5-128x128.jpg" alt="User Image" />
        <div className="comment-text">
          <span className="username">
            Nora Havisham
            <span className="text-muted float-right">8:03 PM Today</span>
          </span>{/* /.username */}
          <div class="stars">
    <label for="star5">★</label>
    <label for="star4">★</label>
    <label for="star3">★</label>
    <label for="star2">★</label>
    <label for="star1">★</label>
  </div>
          The point of using Lorem Ipsum is that it hrs a morer-less
          normal distribution of letters, as opposed to using
          'Content here, content here', making it look like readable English.
        </div>
        {/* /.comment-text */}
      </div>
      {/* /.card-comment */}
    </div>
    {/* /.card-footer */}
    <div className="card-footer">
      <form action="#" method="post">
        <img className="img-fluid img-circle img-sm" src="../dist/img/user4-128x128.jpg" alt="Alt Text" />
        {/* .img-push is used to add margin to elements next to floating images */}
        <div className="img-push">
          <input type="text" className="form-control form-control-sm" placeholder="Press enter to post comment" />
        </div>
      </form>
    </div>
    {/* /.card-footer */}
  </div>
  {/* /.card */}
</div>

                
                {/* /.post */}
                {/* Post */}
                
                {/* /.post */}
                {/* Post */}
              
                {/* /.post */}
              </div>
 )}
              
              {/* /.tab-pane */}
              {activeTab === 'timeline' && (
            <div className="tab-pane active">
                {/* The timeline */}
                <div className="timeline timeline-inverse">
                  {/* timeline time label */}
                  <div className="time-label">
        
                  </div>
                  {/* /.timeline-label */}
                  {/* timeline item */}
                  <div data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine">
                    <i className="fas fa-star" style={{background:'#90009d',color:'#fff'}}></i>
                    <div className="timeline-item">
                      <h3 className="timeline-header"><a href="#" style={{textDecoration:'none',color:'gray'}}>Talent</a></h3>
                      <div className="timeline-body">
                      <p className='add_favorite'> <i className="fas fa-star" />  Rising Talent</p> 
                      <a href="" className='add_favorite'> <p>   <i className="fas fa-heart"/>      Add to Favourite</p></a>
                      </div>
                      <div className="timeline-footer">
                        <a href="#" className="btn btn-sm" style={{background:'#90009d'}}>Message</a>
                        <a href="#" className="btn btn-sm"style={{background:'#90009d'}}>Call</a>
                      </div>
                    </div>
                  </div>
                  {/* END timeline item */}
                  {/* timeline item */}
                  <div>
                    <i className="fas fa-calendar" style={{background:'#90009d',color:'#fff'}}/>
                    <div className="timeline-item">
                      <span className="time"><i className="far fa-clock" /> 5 mins ago</span>
                      <h6 className='sheduale-heading'>  Sheduales</h6>
                      
           <div className="calendar-container">
  <div className="calendar">
    <div className="front">
      <div className="current-date">
        
       <span className='total-appointment'> Date:</span> <p>Saturday , October 28,2023</p> 
       <span className='total-appointment'> Hours :</span>  <p> 5:00am - 9:00pm </p>
       
      </div>
      <div className="current-month">
        <ul className="week-days">
          <li>MON</li>
          <li>TUE</li>
          <li>WED</li>
          <li>THU</li>
          <li>FRI</li>
          <li>SAT</li>
          <li>SUN</li>
        </ul>
        <div className="weeks">
          <div className="first">
            <span className="last-month">28</span>
            <span className="last-month">29</span>
            <span className="last-month">30</span>
            <span className="last-month">31</span>
            <span>01</span>
            <span>02</span>
            <span>03</span>
          </div>
          <div className="second">
            <span>04</span>
            <span>05</span>
            <span className="event">06</span>
            <span>07</span>
            <span>08</span>
            <span>09</span>
            <span>10</span>
          </div>
          <div className="third">
            <span>11</span>
            <span>12</span>
            <span>13</span>
            <span>14</span>
            <span className="active">15</span>
            <span>16</span>
            <span>17</span>
          </div>
          <div className="fourth">
            <span>18</span>
            <span>19</span>
            <span>20</span>
            <span>21</span>
            <span>22</span>
            <span>23</span>
            <span>24</span>
          </div>
          
        </div>
      </div>
    </div>
    <div className="back">
      <input placeholder="What's the event?" />
      <div className="info">
        <div className="date">
          <p className="info-date">
            Date: <span>Jan 15th, 2016</span>
          </p>
          <p className="info-time">
            Time: <span>6:35 PM</span>
          </p>
        </div>
        <div className="address">
          <p>
            Address: <span>129 W 81st St, New York, NY</span>
          </p>
        </div>
        <div className="observations">
          <p>
            Observations: <span>Be there 15 minutes earlier</span>
          </p>
        </div>
      </div>
      <div className="actions">
        <button className="save">
          Save <i className="ion-checkmark" />
        </button>
        <button className="dismiss">
          Dismiss <i className="ion-android-close" />
        </button>
      </div>
    </div>
  </div>
</div>
<div className='appointment-container'>
<p> Still Your Appointment At this time : <span className='total-appointment'> 0</span></p>
 <button className='btn-appointment'> No Appointment Available </button> <button className='btn-appointment'> No Appointment Available </button>
</div>


                    </div>
                  </div>
                  {/* END timeline item */}
                  {/* timeline item */}
                 
                  {/* /.timeline-label */}
                  {/* timeline item */}
                
                  {/* END timeline item */}
                  <div>
                    <i className="far fa-clock bg-gray" />
                  </div>
                </div>
              </div>
               )}
              {/* /.tab-pane */}
              {activeTab === 'setting' && (
            <div className="tab-pane active">
                <form className="form-horizontal">
                  <div className="form-group row">
                    <label htmlFor="inputName" className="col-sm-2 col-form-label text-black"></label>
                    <div className="col-sm-10">
                      <input type="email" className="form-control" id="inputName" placeholder="Name" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputEmail" className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10">
                      <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
                    </div>
                  </div>
                  
                  <div className="form-group row">
                    <label htmlFor="inputExperience" className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10">
                      <textarea className="form-control" id="inputExperience" placeholder="Experience" defaultValue={""} />
                    </div>
                  </div>
                  
                 
                  <div className="form-group row">
                    <div className="offset-sm-2 col-sm-10">
                      <button type="submit" className="btn" style={{background:'#90009d', color:'#fff'}}>Submit</button>
                    </div>
                  </div>
                </form>
              </div>

)}
              {/* /.tab-pane */}
            </div>
            {/* /.tab-content */}
          </div>{/* /.card-body */}
        </div>
        {/* /.card */}
      </div>
      {/* /.col */}
    </div>
    {/* /.row */}
  </div>{/* /.container-fluid */}
</section>

    </div>
   
  )
}

export default Psychics_profile
