import React, { useEffect, useState } from "react";
import "../assets/style.css";

import Horoscopes_add from "../Images/Horoscopes_add.png";
import "../assets/style.css";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Relationship = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [HoroscopesPage, setHoroscopesPage] = useState(null);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/get/relation"); // Update the URL if needed
        setHoroscopesPage(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!HoroscopesPage) {
    return <div>Loading...</div>; // You can show a loading spinner or placeholder here
  }

  const {
    y_heading,
    year,
    generalOverview,
    whatToLookForwardTo,
    whatToWatchOutFor,
    lovePredictions,
    importantDates,
  } = HoroscopesPage;

  if (!HoroscopesPage) {
    return <div>Loading...</div>; // You can show a loading spinner or placeholder here
  }

  return (
    <div className="container">
      <br />
      <div className="love_banner" data-aos="zoom-in-up">
        <img src={HoroscopesPage.horoscopeBanner} alt="love banner" />
        <div className="caption"></div>
      </div>
      <br />

      <div className="centered-row">
        <li className="Horoscope-list-btn">
          {" "}
          <NavLink to="/horoscope/capricorn">Capricorn Insight</NavLink>{" "}
        </li>
        <li className="Horoscope-list-btn">
          {" "}
          <NavLink to="/horoscope/saturn">Saturn Guidance</NavLink>
        </li>
        <li className="Horoscope-list-btn">
          {" "}
          <NavLink to="/horoscope/wisdom">Practical Wisdom</NavLink>
        </li>
        <li className="Horoscope-list-btn">
          <NavLink to="/horoscope/ambition"> Ambition Focus </NavLink>
        </li>
        <li className="Horoscope-list-btn">
          {" "}
          <NavLink to="/horoscope/earth_sign">Earth Sign Energy</NavLink>
        </li>
        <li className="Horoscope-list-btn">
          {" "}
          <NavLink to="/horoscope/life">Life Discipline</NavLink>
        </li>
        <li className="Horoscope-list-btn">
          {" "}
          <NavLink to="/horoscope/relationship">Relationship Harmony</NavLink>
        </li>
        <li className="Horoscope-list-btn">
          {" "}
          <NavLink to="/horoscope/financial">Financial Mastery</NavLink>
        </li>
        <li className="Horoscope-list-btn">
          {" "}
          <NavLink to="/horoscope/astro">Astro Blueprint</NavLink>
        </li>

        <li className="Horoscope-list-btn">
          <NavLink to="/horoscope/goal_analysis"> Goal Analysis </NavLink>
        </li>
      </div>

      <hr className="underline" style={{ color: "gray" }} />

      {/* Horoscopes start here  */}
      <section className="content" data-aos="zoom-in-down">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              {/* Profile Image */}

              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <img
                      src={Horoscopes_add}
                      alt="horoscopes"
                      className="horoscope_add"
                    />
                  </div>
                </div>
                {/* /.card-body */}
              </div>

              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <img
                      className="profile-user-img img-fluid img-circle"
                      src="../../dist/img/user4-128x128.jpg"
                      alt="User profile picture"
                    />
                  </div>
                  <h6 className="profile-name text-center"> Naninkan</h6>
                  <span
                    className="text-muted text-center"
                    style={{ fontSize: "0.7em" }}
                  >
                    Love & Relationships Destiny & Life Path Money & Finance
                  </span>
                  <ul className="list-group list-group-unbordered">
                    <li className="list-group-item">
                      <span style={{ color: "#636363", fontSize: "0.7em" }}>
                        $2.00/Min{" "}
                        <span>
                          <del> $5.00</del>{" "}
                        </span>
                      </span>{" "}
                      <a className="float-right" style={{ fontSize: "0.7em" }}>
                        {" "}
                        Rating (4.5)
                        <label for="star5">★</label>{" "}
                      </a>
                      <a
                        className="float-left"
                        style={{ fontSize: "0.7em", color: "#636363" }}
                      >
                        {" "}
                        Reading Since 2001 (4.5)
                      </a>
                    </li>
                  </ul>
                  <br />
                  <div className="btn-chat-group">
                    <a
                      href="#"
                      className="btn btn-block-chat"
                      style={{ background: "#ff6000", color: "#fff" }}
                    >
                      {" "}
                      Call{" "}
                    </a>
                    <a
                      href="#"
                      className="btn btn-block-chat"
                      style={{ background: "#ff6000", color: "#fff" }}
                    >
                      {" "}
                      Message{" "}
                    </a>
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
              {/* About Me Box */}
              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <img
                      className="profile-user-img img-fluid img-circle"
                      src="../../dist/img/user4-128x128.jpg"
                      alt="User profile picture"
                    />
                  </div>
                  <h6 className="profile-name text-center"> Naninkan</h6>
                  <span
                    className="text-muted text-center"
                    style={{ fontSize: "0.7em" }}
                  >
                    Love & Relationships Destiny & Life Path Money & Finance
                  </span>
                  <ul className="list-group list-group-unbordered">
                    <li className="list-group-item">
                      <span style={{ color: "#636363", fontSize: "0.7em" }}>
                        $2.00/Min{" "}
                        <span>
                          <del> $5.00</del>{" "}
                        </span>
                      </span>{" "}
                      <a className="float-right" style={{ fontSize: "0.7em" }}>
                        {" "}
                        Rating (4.5)
                        <label for="star5">★</label>{" "}
                      </a>
                      <a
                        className="float-left"
                        style={{ fontSize: "0.7em", color: "#636363" }}
                      >
                        {" "}
                        Reading Since 2001 (4.5)
                      </a>
                    </li>
                  </ul>
                  <br />
                  <div className="btn-chat-group">
                    <a
                      href="#"
                      className="btn btn-block-chat"
                      style={{ background: "#ff6000", color: "#fff" }}
                    >
                      {" "}
                      Call{" "}
                    </a>
                    <a
                      href="#"
                      className="btn btn-block-chat"
                      style={{ background: "#ff6000", color: "#fff" }}
                    >
                      {" "}
                      Message{" "}
                    </a>
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              <div className="card card-danger">
                <div className="card-header">
                  <h5 className="title-book">
                    {" "}
                    Get Your Personal Hyroscopes Daily
                  </h5>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-border"
                      id="exampleInputBorder"
                      placeholder="enter full name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-border border-width-2"
                      id="exampleInputBorderWidth2"
                      placeholder="enter email"
                    />
                  </div>
                  <div className="appointment-btn">
                    <button type="submit" className="btn">
                      {" "}
                      Submit
                    </button>
                  </div>
                </div>
                {/* /.card-body */}
              </div>

              {/* /.card */}
            </div>
            {/* /.col */}

            <div className="col-md-9">
              <div className="card card-tabs">
                <div className="card-header p-0">
                  <ul
                    className="nav nav-tabs"
                    id="custom-tabs-one-tab"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className={`nav-link ${
                          activeTab === "home" ? "active" : ""
                        } `}
                        onClick={() => handleTabClick("home")}
                        role="tab"
                      >
                        Daily Horoscopes
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${
                          activeTab === "profile" ? "active" : ""
                        }`}
                        onClick={() => handleTabClick("profile")}
                        role="tab"
                      >
                        Weekly Horoscopes
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${
                          activeTab === "messages" ? "active" : ""
                        }`}
                        onClick={() => handleTabClick("messages")}
                        role="tab"
                      >
                        Montly Horoscopes
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${
                          activeTab === "settings" ? "active" : ""
                        }`}
                        onClick={() => handleTabClick("settings")}
                        role="tab"
                      >
                        Yearly Horoscopes
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  {activeTab === "home" && (
                    <div className="tab-pane active">
                      <p style={{ color: "#90009d", fontWeight: "500" }}>
                        {HoroscopesPage.daily_date}
                      </p>
                      {HoroscopesPage.daily_para}
                    </div>
                  )}
                  {activeTab === "profile" && (
                    <div className="tab-pane active">
                      <p style={{ color: "#90009d", fontWeight: "500" }}>
                        {HoroscopesPage.weekly_date}
                      </p>
                      <p style={{ fontSize: "2em" }}>
                        {" "}
                        {HoroscopesPage.weekly_heading}
                      </p>
                      {HoroscopesPage.weekly_para}
                      <ul className="Horoscope-btn">
                        {/* First Row */}

                        {/* Second Row (Centered) */}
                      </ul>
                    </div>
                  )}
                  {activeTab === "messages" && (
                    <div className="tab-pane active">
                      <p style={{ fontSize: "2em" }}>
                        {HoroscopesPage.monthly_date}
                      </p>
                      {HoroscopesPage.monthly_para}
                      <ul className="Horoscope-btn">
                        {/* First Row */}

                        {/* Second Row (Centered) */}
                      </ul>
                    </div>
                  )}
                  {activeTab === "settings" && (
                    <div className="tab-pane active">
                      <p style={{ fontSize: "2em" }}>{y_heading}</p>
                      {year} <br />
                      {generalOverview}
                      <ul className="horoscope_list">
                        <h6 align="left">What You Have To Look Forward To</h6>
                        {whatToLookForwardTo.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      <ul className="horoscope_list">
                        <h6 align="left">What You Should Watch Out For</h6>
                        {whatToWatchOutFor.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      <h6 align="left">Love Predictions</h6>
                      <p>{lovePredictions}</p>
                      <h6>Important Dates</h6>
                      <p>{importantDates}</p>
                    </div>
                  )}
                </div>

                {/* /.card */}
              </div>

              <div className="centered-row">
                <li className="Horoscope-list-btn">
                  {" "}
                  <i class="fas fa-calendar-day"></i> Love Horoscope
                </li>
                <li className="Horoscope-list-btn">
                  {" "}
                  <i class="fas fa-clipboard-list"></i> Astrology Blogs
                </li>
                <li className="Horoscope-list-btn">
                  {" "}
                  <i class="fas fa-heart"></i> Chinese Horoscope
                </li>
                <li className="Horoscope-list-btn">
                  {" "}
                  <i class="fas fa-calendar-day"></i> Aries Horoscope
                </li>
                <li className="Horoscope-list-btn">
                  {" "}
                  <i class="fas fa-clipboard-list"></i> Dating Life Aries Men
                </li>
                <li className="Horoscope-list-btn">
                  {" "}
                  <i class="fas fa-heart"></i> Dating Life Aries Women
                </li>
              </div>

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
                          <h5>{HoroscopesPage.h2}</h5>
                          <div
                            id="collapseOne"
                            className="collapse show"
                            data-parent="#accordion"
                          >
                            <p className="card-text">
                              {HoroscopesPage.paragraph}
                            </p>
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
                                  src={HoroscopesPage.video}
                                  type="video/mp4"
                                />
                                Your browser does not support the video tag.
                              </video>
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
      </section>
    </div>
  );
};

export default Relationship;
