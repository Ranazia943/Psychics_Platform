import React, { useState,useEffect } from 'react';
import {
  MDBFooter,
  MDBContainer,
  
  MDBCol,
  MDBRow,

} from 'mdb-react-ui-kit';
import axios from 'axios'; // Ensure axios is installed

import appstore  from '../Images/appstore.png';
import playstore from '../Images/playstore.png';
import '../assets/style.css';
import { Link, NavLink } from 'react-router-dom';



export default function Footer() {
  const [socialMedia, setSocialMedia] = useState(null);

  // Fetch social media data when the component mounts
  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const response = await axios.get('/api/social/get'); // Update with your actual API endpoint
        setSocialMedia(response.data);
      } catch (error) {
        console.error('Error fetching social media accounts:', error);
      }
    };

    fetchSocialMedia();
  }, []);
  
  return (
    <MDBFooter className="web-footer pt-4">
      <MDBContainer className="p-0">
        <section className="">
          <MDBRow>
            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h6 className="text-uppercase">About Us</h6>

              <ul className="list-unstyled mb-0">
                <li>
                  <Link
                    to="/about"
                    className="text-title"
                    style={{
                      color: "#353535",
                      fontSize: "0.8em",
                      fontSize: "0.8em",
                    }}
                  >
                    About Talktopsychics
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Howitworks"
                    className="text-title"
                    style={{ color: "#353535", fontSize: "0.8em" }}
                  >
                    How Talktopsychics Works
                  </Link>
                </li>
                <li>
                  <Link
                    to="/help"
                    className="text-title"
                    style={{ color: "#353535", fontSize: "0.8em" }}
                  >
                    How We Help
                  </Link>
                </li>

                <li>
                  <Link
                    to="/pricing"
                    className="text-title"
                    style={{ color: "#353535", fontSize: "0.8em" }}
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h6 className="text-uppercase">Psychics</h6>

              <ul className="list-unstyled mb-0">
                <li>
                  <Link
                    to="/astrology"
                    className="text-title"
                    style={{ color: "#353535", fontSize: "0.8em" }}
                  >
                    About Psychic Readings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/psychics_medium"
                    className="text-title"
                    style={{ color: "#353535", fontSize: "0.8em" }}
                  >
                    Psychics Medium
                  </Link>
                </li>
                <li>
                  <Link
                    to="/psychics_love"
                    className="text-title"
                    style={{ color: "#353535", fontSize: "0.8em" }}
                  >
                    Love Psychics
                  </Link>
                </li>
                <li>
                  <Link
                    to="/family"
                    className="text-title"
                    style={{ color: "#353535", fontSize: "0.8em" }}
                  >
                    Family Affairs
                  </Link>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h6 className="text-uppercase">Resources</h6>

              <ul className="list-unstyled mb-0">
                <li>
                  <Link
                    to="/contact"
                    className="text-title"
                    style={{
                      color: "#353535",
                      fontSize: "0.8em",
                      fontSize: "0.8em",
                    }}
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blogs"
                    className="text-title"
                    style={{ color: "#353535", fontSize: "0.8em" }}
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <NavLink
                    to="/psychics/pages/signup"
                    className="text-title"
                    style={{ color: "#353535", fontSize: "0.8em" }}
                  >
                    Psychics Signup
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/psychics/login"
                    className="text-title"
                    style={{ color: "#353535", fontSize: "0.8em" }}
                  >
                    Psychics Signin
                  </NavLink>
                </li>
              </ul>
            </MDBCol>
            <MDBCol lg="2" md="6">
              <h6 className="text-uppercase">Get The App on</h6>

              <ul className="list-unstyled">
                <li>
                  <a className="footer-img">
                    <img src={appstore} alt="playstore " />
                    <img src={playstore} alt="playstore " />
                  </a>
                </li>
              </ul>
              <div class="menu-bottom">
              <ul className="menu-social-container">
      {socialMedia && (
        <>
          {socialMedia.facebook && (
            <li>
              <a className="social-links bg-orange" href={socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                {/* Facebook SVG */}
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                </svg>
              </a>
            </li>
          )}
          {socialMedia.instagram && (
            <li>
              <a className="social-links bg-orange" href={socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                {/* Instagram SVG */}
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4a170.1 170.1 0 0 0 75-94 336.64 336.64 0 0 1-108.2 41.2A170.1 170.1 0 0 0 672 174c-94.5 0-170.5 76.6-170.5 170.6 0 13.2 1.6 26.4 4.2 39.1-141.5-7.4-267.7-75-351.6-178.5a169.32 169.32 0 0 0-23.2 86.1c0 59.2 30.1 111.4 76 142.1a172 172 0 0 1-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4a180.6 180.6 0 0 1-44.9 5.8c-11.1 0-21.6-1.1-32.2-2.6C211 652 273.9 701.1 348.8 702.7c-58.6 45.9-132 72.9-211.7 72.9-14.3 0-27.5-.5-41.2-2.1C171.5 822 261.2 850 357.8 850 671.4 850 843 590.2 843 364.7c0-7.4 0-14.8-.5-22.2 33.2-24.3 62.3-54.4 85.5-88.2z"></path>
                </svg>
              </a>
            </li>
          )}
          {socialMedia.twitter && (
            <li>
              <a className="social-links bg-orange" href={socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                {/* Twitter SVG */}
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
                </svg>
              </a>
            </li>
          )}
          {socialMedia.linkedin && (
            <li>
              <a className="social-links bg-orange" href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                {/* LinkedIn SVG */}
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
                </svg>
              </a>
            </li>
          )}
          {socialMedia.youtube && (
            <li>
              <a className="social-links bg-orange" href={socialMedia.youtube} target="_blank" rel="noopener noreferrer">
                {/* YouTube SVG */}
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.54 6.42A2.99 2.99 0 0 0 19.78 5c-1.44-.04-4.9-.04-4.9-.04s-3.47 0-4.91.04a2.99 2.99 0 0 0-2.76 1.42C5.56 8.14 5 10.5 5 12s.56 3.86 1.21 4.58a2.99 2.99 0 0 0 2.76 1.42c1.44.04 4.91.04 4.91.04s3.46 0 4.9-.04a2.99 2.99 0 0 0 2.76-1.42C22.44 15.86 23 13.5 23 12s-.56-3.86-1.21-4.58zM10 15.63V8.37l6.5 3.63z"></path>
                </svg>
              </a>
            </li>
          )}
        </>
      )}
    </ul>
              </div>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>

      <div
        className="text-center p-4 mb-3"
        style={{ backgroundColor: "#ff6000", fontSize: "0.8em", color: "#fff" }}
      >
        ©2002-2023 Outlook Amusements, Inc. All Rights Reserved. For
        entertainment purposes only. Must be 18 years or older. Privacy Policy |
        Terms of Use | Site Map | Do Not Sell or Share My Personal Information
      </div>
    </MDBFooter>
  );
}