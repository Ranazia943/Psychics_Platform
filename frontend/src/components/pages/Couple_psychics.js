
import React, { useState } from 'react';
import '../assets/style.css';
import Horoscopes_banner from '../Images/Horoscopes_banner.png';
import profile_img1 from '../Images/profile_img1.jpg';
import search_card from '../Images/search_card.png';
import star_card   from '../Images/star_card.png';
import { NavLink } from 'react-router-dom';

import '../assets/style.css';


const Couple_psychics = () => {
  
  return(
    <div className='container'>
       <br/> 
      <div className="love_banner" data-aos="zoom-in-up">
  <img src={Horoscopes_banner} alt="love banner"/>
  <div className="caption" >
    <h4>Answers at your reach 
        <br/> 
        <strong style={{fontSize:'2em'}}> $1/Min</strong>
    </h4>
    <p>Love psychics can answer questions and give love advice! </p>
   
  </div>
  
</div>
<br/>

<div className="product-box">
             <div className="product-main">
               <h2 className="title" data-aos="fade-right">
                 
               </h2>
               <div className="intro" data-aos="fade-right">
                 <span>
                 Connect with our skilled aura reading psychics for profound insights and crystal-clear guidance. Unlock the secrets of your energy field by tapping into the expertise of our seasoned advisors. Experience clarity and enlightenment as our specialized advisors unveil the mysteries of your aura. </span>
               </div>
               <br></br>
               <div className="card card-solid" data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500" >
                 <div className="card-body pb-0">
                   <div className="row">
                     
                     <div className="card-column">
                     <div className="card bg-light d-flex flex-fill">
     <div className="card-header-psychics">
       <span className='online_status'> Online</span>
       <span className='icon-eye float-right'><NavLink to="/Psychicsprofile"><NavLink to="/Psychicsprofile"><i className='fas fa-eye' style={{ color: 'white' }}></i> </NavLink> </NavLink></span>
     </div>
   
   
                         <div className="card-body ">
                           <div className="row">
                             <div className="col-7">
                               <h2 className="lead">
                                 <b>Nichle Delok</b>
                               </h2>
                               <p className="text-muted text-sm">
                                 <b>About: </b>
                                 <br></br> Psychic with great ability to solve complicated problems of life 
                               </p>
                               <ul className="fa-ul text-muted">
                                 <li className="small">
                                   <span className="fa-li">
                                     <i className="fas fa-lg fa-comment" />
                                   </span>
                                   2300
                                 </li>
                                 <li className="small">
                                   <span className="fa-li">
                                     <i className="fas fa-lg fa-star" />
                                   </span>
                                   4.5
                                 </li>
                               </ul>
                               <div className="chat-rate-container">
                                 <h5>
                                   $4.00 <del> $8.00</del>
                                 </h5>
                               </div>
                             </div>
                             <div className="col-5 text-center">
                               
                               <img src={profile_img1} alt="user-avatar" style={{marginLeft:'15px'}}className="img-circle img-fluid"  />
                               <span className='experties'> Expertise:
                                 
                               </span>
                               <span className='experties-about'> Top Online Psychcis Reading</span>
                             </div>
                           </div>
                         </div>
                         <div className="card-footer">
                         <div className="text-right">
                             <button className='chat-button'>
                             < NavLink to="/Chatform"><span className='text-white'>Chat</span></NavLink>
                             </button>
                             <button className='profile-button'>
                            <span className='text-white'> Phone </span>
                                  </button>
                           </div>
                         </div>
                       </div>
                     </div>
                     <div className="card-column">
                     <div className="card bg-light d-flex flex-fill">
     <div className="card-header-psychics">
       <span className='busy_status'> Busy</span>
       <span className='icon-eye float-right'><NavLink to="/Psychicsprofile"><i className='fas fa-eye' style={{ color: 'white' }}></i> </NavLink></span>
     </div>
   
   
                         <div className="card-body ">
                           <div className="row">
                             <div className="col-7">
                               <h2 className="lead">
                                 <b>Nichle Delok</b>
                               </h2>
                               <p className="text-muted text-sm">
                                 <b>About: </b>
                                 <br></br> Psychic with great ability to solve complicated problems of life 
                               </p>
                               <ul className="fa-ul text-muted">
                                 <li className="small">
                                   <span className="fa-li">
                                     <i className="fas fa-lg fa-comment" />
                                   </span>
                                   2300
                                 </li>
                                 <li className="small">
                                   <span className="fa-li">
                                     <i className="fas fa-lg fa-star" />
                                   </span>
                                   4.5
                                 </li>
                               </ul>
                               <div className="chat-rate-container">
                                 <h5>
                                   $3.00 <del> $6.00</del>
                                 </h5>
                               </div>
                             </div>
                             <div className="col-5 text-center">
                               
                               <img src={profile_img1} alt="user-avatar" style={{marginLeft:'15px'}}className="img-circle img-fluid"  />
                               <span className='experties'> Expertise:
                                 
                               </span>
                               <span className='experties-about'> Top Online Psychcis Reading</span>
                             </div>
                           </div>
                         </div>
                         <div className="card-footer">
                         <div className="text-right">
                             <button className='chat-button'>
                             < NavLink to="/Chatform"><span className='text-white'>Chat</span></NavLink>
                             </button>
                             <button className='profile-button'>
                            <span className='text-white'> Phone </span>
                                  </button>
                           </div>
                         </div>
                       </div>
                     </div><div className="card-column">
                     <div className="card bg-light d-flex flex-fill">
     <div className="card-header-psychics">
       <span className='offline_status'> Offline</span>
       <span className='icon-eye float-right'><NavLink to="/Psychicsprofile"><i className='fas fa-eye' style={{ color: 'white' }}></i> </NavLink></span>
     </div>
   
   
                         <div className="card-body ">
                           <div className="row">
                             <div className="col-7">
                               <h2 className="lead">
                                 <b>Nichle Delok</b>
                               </h2>
                               <p className="text-muted text-sm">
                                 <b>About: </b>
                                 <br></br> Psychic with great ability to solve complicated problems of life 
                               </p>
                               <ul className="fa-ul text-muted">
                                 <li className="small">
                                   <span className="fa-li">
                                     <i className="fas fa-lg fa-comment" />
                                   </span>
                                   2300
                                 </li>
                                 <li className="small">
                                   <span className="fa-li">
                                     <i className="fas fa-lg fa-star" />
                                   </span>
                                   4.5
                                 </li>
                               </ul>
                               <div className="chat-rate-container">
                                 <h5>
                                   $4.00 <del> $5.00</del>
                                 </h5>
                               </div>
                             </div>
                             <div className="col-5 text-center">
                               
                               <img src={profile_img1} alt="user-avatar" style={{marginLeft:'15px'}}className="img-circle img-fluid"  />
                               <span className='experties'> Expertise:
                                 
                               </span>
                               <span className='experties-about'> Top Online Psychcis Reading</span>
                             </div>
                           </div>
                         </div>
                         <div className="card-footer">
                         <div className="text-right">
                             <button className='chat-button'>
                             < NavLink to="/Chatform"><span className='text-white'>Chat</span></NavLink>
                             </button>
                             <button className='profile-button'>
                            <span className='text-white'> Phone </span>
                                  </button>
                           </div>
                         </div>
                       </div>
                     </div>
                    
                    </div>
   
                    <div className="row">
                     
                     <div className="card-column">
                     <div className="card bg-light d-flex flex-fill">
     <div className="card-header-psychics">
       <span className='online_status'> Online</span>
       <span className='icon-eye float-right'><NavLink to="/Psychicsprofile"><i className='fas fa-eye' style={{ color: 'white' }}></i> </NavLink></span>
     </div>
   
   
                         <div className="card-body ">
                           <div className="row">
                             <div className="col-7">
                               <h2 className="lead">
                                 <b>Nichle Delok</b>
                               </h2>
                               <p className="text-muted text-sm">
                                 <b>About: </b>
                                 <br></br> Psychic with great ability to solve complicated problems of life 
                               </p>
                               <ul className="fa-ul text-muted">
                                 <li className="small">
                                   <span className="fa-li">
                                     <i className="fas fa-lg fa-comment" />
                                   </span>
                                   2300
                                 </li>
                                 <li className="small">
                                   <span className="fa-li">
                                     <i className="fas fa-lg fa-star" />
                                   </span>
                                   4.5
                                 </li>
                               </ul>
                               <div className="chat-rate-container">
                                 <h5>
                                   $4.00 <del> $8.00</del>
                                 </h5>
                               </div>
                             </div>
                             <div className="col-5 text-center">
                               
                               <img src={profile_img1} alt="user-avatar" style={{marginLeft:'15px'}}className="img-circle img-fluid"  />
                               <span className='experties'> Expertise:
                                 
                               </span>
                               <span className='experties-about'> Top Online Psychcis Reading</span>
                             </div>
                           </div>
                         </div>
                         <div className="card-footer">
                         <div className="text-right">
                             <button className='chat-button'>
                             < NavLink to="/Chatform"><span className='text-white'>Chat</span></NavLink>
                             </button>
                             <button className='profile-button'>
                            <span className='text-white'> Phone </span>
                                  </button>
                           </div>
                         </div>
                       </div>
                     </div>
                     <div className="card-column">
                     <div className="card bg-light d-flex flex-fill">
     <div className="card-header-psychics">
       <span className='busy_status'> Busy</span>
       <span className='icon-eye float-right'><NavLink to="/Psychicsprofile"><i className='fas fa-eye' style={{ color: 'white' }}></i> </NavLink></span>
     </div>
   
   
                         <div className="card-body ">
                           <div className="row">
                             <div className="col-7">
                               <h2 className="lead">
                                 <b>Nichle Delok</b>
                               </h2>
                               <p className="text-muted text-sm">
                                 <b>About: </b>
                                 <br></br> Psychic with great ability to solve complicated problems of life 
                               </p>
                               <ul className="fa-ul text-muted">
                                 <li className="small">
                                   <span className="fa-li">
                                     <i className="fas fa-lg fa-comment" />
                                   </span>
                                   2300
                                 </li>
                                 <li className="small">
                                   <span className="fa-li">
                                     <i className="fas fa-lg fa-star" />
                                   </span>
                                   4.5
                                 </li>
                               </ul>
                               <div className="chat-rate-container">
                                 <h5>
                                   $3.00 <del> $6.00</del>
                                 </h5>
                               </div>
                             </div>
                             <div className="col-5 text-center">
                               
                               <img src={profile_img1} alt="user-avatar" style={{marginLeft:'15px'}}className="img-circle img-fluid"  />
                               <span className='experties'> Expertise:
                                 
                               </span>
                               <span className='experties-about'> Top Online Psychcis Reading</span>
                             </div>
                           </div>
                         </div>
                         <div className="card-footer">
                         <div className="text-right">
                             <button className='chat-button'>
                             < NavLink to="/Chatform"><span className='text-white'>Chat</span></NavLink>
                             </button>
                             <button className='profile-button'>
                            <span className='text-white'> Phone </span>
                                  </button>
                           </div>
                         </div>
                       </div>
                     </div><div className="card-column">
                     <div className="card bg-light d-flex flex-fill">
     <div className="card-header-psychics">
       <span className='online_status'> Online</span>
       <span className='icon-eye float-right'><NavLink to="/Psychicsprofile"><i className='fas fa-eye' style={{ color: 'white' }}></i> </NavLink></span>
     </div>
   
   
                         <div className="card-body ">
                           <div className="row">
                             <div className="col-7">
                               <h2 className="lead">
                                 <b>Nichle Delok</b>
                               </h2>
                               <p className="text-muted text-sm">
                                 <b>About: </b>
                                 <br></br> Psychic with great ability to solve complicated problems of life 
                               </p>
                               <ul className="fa-ul text-muted">
                                 <li className="small">
                                   <span className="fa-li">
                                     <i className="fas fa-lg fa-comment" />
                                   </span>
                                   2300
                                 </li>
                                 <li className="small">
                                   <span className="fa-li">
                                     <i className="fas fa-lg fa-star" />
                                   </span>
                                   4.5
                                 </li>
                               </ul>
                               <div className="chat-rate-container">
                                 <h5>
                                   $4.00 <del> $5.00</del>
                                 </h5>
                               </div>
                             </div>
                             <div className="col-5 text-center">
                               
                               <img src={profile_img1} alt="user-avatar" style={{marginLeft:'15px'}}className="img-circle img-fluid"  />
                               <span className='experties'> Expertise:
                                 
                               </span>
                               <span className='experties-about'> Top Online Psychcis Reading</span>
                             </div>
                           </div>
                         </div>
                         <div className="card-footer">
                         <div className="text-right">
                             <button className='chat-button'>
                             < NavLink to="/Chatform"><span className='text-white'>Chat</span></NavLink>
                             </button>
                             <button className='profile-button'>
                            <span className='text-white'> Phone </span>
                                  </button>
                           </div>
                         </div>
                       </div>
                     </div>
                    
                    </div>
                    </div>
                 <div className="card-footer">
     <nav aria-label="Contacts Page Navigation">
       <ul className="pagination justify-content-center m-0">
         <li className="page-item"><a className="page-link" href="#"  style={{background:'#ff6000',color:'#fff'}}>1</a></li>
         <li className="page-item"><a className="page-link" href="#">2</a></li>
         <li className="page-item"><a className="page-link" href="#">3</a></li>
         <li className="page-item"><a className="page-link" href="#">4</a></li>
         <li className="page-item"><a className="page-link" href="#">5</a></li>
         <li className="page-item"><a className="page-link" href="#">6</a></li>
         <li className="page-item"><a className="page-link" href="#">7</a></li>
         <li className="page-item"><a className="page-link" href="#">8</a></li>
       </ul>
     </nav>
   </div>
               </div>
             </div>
   
     
   
   
   
   
             <div className="visit-more-container" data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000">
               <button className="visit-more">Visit More Psychics</button>
             </div>
   
   
   
   
          
  <div className='favour-card' data-aos="fade-right">
  
  <div className='favour-card-banner' style={{background:'none'}}> 
    <img src={search_card} alt="phone_card" className='phone-card'/>
    <h6> We are here to help you reach your full potential — one answer at a time.</h6>
    <p className='card-text'> Our gifted psychics have helped over 2 million people find the clarity they were seeking. Connect with us, and we’ll help you uncover insights about important matters, find love, repair relationships and get a boost on those complicated career decisions.

Need answers? It’s kind of our thing.</p>

    </div>
  <div className='favour-card-banner' style={{background:'none'}}> 
    <img src={star_card} alt="phone_card" className='phone-card'/>
    <h6> Millions of people have reached out to our psychics for accurate guidance. It’s easy to see why.</h6>
    <p className='card-text'> Our psychics earn their place within our family of advisors with every reading. No matter who you choose to have your confidential reading with, you can be sure that it will be accurate and of the highest quality.

Learn more about how we select the best psychic advisors</p>

 
</div>
    </div>
   
   
   {/*  Faq's start here to convert  */}
   <div className='frequntly asked questions'data-aos="fade-right" >
   
   <br></br>
   <h4>Latest Blogs</h4> 
<div className="row">

  <br/><br/>
  <div className="col-md-4">
    <div className="card">
      <div className="card-header">
        <h5 className="card-title" style={{fontSize:'1.1em'}}>
          <i className="fas fa-text-width" style={{padding:'3px' }} />
          <span className='text-white'>  The Secrets to Finding Karmic Love</span>
        </h5>
      </div>
      {/* /.card-header */}
    <div className="card-body clearfix">
        <blockquote className="quote-secondary">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
          <small>Someone famous in </small>
          <br/>
          <cite title="Source Title" style={{color:'#ff6000', cursor:'pointer'}}>Read More</cite>
        </blockquote>
      </div>
      {/* /.card-body */}
    </div>
    {/* /.card */}
  </div>
  {/* ./col */}
  <div className="col-md-4">
    <div className="card">
      <div className="card-header">
        <h3 className="card-title" style={{fontSize:'1.1em'}}>
          <i className="fas fa-text-width" style={{padding:'3px'}} />
          <span className='text-white'>  The Secrets to Finding Karmic Love</span>
        </h3>
      </div>
      {/* /.card-header */}
      <div className="card-body clearfix">
        <blockquote className="quote-secondary">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
          <small>Someone famous in </small>
          <br/>
          <cite title="Source Title" style={{color:'#ff6000', cursor:'pointer'}}>Read More</cite>
        </blockquote>
      </div>
      {/* /.card-body */}
    </div>
    {/* /.card */}
  </div>
  <div className="col-md-4">
    <div className="card">
      <div className="card-header">
        <h3 className="card-title" style={{fontSize:'1.1em'}}>
          <i className="fas fa-text-width" style={{padding:'3px'}} />
          <span className='text-white'>  The Secrets to Finding Karmic Love</span>
        </h3>
      </div>
      {/* /.card-header */}
      <div className="card-body clearfix">
        <blockquote className="quote-secondary">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
          <small>Someone famous in </small>
          <br/>
          <cite title="Source Title" style={{color:'#ff6000', cursor:'pointer'}}>Read More</cite>
        </blockquote>
      </div>
      {/* /.card-body */}
    </div>
    {/* /.card */}
  </div>
  {/* ./col */}
</div>
     
   
   
   {/* How pyschics work end */}
       </div>
   
     </div>








<hr className='underline' style={{color:'gray'}}/>



{/* Horoscopes ends here  */}
</div>

  )
}

export default Couple_psychics;
