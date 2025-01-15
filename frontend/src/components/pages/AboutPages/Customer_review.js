import React from 'react';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import profile_img1 from '../../Images/profile_img1.jpg'; // Update the path to your images
import profile_img2 from '../../Images/profile_img2.jpg'; // Update the path to your images

const Customer_review = () => {
  // Dummy customer reviews data
  const customerReviews = [
    {
      id: 1,
      name: "John Doe",
      review: "Amazing experience! The psychics were very helpful and accurate.",
      rating: 5,
      image: profile_img1,
    },
    {
      id: 2,
      name: "Jane Smith",
      review: "I loved the service. It was very insightful and comforting.",
      rating: 4,
      image: profile_img2,
    },
    {
      id: 3,
      name: "Alice Johnson",
      review: "Great platform! I got the guidance I needed.",
      rating: 5,
      image: profile_img1,
    },
    {
      id: 4,
      name: "Bob Brown",
      review: "Highly recommend! The readings were spot on.",
      rating: 5,
      image: profile_img2,
    },
    {
      id: 5,
      name: "Charlie Davis",
      review: "Excellent service! Very professional and kind.",
      rating: 4,
      image: profile_img1,
    },
  ];

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", backgroundColor: "#f9f9f9", borderRadius: "10px", margin: "20px 0" }}>
      <h3 style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "bold" }}>Customer Reviews</h3>
      <Slider {...settings}>
        {customerReviews.map((review) => (
          <div
            key={review.id}
            style={{
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              margin: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <img
              src={review.image}
              alt={review.name}
              style={{ width: "80px", height: "80px", borderRadius: "50%", marginBottom: "15px" }}
            />
            <h5 style={{ margin: "10px 0", fontSize: "18px", fontWeight: "600" }}>{review.name}</h5>
            <p style={{ fontSize: "14px", color: "#555" }}>{review.review}</p>
            <div style={{ color: "#ffd700", fontSize: "20px" }}>
              {Array.from({ length: review.rating }, (_, i) => (
                <span key={i}>&#9733;</span>
              ))}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Customer_review;