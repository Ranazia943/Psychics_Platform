import React, { useEffect, useState } from "react";
import "../assets/style.css";
import axios from "axios";
import { useSocketContext } from "../../context/SocketContext";
import star_card from "../Images/star_card.png";
import phone_card from "../Images/phone_card.png";
import search_card from "../Images/search_card.png";
import clair from "../Images/clair.png";
import career from "../Images/career.png";
import family from "../Images/family.png";
import love from "../Images/love.png";
import tarot from "../Images/tarot.png";
import medium from "../Images/medium.png";
import { NavLink, Link } from "react-router-dom";
import experience from '../Images/experience.png'
import customer from '../Images/customer.png'

const Psychics = () => {
const [profiles, setProfiles] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const { onlineUsers } = useSocketContext();

const [faqs, setFaqs] = useState([]); // Initialize with null
const [expertPsychics, setExpertPsychics] = useState(null);

useEffect(() => {
  fetchProfiles();
}, [currentPage]);

const fetchProfiles = async () => {
  try {
    const response = await axios.get(
      `/api/profilestep2/category/Medium?page=${currentPage}&limit=6`
    );
    setProfiles(response.data.profiles);
    setCurrentPage(response.data.currentPage);
    setTotalPages(response.data.totalPages);
  } catch (error) {
    console.error("Error fetching profiles", error);
  }
};

const handlePageChange = (page) => {
  setCurrentPage(page);
};

useEffect(() => {
  const fetchFAQs = async () => {
    try {
      const response = await axios.get("/api/faqs");
      setFaqs(response.data.faqs); // Adjust according to your response structure
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  fetchFAQs();
}, []);

useEffect(() => {
  const fetchPsychicsData = async () => {
    try {
      const response = await axios.get("/api/PsyPage");
      setExpertPsychics(response.data);
    } catch (error) {
      console.error("Error fetching psychics data:", error);
    }
  };

  fetchPsychicsData();
}, []);

if (!expertPsychics) {
  return null; // Show a loading indicator or message
}

const getStatus = (profile) => {
  if (!profile || !profile.Psychics) {
    return { message: "Offline", className: "offline" }; // Default to offline if profile is invalid
  }

  // Check if the psychic is online
  if (onlineUsers.includes(profile.Psychics._id)) {
    return { message: "Online", className: "online" };
  } else {
    return { message: "Offline", className: "offline" };
  }
};
return (
  <div className="container">
    <br />
    <div className="banner" data-aos="fade-down-right">
      <div className="container">
        <div className="slider-container has-scrollbar">
          <div className="slider-item">
            <img
              src={expertPsychics.welcomeImage} // Ensure this matches your data
              alt="modern sunglasses"
              className="banner-img"
            />

            <div className="banner-content">
              <p className="banner-subtitle" data-aos="fade-right">
                Empathic Guidance
              </p>

              <h2 className="banner-title" data-aos="fade-right">
                Unlock Wisdom
              </h2>

              <p className="banner-text" data-aos="fade-left">
                starting at &dollar; <b>1</b>.00
              </p>

              <a href="#" className="banner-btn" data-aos="zoom-in">
                Starting Now
              </a>
            </div>
          </div>
        </div>
        {/* Slider of cart start from here  */}
        <div
          className="search-topics-container"
          data-aos="zoom-in"
          data-aos-easing="linear"
          data-aos-duration="1000"
        >
          <h3>Explore By Topics</h3>
          <div className="search-box-container">
            <div className="search-container">
              <Link to="/family">
                <img src={family} alt="familyName" />
              </Link>
            </div>
            <div className="search-container">
              <Link to="/love">
                <img src={love} alt="familyName" />
              </Link>
            </div>

            <div className="search-container">
            <Link to="/clair_sentient_psychics">
              <img src={clair} alt="familyName" />
              </Link>
            </div>

            <div className="search-container">
              <Link to="/psychics_medium">
                <img src={medium} alt="familyName" />
              </Link>
            </div>
            <div className="search-container">
              <Link to="/clarivoyant_psychics">
                <img src={tarot} alt="familyName" />
              </Link>
            </div>
            <div className="search-container">
              <Link to="/career_advice">
                <img src={career} alt="familyName" />
              </Link>
            </div>
            <div className="search-container"></div>
          </div>
        </div>
        {/* search container end here  */}
      </div>
    </div>

    <div className="product-box">
      <div className="product-main">
        <h2 className="title" data-aos="fade-right">
          Expert Psychics:
        </h2>
        <div className="intro" data-aos="fade-right">
          <span>{expertPsychics.expert}</span>
        </div>
        <br></br>
        <div
          className="card card-solid"
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
        >
          <div className="card-body pb-0">
            <div className="row">
        {profiles.length > 0 ? (
          profiles.map((profile) => {
const status = getStatus(profile);
return (
<div key={profile._id} className="card-column">
  <div className="card bg-light d-flex flex-fill">
    <div className="card-header-psychics">
      <span
        className={`status ${status.className}`}
        
      >
        {profile.psychic?.status}
      </span>
      <span className="icon-eye float-right">
      <NavLink to={`/Psychicsprofile/${profile.Psychics}`}>

          <i
            className="fas fa-eye"
            style={{ color: "white" }}
          ></i>
        </NavLink>
      </span>
  </div>
  <div className="card-body">
    <div className="row">
      <div className="col-7">
        <h2 className="lead">
          <b>{profile.psychic?.username}</b>
        </h2>
        <p className="text-muted text-sm">
          <b>About: </b>
          <br />
          {profile.profileStep4?.longBio || "No bio available"}
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
            ${profile.chargesPerMin}{" "}
            <del>${profile.videoChargesPerMin}</del>
          </h5>
        </div>
      </div>
    <div className="col-5 text-center">
      <img
        src={profile.psychic?.profileImage}
        alt="user-avatar"
        style={{ marginLeft: "15px" }}
        className="img-circle img-fluid"
      />
      <span className="experties">Expertise:</span>
      <span className="experties-about">
        {profile.category || "No category available"}
      </span>
    </div>
        </div>
      </div>
              <div className="card-footer">
                <div className="text-right">
                  <button className="chat-button">
                    <NavLink to="/login">
                      <span className="text-white">Chat</span>
                    </NavLink>
                  </button>
                 
                </div>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div>No profiles found.</div>
    )}
  </div>
          </div>

          <div className="card-footer">
            <nav aria-label="Contacts Page Navigation">
              <ul className="pagination justify-content-center m-0">
                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                      style={{
                        background:
                          currentPage === index + 1 ? "#ff6000" : "#fff",
                        color: currentPage === index + 1 ? "#fff" : "#000",
                      }}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
  
        
      </div>
      <br></br>
      <div className="card-body">
        <h3 className="title-package" data-aos="fade-right">
          New Customer Offer
        </h3>

        <div className="intro-packages" data-aos="fade-right">
          <span>{expertPsychics.NewCustomerOffer}</span>
        </div>
        <br></br>

        <div className="package" data-aos="fade-right">
          {/* Basic Package */}
          <div className="package-grid">
            <div className="position-relative p-3">
              <div className="ribbon-wrapper">
                <div className="ribbon">Basic</div>
              </div>
              <h6>Best for the curious.</h6> <br />
              <ul className="package-list">
                {expertPsychics.basic_list &&
                  expertPsychics.basic_list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
              </ul>
              <button
                className="package-price-btn"
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
                <Link to="/signup" className="text-white">
                  <span> New Customer Rate</span>{" "}
                  <h4> ${expertPsychics.basic}</h4>
                </Link>
              </button>
            </div>
          </div>

          {/* Medium Package */}
          <div className="package-grid">
            <div className="position-relative p-3">
              <div className="ribbon-wrapper">
                <div className="ribbon">Medium</div>
              </div>
              <h6>Best for those getting started.</h6> <br />
              <ul className="package-list">
                {expertPsychics.premium_list &&
                  expertPsychics.premium_list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
              </ul>
              <button
                className="package-price-btn"
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
                <Link to="/signup" className="text-white">
                  <span> New Customer Rate</span>{" "}
                  <h4> ${expertPsychics.premium}</h4>
                </Link>
              </button>
            </div>
          </div>

          {/* Advance Package */}
          <div className="package-grid">
            <div className="position-relative p-3">
              <div className="ribbon-wrapper">
                <div className="ribbon">Advance</div>
              </div>
              <h6>For those with big questions.</h6> <br />
              <ul className="package-list">
                {expertPsychics.advance_list &&
                  expertPsychics.advance_list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
              </ul>
              <button
                className="package-price-btn"
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
                <Link to="/signup" className="text-white">
                  <span> New Customer Rate</span>{" "}
                  <h4> ${expertPsychics.advance}</h4>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
      <div>
        <div className="why-choose" data-aos="fade-right">
          <h4>{expertPsychics.titlewhytalk}</h4>
        </div>

        {/* Testimonials Section */}
        <div className="container-choose" data-aos="fade-right">
          <div className="testimonials-box">
            {/* Testimonial */}
            <div className="testimonial">
              <h2 className="title">Experience</h2>
              <div className="testimonial-card">
                <ul>
                  
                    <li key={experience._id}>
                      <div className="experince-card">
                        <div className="experince-card-img">
                          <img
                            src={experience}
                            alt="experience"
                          />
                        </div>
                        <div className="experince-card-description">
                          <h5>experience </h5>
                          <p>let me show my experience in my field</p>
                        </div>
                      </div>
                    </li>
                
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="cta-container">
              <img
                src={expertPsychics.bannerImage}
                alt="Banner"
                className="cta-banner"
              />
              <div className="cta-content">
                <p className="discount">{expertPsychics.discountText}</p>
                <p className="cta-paragraph">
                  {expertPsychics.paragraphText}
                </p>
              </div>
            </div>

            {/* Service Section */}
            <div className="testimonial">
              <h2 className="title">Services</h2>
              <div className="testimonial-card">
                <ul>
                  
                    <li key={experience._id}>
                      <div className="experince-card">
                        <div className="experince-card-img">
                          <img
                            src={customer}
                            alt="experience"
                          />
                        </div>
                        <div className="experince-card-description">
                          <h5>Customer Support </h5>
                          <p>Our customer support is appreciatable </p>
                        </div>
                      </div>
                    </li>
                
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  Faq's start here to convert  */}
      <div className="frequntly asked questions" data-aos="fade-right">
        <div className="intro-question">
          <h4> Frequently Asked Question</h4>
        </div>
        <section className="content">
          <div className="row">
            <div className="col-12" id="accordion">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`card card-${
                    index % 2 === 0 ? "primary" : "warning"
                  } card-outline`}
                >
                  <a
                    className="d-block w-100"
                    data-toggle="collapse"
                    href={`#collapse${index + 1}`}
                  >
                    <div className="card-head card-head-custom">
                      <h4 className="card-title w-100">{`${index + 1}. ${
                        faq.question
                      }`}</h4>
                    </div>
                  </a>
                  <div
                    id={`collapse${index + 1}`}
                    className={`collapse ${index === 0 ? "show" : ""}`}
                    data-parent="#accordion"
                  >
                    <div className="card-body">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/*  Contact Favour Card  */}
        <div className="favour-card" data-aos="flip-up">
          <div className="favour-card-banner">
            <img src={phone_card} alt="phone_card" className="phone-card" />
            <h5>Unprecedented Availability </h5>
            <p>Experience unmatched accessibility with our team of expert online</p>
            <button className="favour-card-btn">
<Link to="/love" style={{ color: 'black', textDecoration: 'none' }}>
  Learn More
</Link>
</button>
          </div>
          <div className="favour-card-banner">
            <img src={search_card} alt="phone_card" className="phone-card" />
            <h5> Best Online Psychics </h5>
            <p> Connect with our top-rated online psychics who offer personalized</p>
            <button className="favour-card-btn">
<Link to="/love" style={{ color: 'black', textDecoration: 'none' }}>
  Learn More
</Link>
</button>

          </div>
          <div className="favour-card-banner">
            <img src={star_card} alt="phone_card" className="phone-card" />
            <h5>Trustworthy Psychic Evaluations </h5>
            <p> Explore genuine evaluations from clients who have experienced transformative reading</p>
            <button className="favour-card-btn">
<Link to="/love" style={{ color: 'black', textDecoration: 'none' }}>
  Learn More
</Link>
</button>
          </div>
        </div>

        {/* contact favour end here  */}

        {/* How Psychics Work */}
        <br />
        <br />
        <br />
        <div className="row" data-aos="fade-up-left">
          <div className="col-md-6">
            {/* /.card-header */}
            <div className="card-body">
              {/* we are adding the accordion ID so Bootstrap's collapse plugin detects it */}
              <div id="accordion">
                <div className="card-primary">
                  <h4> {expertPsychics.endtitle}</h4>
                  <div
                    id="collapseOne"
                    className="collapse show"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      {expertPsychics.enddescription}
                      <button className="guide-psychics-btn">
                        <Link to="/howitworks" className="text-white">
                          How it works
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /.card-body */}

            {/* /.card */}
          </div>
          {/* /.col */}
          <div className="col-md-6">
            <div className="card">
              {/* /.card-header */}
              <div className="card-body">
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <video className="d-block w-100" controls>
                        <source
                          src={expertPsychics.videoUrl}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}
          </div>

          {/* /.col */}
        </div>

        {/* How pyschics work end */}
      </div>
    </div>
  </div>
);
};

export default Psychics;
