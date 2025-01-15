import React, { useEffect, useState } from 'react';
import freedom_girl from '../../Images/freedom_girl.jpg';
import search_card from '../../Images/search_card.png';
import star_card   from '../../Images/star_card.png';
import profile_img1 from '../../Images/profile_img1.jpg';
import profile_img2 from '../../Images/profile_img2.jpg';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
const About = () => {

const [crystalPage, setcrystalPage] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/about"); // Update the URL if needed
      setcrystalPage(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);

if (!crystalPage) {
  return <div>Loading...</div>;
}



  return (
    <div className="container">
      <div class="banner" data-aos="zoom-in-down">
        <div class="container">
          <h4> About TalktoPsychics</h4>
          <div class="slider-container has-scrollbar">
            <div class="slider-item">
              <img
                src={crystalPage.Banner}
                alt="modern sunglasses"
                class="banner-img"
              />

              <div class="banner-content">
                <h3 class="banner-title" data-aos="fade-right">
                  {crystalPage.Banner_title}
                </h3>

                <p
                  className="banner-text"
                  data-aos="fade-left"
                  style={{ color: "black" }}
                >
                  {crystalPage.Banner_content}
                </p>
              </div>
            </div>
          </div>
          <br></br>

          <div
            className="about-content"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="400"
          >
            <h5
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration="400"
            >
              {" "}
              {crystalPage.title1}
            </h5>
            <p className="card-text">{crystalPage.content1}</p>
          </div>
          <br />
          <br />
          <div
            className="about-content"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="400"
          >
            <h5> {crystalPage.title2}</h5>
            <p
              className="card-text"
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration="400"
            >
              {crystalPage.content2}
            </p>
          </div>

          {/*  2 div  */}
          <div
            className="about-intro-container"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="1000"
          >
            <div className="row">
              <div className="col-md-6">
                {/* /.card-header */}
                <div className="card-body">
                  {/* we are adding the accordion ID so Bootstrap's collapse plugin detects it */}
                  <div id="accordion">
                    <div className="card-primary">
                      <h5> {crystalPage.video_title}</h5>
                      <div
                        id="collapseOne"
                        className="collapse show"
                        data-parent="#accordion"
                      >
                        <p className="card-text">{crystalPage.video_para}</p>
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
                            <source src={crystalPage.video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>
                    </div>
                  </div>
                 
                </div>
                {/* /.card */}
              </div>

              {/* /.col */}
            </div>
          </div>
         

          <div className="favour-card" data-aos="fade-right">
            <div className="favour-card-banner" style={{ background: "none" }}>
              <img src={search_card} alt="phone_card" className="phone-card" />
              <h6> {crystalPage.card_title1}</h6>

              <p className="card-text">{crystalPage.card_content1}</p>
              <button className="about-btn">How to fit with </button>
            </div>

            <div className="favour-card-banner" style={{ background: "none" }}>
              <img src={star_card} alt="phone_card" className="phone-card" />
              <h6> {crystalPage.card_title2}</h6>

              <p className="card-text">{crystalPage.card_content2}</p>
              <button className="about-btn">How to fit with </button>
            </div>
          </div>

          <br />
          <br />
          {/* More psychics */}
          <div class="underline">
            <div class="line"></div>
            <div class="star">&#9733;</div>
            <div class="line"></div>
          </div>

          <br />
          <br />
          <br />
          <br />
          

          {/* More psychics end here  */}
        </div>
      </div>
    </div>
  );
}

export default About
