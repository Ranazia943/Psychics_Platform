import React, { useEffect, useState } from "react";
import "../assets/style.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Pricing = () => {
  const [pricingData, setPricingData] = useState(null); // Renamed for clarity

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const response = await axios.get("/api/pricing");
        setPricingData(response.data);
      } catch (error) {
        console.error("Error fetching pricing data:", error);
      }
    };

    fetchPricingData();
  }, []);

  if (!pricingData) {
    return <div>Loading...</div>;
  }

  const { horoscopeBanner, list1, list2, list3 } = pricingData;

  return (
    <div className="container">
      <br />
      <div className="love_banner" data-aos="zoom-in-up">
        <img src={horoscopeBanner} alt="Horoscope Banner" />
      </div>

      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Invoice</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="content" data-aos="fade-up" data-aos-duration="1500">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="callout callout-info">
                <h5>
                  <i className="fas fa-info" /> Note:
                </h5>
                Choose from one of the 20-minutes packages
              </div>

              <div className="invoice p-3 mb-3">
                {/* title row */}
                <div className="row">
                  <div className="col-12">
                    <h4>
                      <i className="fas fa-globe text-center" /> Best Deals Of
                      the World
                      <small
                        className="float-right"
                        style={{ fontSize: "0.8em" }}
                      >
                        Date: 2/10/2014
                      </small>
                    </h4>
                  </div>
                </div>

                {/* info row */}
                <div className="row invoice-info">
                  <div className="col-sm-4 invoice-col">
                    You Pay
                    <address>
                      <h4 className="pricing_price">
                        <strong>{pricingData.basic_price}</strong>
                        <br />
                      </h4>
                      Best for the curious
                      <h5 className="pricing_package"> Basic</h5>
                     
                      <span className="pricing_intro">
                        Crack open the basics, without breaking the bank
                      </span>
                    </address>
                  </div>

                  <div className="col-sm-4 invoice-col">
                    You Pay
                    <address>
                      <h4 className="pricing_price">
                        <strong>{pricingData.premium_price}</strong>
                        <br />
                      </h4>
                      Best for the curious
                      <br />
                      <h5 className="pricing_package"> Premium</h5>
                      
                      <span className="pricing_intro">
                        Crack open the basics, without breaking the bank
                      </span>
                    </address>
                  </div>

                  <div className="col-sm-4 invoice-col">
                    You Pay
                    <address>
                      <h4 className="pricing_price">
                        <strong>{pricingData.diamond_price}</strong>
                        <br />
                      </h4>
                      Best for the curious
                      <br />
                      <h5 className="pricing_package"> Diamond</h5>
                      
                      <span className="pricing_intro">
                        Crack open the basics, without breaking the bank
                      </span>
                    </address>
                  </div>
                </div>

                {/* Table row */}
                <div className="row">
                  <div className="col-12 table-responsive">
                    <table className="table table-bordered table-striped">
                      <tbody className="text-center">
                        <tr className="custom-padding-tr">
                          <td>Selection of</td>
                          {list1.map((item, index) => (
                            <td key={index}>{item}</td>
                          ))}
                        </tr>
                        <tr className="custom-padding-tr">
                          <td>Selection of</td>
                          {list2.map((item, index) => (
                            <td key={index}>{item}</td>
                          ))}
                        </tr>
                        <tr className="custom-padding-tr">
                          <td>Selection of</td>
                          {list3.map((item, index) => (
                            <td key={index}>{item}</td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="pricing_container">
                      <button className="pricing_btn_stated">
                        <Link to="/signup" className="text-white">
                          Get started
                        </Link>
                      </button>
                      <button className="pricing_btn_stated">
                        <Link to="/signup" className="text-white">
                          Get started
                        </Link>
                      </button>
                      <button className="pricing_btn_stated">
                        <Link to="/signup" className="text-white">
                          Get started
                        </Link>
                      </button>
                    </div>
                    <br />
                    <p className="paragraph_price"> {pricingData.last_para}</p>
                    <i className="text-center">
                      *Ratings and experience may vary. See specific profile for
                      exact information.
                    </i>
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

export default Pricing;
