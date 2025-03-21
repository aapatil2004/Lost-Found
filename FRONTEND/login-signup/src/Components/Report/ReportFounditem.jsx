import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./ReportLostitem.css";

const ReportFoundItem = () => {
  const location = useLocation();
  const prefilledData = location.state || {}; // Get lost item details from state

  const [foundItem, setFoundItem] = useState({
    itemName: "",
    category: "",
    dateLost: "",
    timeLost: "",
    locationLost: "",
    color: "",
    brandModel: "",
    specialIdentifiers: "",
    description: "",
    fullName: "",
    phoneNumber: "",
    email: "",
  });

  const [image, setImage] = useState(null);

  // Prefill form when data is available
  useEffect(() => {
    if (prefilledData) {
      setFoundItem({
        itemName: prefilledData.itemName || "",
        category: prefilledData.category || "",
        dateLost: prefilledData.dateLost || "",
        timeLost: prefilledData.timeLost || "",
        locationLost: prefilledData.locationLost || "",
        color: prefilledData.color || "",
        brandModel: prefilledData.brandModel || "",
        specialIdentifiers: prefilledData.specialIdentifiers || "",
        description: prefilledData.description || "",
        fullName: prefilledData.fullName || "",
        phoneNumber: prefilledData.phoneNumber || "",
        email: prefilledData.email || "",
      });
    }
  }, [prefilledData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFoundItem({ ...foundItem, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "foundItem",
      new Blob([JSON.stringify(foundItem)], { type: "application/json" })
    );

    try {
      const response = await axios.post(
        "http://localhost:8080/api/report-found-item",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Found item notification sent successfully");
    } catch (error) {
      console.error("Error reporting to the owner", error);
      alert("Error reporting to the owner");
    }
  };

  return (
    <div className="container">
      <div className="center-container">
        <form className="row g-3 pt-5" onSubmit={submitHandler}>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Item Name</h6>
            </label>
            <input
              type="text"
              className="form-control"
              name="itemName"
              value={foundItem.itemName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              <h6>Category</h6>
            </label>
            <input
              type="text"
              className="form-control"
              name="category"
              value={foundItem.category}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              <h6>Lost Date</h6>
            </label>
            <input
              type="date"
              className="form-control"
              name="dateLost"
              value={foundItem.dateLost}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              <h6>Location Found</h6>
            </label>
            <input
              type="text"
              className="form-control"
              name="locationLost"
              value={foundItem.locationLost}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              <h6>Your Name</h6>
            </label>
            <input
              type="text"
              className="form-control"
              name="fullName"
              value={foundItem.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              <h6>Phone Number</h6>
            </label>
            <input
              type="tel"
              className="form-control"
              name="phoneNumber"
              value={foundItem.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              <h6>Email</h6>
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={foundItem.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              <h6>Upload Image</h6>
            </label>
            <input
              className="form-control"
              type="file"
              onChange={handleImageChange}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportFoundItem;
