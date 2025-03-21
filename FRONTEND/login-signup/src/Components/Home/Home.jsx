import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";

const Home = () => {
  const { data, isError, refreshData } = useContext(AppContext);
  const [lostItems, setLostItems] = useState([]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdateLostItems = async () => {
        const updatedLostItems = await Promise.all(
          data
            .filter((item) => !item.found) // Only show items that are still lost
            .map(async (item) => {
              try {
                const response = await axios.get(
                  `http://localhost:8080/api/lostitem/${item.id}/image`,
                  { responseType: "blob" }
                );
                const imageUrl = URL.createObjectURL(response.data);
                return { ...item, imageUrl };
              } catch (error) {
                console.error(
                  "Error fetching image for item ID:",
                  item.id,
                  error
                );
                return { ...item, imageUrl: "placeholder-image-url" };
              }
            })
        );
        setLostItems(updatedLostItems);
      };

      fetchImagesAndUpdateLostItems();
    }
  }, [data]);

  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "18rem" }}>
        Error loading data...
      </h2>
    );
  }

  return (
    <div
      className="grid"
      style={{
        marginTop: "64px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
      {lostItems.length === 0 ? (
        <h2 className="text-center" style={{ textAlign: "center" }}>
          No lost items available
        </h2>
      ) : (
        lostItems.map((item) => {
          const {
            id,
            itemName,
            category,
            locationLost,
            dateLost,
            timeLost,
            color,
            brandModel,
            specialIdentifiers,
            description,
            fullName,
            phoneNumber,
            email,
            imageUrl,
          } = item;

          return (
            <div
              className="card mb-3"
              style={{
                width: "250px",
                height: "auto",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
              }}
              key={id}
            >
              <Link
                to={`/lostitem/${id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={imageUrl}
                  alt={itemName}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    padding: "5px",
                    margin: "0",
                    borderRadius: "10px 10px 0 0",
                  }}
                />
                <div
                  className="card-body"
                  style={{
                    padding: "10px",
                  }}
                >
                  <h5 className="card-title" style={{ fontSize: "1.2rem" }}>
                    {itemName.toUpperCase()}
                  </h5>
                  <p className="text-gray-600">
                    <strong>Category:</strong> {category}
                  </p>
                  <p className="text-gray-600">
                    <strong>Lost At:</strong> {locationLost} ({dateLost}{" "}
                    {timeLost && `at ${timeLost}`})
                  </p>
                  <p className="text-gray-600">
                    <strong>Contact:</strong> {phoneNumber} | {email}
                  </p>
                </div>
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Home;
