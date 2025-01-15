import React, { useEffect, useState } from "react";
import search_card from "../../Images/search_card.png";
import profile_img1 from "../../Images/profile_img1.jpg";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Howhelp = () => {
  const [crystalPage, setCrystalPage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/help"); // Update the URL if needed
        setCrystalPage(response.data);
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
      <div className="banner" data-aos="zoom-in-down">
        <div className="container">
          <div className="slider-container has-scrollbar">
            <div className="slider-item">
              <img
                src={crystalPage.Banner}
                alt="Banner"
                className="banner-img"
              />
            </div>
          </div>
          <br />
          <div
            className="about-content"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="400"
          >
            <h5>{crystalPage.title1}</h5>
            <p className="card-text">{crystalPage.content1}</p>
          </div>
          <br />
          <div
            className="about-content"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="400"
          >
            <h5>{crystalPage.title2}</h5>
            <p
              className="card-text"
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration="400"
            >
              {crystalPage.content2}
            </p>
          </div>
          <br />
          <div
            className="about-intro-container"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="1000"
          >
            <div className="row">
              <div className="col-md-6">
                <div className="card-body">
                  <div id="accordion">
                    <div className="card-primary">
                      <h5>{crystalPage.image_title}</h5>
                      <div
                        id="collapseOne"
                        className="collapse show"
                        data-parent="#accordion"
                      >
                        <p className="card-text">{crystalPage.image_para}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <div
                      id="carouselExampleIndicators"
                      className="carousel slide"
                      data-ride="carousel"
                    >
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <img
                            className="d-block w-100"
                            src={crystalPage.image}
                            alt="Carousel"
                            style={{ width: "170px", height: "250px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="underline">
              <div className="line"></div>
              <div className="star">&#9733;</div>
              <div className="line"></div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <div
                      id="carouselExampleIndicators"
                      className="carousel slide"
                      data-ride="carousel"
                    >
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <img
                            className="d-block w-100"
                            src={crystalPage.image1}
                            alt="Carousel"
                            style={{ width: "100px", height: "250px" }}
                          />
                        </div>
                        {/* Add more carousel items here if needed */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card-body">
                  <div id="accordion">
                    <div className="card-primary">
                      <h5>{crystalPage.image_title1}</h5>
                      <div
                        id="collapseOne"
                        className="collapse show"
                        data-parent="#accordion"
                      >
                        <p className="card-text">{crystalPage.image_para1}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="favour-card" data-aos="fade-right">
            <div className="favour-card-banner" style={{ background: "none" }}>
              <img src={search_card} alt="Phone Card" className="phone-card" />
              <h6>{crystalPage.card_title1}</h6>
              <p className="card-text">{crystalPage.card_content1}</p>
            </div>
          </div>
          <br />
          <div className="underline">
            <div className="line"></div>
            <div className="star">&#9733;</div>
            <div className="line"></div>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Howhelp;
