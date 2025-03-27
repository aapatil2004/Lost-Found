//import React, { useContext, useEffect, useState } from "react";
//import { Link } from "react-router-dom";
//import AppContext from "../Context/Context";

//const Home = () => {
//  const {
//    lostData,
//    foundData,
//    isLostError,
//    isFoundError,
//    refreshLostData,
//    refreshFoundData,
//  } = useContext(AppContext);

//  const [activeTab, setActiveTab] = useState("lost");

//  useEffect(() => {
//    console.log("was here")
//    refreshLostData();
//    refreshFoundData();
//  }, [refreshLostData, refreshFoundData]);

//  if (isLostError || isFoundError) {
//    return (
//      <h2 className="text-center" style={{ padding: "18rem" }}>
//        Error loading data...
//      </h2>
//    );
//  }

//  const itemsToDisplay = activeTab === "lost" ? lostData : foundData;

//  return (
//    <div>
//      {/* Tabs for Lost and Found Items */}
//      <div
//        className="tabs"
//        style={{
//          display: "flex",
//          justifyContent: "center",
//          marginTop: "86px",
//          marginBottom: "20px",
//        }}
//      >
//        <button
//          onClick={() => setActiveTab("lost")}
//          style={{
//            padding: "10px 20px",
//            marginRight: "10px",
//            cursor: "pointer",
//            backgroundColor: activeTab === "lost" ? "#007bff" : "#f8f9fa",
//            color: activeTab === "lost" ? "white" : "black",
//            border: "1px solid #007bff",
//            borderRadius: "5px",
//          }}
//        >
//          Lost Items
//        </button>
//        <button
//          onClick={() => setActiveTab("found")}
//          style={{
//            padding: "10px 20px",
//            cursor: "pointer",
//            backgroundColor: activeTab === "found" ? "#007bff" : "#f8f9fa",
//            color: activeTab === "found" ? "white" : "black",
//            border: "1px solid #007bff",
//            borderRadius: "5px",
//          }}
//        >
//          Found Items
//        </button>
//      </div>

//      {/* Item Cards */}
//      <div
//        className="grid"
//        style={{
//          marginTop: "64px",
//          display: "grid",
//          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//          gap: "20px",
//          padding: "20px",
//        }}
//      >
//        {itemsToDisplay.length === 0 ? (
//          <h2 className="text-center" style={{ textAlign: "center" }}>
//            No {activeTab === "lost" ? "lost" : "found"} items available
//          </h2>
//        ) : (
//          itemsToDisplay.map((item) => {
//            const {
//              id,
//              itemName,
//              category,
//              locationLost,
//              dateLost,
//              timeLost,
//              color,
//              brandModel,
//              specialIdentifiers,
//              description,
//              fullName,
//              phoneNumber,
//              email,
//              imageUrl,
//            } = item;

//            return (
//              <div
//                className="card mb-3"
//                style={{
//                  width: "250px",
//                  height: "auto",
//                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//                  borderRadius: "10px",
//                  overflow: "hidden",
//                  backgroundColor: "#fff",
//                  display: "flex",
//                  flexDirection: "column",
//                }}
//                key={id}
//              >
//                <Link
//                  to={`/${activeTab === "lost" ? "lostitem" : "founditem"}/${id}`}
//                  style={{ textDecoration: "none", color: "inherit" }}
//                >
//                  <img
//                    src={imageUrl}
//                    alt={itemName}
//                    style={{
//                      width: "100%",
//                      height: "150px",
//                      objectFit: "cover",
//                      padding: "5px",
//                      margin: "0",
//                      borderRadius: "10px 10px 0 0",
//                    }}
//                  />
//                  <div
//                    className="card-body"
//                    style={{
//                      padding: "10px",
//                    }}
//                  >
//                    <h5 className="card-title" style={{ fontSize: "1.2rem" }}>
//                      {itemName.toUpperCase()}
//                    </h5>
//                    <p className="text-gray-600">
//                      <strong>Category:</strong> {category}
//                    </p>
//                    <p className="text-gray-600">
//                      <strong>Lost At:</strong> {locationLost} ({dateLost}{" "}
//                      {timeLost && `at ${timeLost}`})
//                    </p>
//                    <p className="text-gray-600">
//                      <strong>Color:</strong> {color}
//                    </p>
//                    <p className="text-gray-600">
//                      <strong>Brand/Model:</strong> {brandModel || "N/A"}
//                    </p>
//                    <p className="text-gray-600">
//                      <strong>Identifiers:</strong> {specialIdentifiers || "N/A"}
//                    </p>
//                    <p className="text-gray-600">
//                      <strong>Description:</strong> {description}
//                    </p>
//                    <p className="text-gray-600">
//                      <strong>Reported By:</strong> {fullName}
//                    </p>
//                    <p className="text-gray-600">
//                      <strong>Contact:</strong> {phoneNumber} | {email}
//                    </p>
//                  </div>
//                </Link>
//              </div>
//            );
//          })
//        )}
//      </div>
//    </div>
//  );
//};

