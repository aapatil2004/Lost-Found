import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";
import axios from "../axios";
import "./LostItem.css";
const LostItem = () => {
  const { id } = useParams();
  const { refreshData } = useContext(AppContext);
  const [lostItem, setLostItem] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLostItem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/lostitem/${id}`
        );
        setLostItem(response.data);

        if (response.data.imageName) {
          fetchImage();
        }
      } catch (error) {
        console.error("Error fetching lost item:", error);
      }
    };

    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/lostitem/${id}/image`,
          { responseType: "blob" }
        );
        setImageUrl(URL.createObjectURL(response.data));
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchLostItem();
  }, [id]);

  if (!lostItem) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        No Lost Item Found
      </h2>
    );
  }

  return (
    <div
      className="containers"
      style={{ display: "flex", gap: "20px", padding: "20px" }}
    >
      {/* Image Section */}
      <img
        className="left-column-img"
        src={imageUrl || "placeholder-image-url"}
        alt={lostItem.imageName}
        style={{ width: "50%", height: "auto", borderRadius: "10px" }}
      />

      {/* Details Section */}
      <div className="right-column" style={{ width: "50%" }}>
        <div className="lost-item-description">
          <h1
            style={{
              fontSize: "2rem",
              marginBottom: "0.5rem",
              textTransform: "capitalize",
              letterSpacing: "1px",
            }}
          >
            {lostItem.itemName}
          </h1>

          <p>
            <strong>Category:</strong> {lostItem.category}
          </p>
          <p>
            <strong>Lost Date:</strong>{" "}
            {new Date(lostItem.dateLost).toLocaleDateString()}
          </p>
          <p>
            <strong>Lost Time:</strong> {lostItem.timeLost}
          </p>
          <p>
            <strong>Lost Location:</strong> {lostItem.locationLost}
          </p>
          <p>
            <strong>Color:</strong> {lostItem.color}
          </p>
          <p>
            <strong>Brand/Model:</strong> {lostItem.brandModel}
          </p>
          <p>
            <strong>Special Identifiers:</strong> {lostItem.specialIdentifiers}
          </p>
          <p>
            <strong>Description:</strong> {lostItem.description}
          </p>

          {/* Contact Information */}
          <h3>Contact Details</h3>
          <p>
            <strong>Full Name:</strong> {lostItem.fullName}
          </p>
          <p>
            <strong>Phone:</strong> {lostItem.phoneNumber}
          </p>
          <p>
            <strong>Email:</strong> {lostItem.email}
          </p>

          {/* Buttons */}
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={() =>
                navigate("/report-found-item", { state: lostItem })
              }
              style={{
                padding: "10px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Alert Owner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostItem;
