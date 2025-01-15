import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Howitwork = () => {
const [lovePageData, setLovePageData] = useState(null);

useEffect(() => {
  const fetchLovePageData = async () => {
    try {
      const response = await axios.get("/api/how_work");
      setLovePageData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchLovePageData();
}, []);

if (!lovePageData) {
  return <div>Loading...</div>;
}


  return (
    <div className="container">
      <div data-aos="fade-right">
        <h5 className="mb-2 mt-4">
          {" "}
          <strong>{lovePageData.title}</strong>
        </h5>
        <p className="card-text ">{lovePageData.content}</p>
        <br />
        <br />
        <br />
        <div className="row" data-aos="fade-right">
          <div className="col-lg-4 col-6">
            {/* small card */}
            <div className="small-box">
              <div className="inner">
                <h6>{lovePageData.card_title1}</h6>
              </div>
              <div className="icon">
                <i className="fas fa-check" />
              </div>
              <br />
              <br />
              <p className="card-text-para">{lovePageData.card_content1}</p>
            </div>
          </div>

          <div className="col-lg-4 col-6">
            {/* small card */}
            <div className="small-box">
              <div className="inner">
                <h6> {lovePageData.card_title2}</h6>
              </div>
              <div className="icon">
                <i className="fas fa-check" />
              </div>
              <br />
              <br />
              <p className="card-text-para">{lovePageData.card_content1}</p>
            </div>
          </div>

          <div className="col-lg-4 col-6">
            {/* small card */}
            <div className="small-box">
              <div className="inner">
                <h6>{lovePageData.card_title3}</h6>
              </div>
              <div className="icon">
                <i className="fas fa-check" />
              </div>
              <br />
              <br />
              <p className="card-text-para">
                {lovePageData.card_content3}
              </p>
            </div>
          </div>

          <br />
          <br />
          <br />
          <br />
          {/* How see psychics change your life */}
          <div className="row" data-aos="fade-up" data-aos-duration="1500">
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
                          <source src={lovePageData.video} type="video/mp4" />
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
            <div className="col-md-6">
              {/* /.card-header */}
              <div className="card-body">
                {/* we are adding the accordion ID so Bootstrap's collapse plugin detects it */}
                <div id="accordion">
                  <div className="card-primary">
                    <h4> {lovePageData.video_title}</h4>
                    <div
                      id="collapseOne"
                      className="collapse show"
                      data-parent="#accordion"
                    >
                      <p className="card-text">
                       {lovePageData.video_para}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.card-body */}

              {/* /.card */}
            </div>
            {/* /.col */}
          </div>

          {/* Ends content */}

          {/* Faq's  */}

          {/* Faq's end here  */}
        </div>
      </div>

      <div
        className="contact-container"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div className="Ready_to_connect">
          <h4> Get Ready To Started</h4>
          <p className="card-text"> Choose from our Psychics Reading</p>
          Call us at: <h5>0409-34039049-4</h5>
          <div className="work-btn" data-aos="flip-down">
            <button className="work_button">
              {" "}
              <Link to="/reading" className="text-white">
                {" "}
                Find Your Psychics{" "}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Howitwork