//export default Home;

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Info, 
  Users, 
  HelpCircle, 
  ArrowLeft, 
  ArrowRight 
} from 'lucide-react';
import Slider from "react-slick";
import AppContext from "../Context/Context";
import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const {
    lostData,
    foundData,
    isLostError,
    isFoundError,
    refreshLostData,
    refreshFoundData,
  } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState("lost");

  useEffect(() => {
    refreshLostData();
    refreshFoundData();
  }, [refreshLostData, refreshFoundData]);

  if (isLostError || isFoundError) {
    return (
      <div className="error-container">
        <h2>Error loading data...</h2>
      </div>
    );
  }

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Custom arrow components for carousel
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow next-arrow`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <ArrowRight />
      </div>
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow prev-arrow`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <ArrowLeft />
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section animate-fade-in">
        <div className="hero-content">
          <h1>Lost & Found Community Platform</h1>
          <p>Connecting people, reuniting belongings</p>
          <div className="hero-ctas">
            <Link to="/report-lost-item" className="hero-cta primary">Report Lost Item</Link>
            <Link to="/report-found-item" className="hero-cta secondary">Report Found Item</Link>
          </div>
        </div>
      </section>

      {/* Items Carousel Section */}
      <section className="items-carousel-section animate-slide-up">
        <div className="tabs-container recent-tabs">
          <button
            onClick={() => setActiveTab("lost")}
            className={`tab-button ${activeTab === "lost" ? "active" : ""}`}
          >
            Lost Items
          </button>
          <button
            onClick={() => setActiveTab("found")}
            className={`tab-button ${activeTab === "found" ? "active" : ""}`}
          >
            Found Items
          </button>
        </div>

        <div className="items-carousel">
          <Slider {...carouselSettings}>
            {(activeTab === "lost" ? lostData : foundData).map((item) => (
              <div key={item.id} className="carousel-item">
                <Link 
                  to={`/${activeTab === "lost" ? "lostitem" : "founditem"}/${item.id}`} 
                  className="carousel-item-link"
                >
                  <div className="carousel-item-image">
                    <img 
                      src={item.imageUrl} 
                      alt={item.itemName} 
                      onError={(e) => {
                        e.target.src = '/default-image.png'; // Fallback image
                      }}
                    />
                  </div>
                  <div className="carousel-item-details">
                    <h3>{item.itemName.toUpperCase()}</h3>
                    <p>
                      <strong>Location:</strong> {item.locationLost || item.locationFound}
                    </p>
                    <p><strong>Category:</strong> {item.category}</p>
                    <p>
                      <strong>Date:</strong> {item.dateLost || item.dateFound}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 style={{color:"black"}}>How Our Platform Works</h2>
        <div className="how-it-works-steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Report Item</h3>
            <p>Quickly report a lost or found item with detailed information.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Search & Match</h3>
            <p>Our system helps match lost items with found items automatically.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Reconnect</h3>
            <p>Connect with the item's owner or finder through our secure platform.</p>
          </div>
        </div>
      </section>

      <section className="why-choose-section">
        <h2 style={{color:"black"}}>Why Choose Our Platform</h2>
        <div className="why-choose-grid">
          <div className="why-choose-item">
            <Users size={48} />
            <h3>Community Driven</h3>
            <p>Our platform relies on community members helping each other.</p>
          </div>
          <div className="why-choose-item">
            <HelpCircle size={48} />
            <h3>Easy to Use</h3>
            <p>Simple, intuitive interface for reporting and searching items.</p>
          </div>
          <div className="why-choose-item">
            <Info size={48} />
            <h3>Comprehensive Listings</h3>
            <p>Detailed item descriptions to improve chances of recovery.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-detail">
              <MapPin size={24} />
              <span>123 Community Street, City, Country</span>
            </div>
            <div className="contact-detail">
              <Phone size={24} />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-detail">
              <Mail size={24} />
              <span>support@lostandfound.com</span>
            </div>
          </div>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;