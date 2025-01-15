import React from 'react'

import banner2 from '../Images/banner2.png';
import clair from '../Images/clair.png';
import career from '../Images/career.png';
import family from '../Images/family.png';
import love from '../Images/love.png';
import tarot from '../Images/tarot.png';
import medium from '../Images/medium.png';
import topic from '../Images/topic.png';
const Banner = () => {
  return (
    
    <div class="banner" data-aos="zoom-in-down">

    <div class="container">

      <div class="slider-container has-scrollbar">

        

        <div class="slider-item">

          <img src={banner2} alt="modern sunglasses" class="banner-img"/>

          <div class="banner-content">

            <p class="banner-subtitle" data-aos="fade-right">Trending accessories</p>

            <h2 class="banner-title" data-aos="fade-right">Modern sunglasses</h2>

            <p class="banner-text"  data-aos="fade-left">
              starting at &dollar; <b>15</b>.00
            </p>

            <a href="#" class="banner-btn" data-aos="zoom-in">Shop now</a>

          </div>

        </div>

        <div class="slider-item">

          <img src={banner2} alt="new fashion summer sale" class="banner-img"/>

          <div class="banner-content">

            <p class="banner-subtitle">Sale Offer</p>

            <h2 class="banner-title">New fashion summer sale</h2>

            <p class="banner-text">
              starting at &dollar; <b>29</b>.99
            </p>

            <a href="#" class="banner-btn">Shop now</a>

          </div>

        </div>

      </div>
       {/* Slider of cart start from here  */}
      <div className='search-topics-container' data-aos="zoom-in"
     data-aos-easing="linear"
     data-aos-duration="1000" >
       <h3>Explore By Topics</h3>
    <div className="search-box-container">
 
   <div className='search-container'>
    <img src={family} alt="familyName" />
    </div>
    <div className='search-container'>
    <img src={love} alt="familyName" />
    </div>
    <div className='search-container'>
    <img src={clair} alt="familyName" />
    </div>
    <div className='search-container'>
    <img src={medium} alt="familyName" />
    </div>
    <div className='search-container'>
    <img src={tarot} alt="familyName" />
    </div><div className='search-container'>
    <img src={career} alt="familyName" />
    </div><div className='search-container'>
    </div>
   
  </div>
      </div>
      {/* search container end here  */}
    </div>
  </div>

  )
}

export default Banner
