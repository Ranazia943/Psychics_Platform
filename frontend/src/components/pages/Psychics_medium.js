import React, { useEffect, useState } from 'react'
import profile_img1 from '../Images/profile_img1.jpg';
import search_card from '../Images/search_card.png';
import star_card   from '../Images/star_card.png';
import aura_reading from '../Images/aura_reading.jpeg';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Psychics_medium = () => {

  const [MediumPage, setMediumPage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getmediumpage"); // Update the URL if needed
        setMediumPage(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!MediumPage) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="container">
        <br />
        <div className="love_banner" data-aos="zoom-in-up">
          <img src={MediumPage.MediumBanner} alt="love banner" />
        </div>
        <div className="product-box">
          <div className="product-main">
            <h2 className="title" data-aos="fade-right"></h2>
            <div className="intro" data-aos="fade-right">
              <span>{MediumPage.MediumPara}</span>
            </div>
            <br />
          </div>

          <div
            className="card card-solid"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
          ></div>

          <div
            className="row"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <div className="col-md-3">
              {/* Profile Image */}

              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <img
                      className="profile-user-img img-fluid img-circle"
                      src={profile_img1}
                      alt="User profile picture"
                    />
                  </div>

                  <h3 className="profile-username text-center">
                    Arm chard
                    <i className="fas fa-heart" style={{ color: "#940094" }} />
                  </h3>
                  <p className="text-center">
                    Promotes positive transformations in your life
                  </p>
                  <ul className="list-group list-group-unbordered">
                    <li className="list-group-item">
                      <b>Rating</b>{" "}
                      <a className="float-right" style={{ fontSize: "1em" }}>
                        293
                      </a>
                    </li>
                    <li className="list-group-item">
                      <b>Price</b>{" "}
                      <p className="float-right" style={{ fontSize: "1em" }}>
                        $ 5<del style={{ color: "gray" }}>$8.00</del>
                      </p>
                    </li>
                  </ul>
                  <div className="btn_chat_psychics">
                    <button className="btn_chat_psychics_btn"> Chat </button>
                    <button className="btn_chat_psychics_btn"> Message </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-9">
              <div className="card">
                <div className="card-header-nav">
                  <ul className="nav nav-pills">
                    <li className="nav-item">
                      <a
                        className="nav-link-nav active"
                        href="#activity"
                        data-toggle="tab"
                      >
                        Topics / Abilities
                      </a>
                    </li>
                  </ul>
                </div>
                {/* /.card-header */}
                <div className="love-card-body">
                  <div className="tab-content-love">
                    <div className="time-label">
                      <div className="joined-date">
                        {" "}
                        Joined date{" "}
                        <span className="joined-date-day">5.feb-2020</span>
                      </div>
                    </div>

                    <div className="timeline timeline-inverse">
                      <div className="tab-pane" id="timeline">
                        {/* The timeline */}
                        <div className="timeline timeline-inverse">
                          <div>
                            <i
                              className="fas fa-user-plus"
                              style={{ background: "#94009d", color: "white" }}
                            />
                            <div className="timeline-item">
                              <p
                                className="timeline-header"
                                style={{ color: "#94009d" }}
                              >
                                Abilities/Topics
                              </p>
                              <div className="timeline-body">
                                Clairvoyant Empath Dream analyst Love &
                                relationships Destiny & life path Career
                              </div>
                            </div>
                          </div>

                          <div>
                            <i
                              className="fas fa-tools"
                              style={{ background: "#94009d", color: "white" }}
                            />
                            <div className="timeline-item">
                              <span className="time">
                                <i className="far fa-clock" /> 27 mins ago
                              </span>
                              <p
                                className="timeline-header"
                                style={{ color: "#94009d" }}
                              >
                                Tools{" "}
                              </p>
                              <div className="timeline-body">
                                Tarot, Numerology, Astrology
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="visit-more-container"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <button className="visit-more">Visit More Psychics</button>
          </div>
          <div className="frequntly asked questions" data-aos="fade-right">
            <div className="intro-question">
              <h4> Frequently Asked Question</h4>
            </div>
            <section className="content">
              <div className="row">
                <div className="col-12" id="accordion">
                  <div className="card card-primary">
                    <a
                      className="d-block"
                      data-toggle="collapse"
                      href="#collapseOne"
                    >
                      <div className="card-head card-head-custom">
                        <h4 className="card-title w-100">
                          1. {MediumPage.question}
                        </h4>
                      </div>
                    </a>
                    <div
                      id="collapseOne"
                      className="collapse show"
                      data-parent="#accordion"
                    >
                      <div className="card-body">{MediumPage.answer}</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <br></br>
            <h4>Latest Blogs</h4>
            <div className="row">
              <br />
              <br />
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title" style={{ fontSize: "1.1em" }}>
                      <i
                        className="fas fa-text-width"
                        style={{ padding: "3px" }}
                      />
                      <span className="text-white">
                        {" "}
                        The Secrets to Finding Karmic Love
                      </span>
                    </h5>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body clearfix">
                    <blockquote className="quote-secondary">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer posuere erat a ante.
                      </p>
                      <small>Someone famous in </small>
                      <br />
                      <cite
                        title="Source Title"
                        style={{ color: "#ff6000", cursor: "pointer" }}
                      >
                        Read More
                      </cite>
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
                    <h3 className="card-title" style={{ fontSize: "1.1em" }}>
                      <i
                        className="fas fa-text-width"
                        style={{ padding: "3px" }}
                      />
                      <span className="text-white">
                        {" "}
                        The Secrets to Finding Karmic Love
                      </span>
                    </h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body clearfix">
                    <blockquote className="quote-secondary">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer posuere erat a ante.
                      </p>
                      <small>Someone famous in </small>
                      <br />
                      <cite
                        title="Source Title"
                        style={{ color: "#ff6000", cursor: "pointer" }}
                      >
                        Read More
                      </cite>
                    </blockquote>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title" style={{ fontSize: "1.1em" }}>
                      <i
                        className="fas fa-text-width"
                        style={{ padding: "3px" }}
                      />
                      <span className="text-white">
                        {" "}
                        The Secrets to Finding Karmic Love
                      </span>
                    </h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body clearfix">
                    <blockquote className="quote-secondary">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer posuere erat a ante.
                      </p>
                      <small>Someone famous in </small>
                      <br />
                      <cite
                        title="Source Title"
                        style={{ color: "#ff6000", cursor: "pointer" }}
                      >
                        Read More
                      </cite>
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
      </div>
    </div>
  ); 
}

export default Psychics_medium
