import React from 'react'
import avatar from '../Images/avatar.png';
import avatar2 from '../Images/avatar2.png';
import avatar3 from '../Images/avatar3.png';
import avatar4 from '../Images/avatar4.png';
import avatar5 from '../Images/avatar5.png';
import {Link} from 'react-router-dom';
const Messages = () => {
  return (
    <div>
 <div className="content-wrapper">
        
        {/* Content Header (Page header) */}
        <section className="content-header" data-aos="fade-up"
             data-aos-duration="1000">
          <div className="container-fluid">
<div className="row" data-aos="zoom-in-down">




  
  <div className="col-md-6" >
    {/* DIRECT CHAT */}
    <div className="card direct-chat direct-chat-warning">
      <div className="card-header">
      <h3 className="card-title"><span className='text-white'>Top Chat</span></h3>
        <div className="card-tools">
          <span title="3 New Messages" className="badge badge-warning">3</span>
          <button type="button" className="btn btn-tool" data-card-widget="collapse">
            <i className="fas fa-minus" />
          </button>
          <button type="button" className="btn btn-tool" title="Contacts" data-widget="chat-pane-toggle">
            <i className="fas fa-comments" />
          </button>
          <button type="button" className="btn btn-tool" data-card-widget="remove">
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
      {/* /.card-header */}
      <div className="card-body">
        {/* Conversations are loaded here */}
        <div className="direct-chat-messages">
          {/* Message. Default to the left */}
          <div className="direct-chat-msg">
            <div className="direct-chat-infos clearfix">
              <span className="direct-chat-name float-left">Alexander Pierce</span>
              <span className="direct-chat-timestamp float-right">23 Jan 2:00 pm</span>
            </div>
            {/* /.direct-chat-infos */}
            <img className="direct-chat-img" src={avatar} alt="message user image" />
            {/* /.direct-chat-img */}
            <div className="direct-chat-text">
              Is this template really for free? That's unbelievable!
            </div>
            {/* /.direct-chat-text */}
          </div>
          {/* /.direct-chat-msg */}
          {/* Message to the right */}
          <div className="direct-chat-msg right">
            <div className="direct-chat-infos clearfix">
              <span className="direct-chat-name float-right">Sarah Bullock</span>
              <span className="direct-chat-timestamp float-left">23 Jan 2:05 pm</span>
            </div>
            {/* /.direct-chat-infos */}
            <img className="direct-chat-img" src={avatar2} alt="message user image" />
            {/* /.direct-chat-img */}
            <div className="direct-chat-text">
              You better believe it!
            </div>
            {/* /.direct-chat-text */}
          </div>
          {/* /.direct-chat-msg */}
          {/* Message. Default to the left */}
          <div className="direct-chat-msg">
            <div className="direct-chat-infos clearfix">
              <span className="direct-chat-name float-left">Alexander Pierce</span>
              <span className="direct-chat-timestamp float-right">23 Jan 5:37 pm</span>
            </div>
            {/* /.direct-chat-infos */}
            <img className="direct-chat-img" src={avatar} alt="message user image" />
            {/* /.direct-chat-img */}
            <div className="direct-chat-text">
              Working with AdminLTE on a great new app! Wanna join?
            </div>
            {/* /.direct-chat-text */}
          </div>
          {/* /.direct-chat-msg */}
          {/* Message to the right */}
          <div className="direct-chat-msg right">
            <div className="direct-chat-infos clearfix">
              <span className="direct-chat-name float-right">Sarah Bullock</span>
              <span className="direct-chat-timestamp float-left">23 Jan 6:10 pm</span>
            </div>
            {/* /.direct-chat-infos */}
            <img className="direct-chat-img" src={avatar2} alt="message user image" />
            {/* /.direct-chat-img */}
            <div className="direct-chat-text">
              I would love to.
            </div>
            {/* /.direct-chat-text */}
          </div>
          {/* /.direct-chat-msg */}
        </div>
        {/*/.direct-chat-messages*/}
        {/* Contacts are loaded here */}
        <div className="direct-chat-contacts">
          <ul className="contacts-list">
            <li>
              <a href="#">
                <img className="contacts-list-img" src={avatar} alt="User Avatar" />
                <div className="contacts-list-info">
                  <span className="contacts-list-name">
                    Count Dracula
                    <small className="contacts-list-date float-right">2/28/2015</small>
                  </span>
                  <span className="contacts-list-msg">How have you been? I was...</span>
                </div>
                {/* /.contacts-list-info */}
              </a>
            </li>
            {/* End Contact Item */}
            <li>
              <a href="#">
                <img className="contacts-list-img" src={avatar2} alt="User Avatar" />
                <div className="contacts-list-info">
                  <span className="contacts-list-name">
                    Sarah Doe
                    <small className="contacts-list-date float-right">2/23/2015</small>
                  </span>
                  <span className="contacts-list-msg">I will be waiting for...</span>
                </div>
                {/* /.contacts-list-info */}
              </a>
            </li>
            {/* End Contact Item */}
            <li>
              <a href="#">
                <img className="contacts-list-img" src={avatar3} alt="User Avatar" />
                <div className="contacts-list-info">
                  <span className="contacts-list-name">
                    Nadia Jolie
                    <small className="contacts-list-date float-right">2/20/2015</small>
                  </span>
                  <span className="contacts-list-msg">I'll call you back at...</span>
                </div>
                {/* /.contacts-list-info */}
              </a>
            </li>
            {/* End Contact Item */}
           
            {/* End Contact Item */}
          </ul>
          {/* /.contacts-list */}
        </div>
        {/* /.direct-chat-pane */}
      </div>
      {/* /.card-body */}
      <div className="card-footer">
        <form action="#" method="post">
          <div className="input-group">
            <input type="text" name="message" placeholder="Type Message ..." className="form-control" />
            <span className="input-group-append">
              <button type="button" className="btn btn-warning">Send</button>
            </span>
          </div>
        </form>
      </div>
      {/* /.card-footer*/}
    </div>
    {/*/.direct-chat */}
  </div>





  {/* /.col */}
  <div className="col-md-6">
    {/* USERS LIST */}
    <div className="card">
      <div className="card-header">
        <h3 className="card-title"><span className='text-white'>Latest Clients</span></h3>
        <div className="card-tools">
          <span className="badge badge-danger">8 New Members</span>
          <button type="button" className="btn btn-tool" data-card-widget="collapse">
            <i className="fas fa-minus" />
          </button>
          <button type="button" className="btn btn-tool" data-card-widget="remove">
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
      {/* /.card-header */}
      <div className="card-body p-0">
        <ul className="users-list clearfix">
          <li>
            <img src={avatar} alt="User Image" />
            <a className="users-list-name" href="#">Alexander Pierce</a>
            <span className="users-list-date">Today</span>
          </li>
          <li>
            <img src={avatar2} alt="User Image" />
            <a className="users-list-name" href="#">Norman</a>
            <span className="users-list-date">Yesterday</span>
          </li>
          <li>
            <img src={avatar3} alt="User Image" />
            <a className="users-list-name" href="#">Jane</a>
            <span className="users-list-date">12 Jan</span>
          </li>
          <li>
            <img src={avatar5} alt="User Image" />
            <a className="users-list-name" href="#">John</a>
            <span className="users-list-date">12 Jan</span>
          </li>
          <li>
            <img src={avatar2} alt="User Image" />
            <a className="users-list-name" href="#">Alexander</a>
            <span className="users-list-date">13 Jan</span>
          </li>
          <li>
            <img src={avatar4} alt="User Image" />
            <a className="users-list-name" href="#">Sarah</a>
            <span className="users-list-date">14 Jan</span>
          </li>
          <li>
            <img src={avatar} alt="User Image" />
            <a className="users-list-name" href="#">Nora</a>
            <span className="users-list-date">15 Jan</span>
          </li>
          <li>
            <img src={avatar5} alt="User Image" />
            <a className="users-list-name" href="#">Nadia</a>
            <span className="users-list-date">15 Jan</span>
          </li>
        </ul>
        {/* /.users-list */}
      </div>
      {/* /.card-body */}
      <div className="card-footer text-center">
        <a href="javascript:">View All Clients</a>
      </div>
      {/* /.card-footer */}
    </div>
    {/*/.card */}
  </div>
  {/* /.col */}
</div>
      </div>
      </section>
      </div>
    </div>
  )
}

export default Messages
