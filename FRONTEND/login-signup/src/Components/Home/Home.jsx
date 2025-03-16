import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";


const Home = () => {
  const { data, isError, refreshData } = useContext(AppContext);

  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [activeTab, setActiveTab] = useState("lost"); 
  const [isError2, setIsError2] = useState(false);


useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        
        const response = await axios.get("http://localhost:8080/api/founditems");
        
        
        if (!Array.isArray(response.data)) {
          throw new Error("Fetched data is not an array");
        }

        const updatedItems = await Promise.all(
          response.data.map(async (item) => {
            try {
              const imageResponse = await axios.get(
                `http://localhost:8080/api/founditem/${item.id}/image`, 
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(imageResponse.data);
              return { ...item, imageUrl };
            } catch (imageError) {
              console.error(`Error fetching image for item ID: ${item.id}`, imageError);
              return { ...item, imageUrl: "placeholder-image-url" }; 
            }
          })
        );

       
        setFoundItems(updatedItems);
      } catch (error) {
        setIsError2(true);
        console.error("Error fetching found items:", error);
      }
    };

    fetchFoundItems();
  }, []); 


  if(isError2){
    return <div>Error loading found data...</div>
  }
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() =>{
    console.log("was here")
    if (data && data.length > 0) {
      const fetchImagesAndUpdateItems = async () => {
        // Fetch Lost Items
        const updatedLostItems = await Promise.all(
          data
            .filter((item) => !item.found) // Only show lost items
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
                  "Error fetching image for lost item ID:",
                  item.id,
                  error
                );
                return { ...item, imageUrl: "placeholder-image-url" };
              }
            })
        );

        setLostItems(updatedLostItems);
      };

      fetchImagesAndUpdateItems();
    }
  }, [data]);

  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "18rem" }}>
        Error loading data...
      </h2>
    );
  }


  const itemsToDisplay = activeTab === "lost" ? lostItems : foundItems;

  return (
    <div>
      {/* Tabs for Lost and Found Items */}
      <div
        className="tabs"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "86px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => setActiveTab("lost")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            cursor: "pointer",
            backgroundColor: activeTab === "lost" ? "#007bff" : "#f8f9fa",
            color: activeTab === "lost" ? "white" : "black",
            border: "1px solid #007bff",
            borderRadius: "5px",
          }}
        >
          Lost Items
        </button>
        <button
          onClick={() => setActiveTab("found")}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: activeTab === "found" ? "#007bff" : "#f8f9fa",
            color: activeTab === "found" ? "white" : "black",
            border: "1px solid #007bff",
            borderRadius: "5px",
          }}
        >
          Found Items
        </button>
      </div>

      {/* Item Cards */}
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
        {itemsToDisplay.length === 0 ? (
          <h2 className="text-center" style={{ textAlign: "center" }}>
            No {activeTab === "lost" ? "lost" : "found"} items available
          </h2>
        ) : (
          itemsToDisplay.map((item) => {
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
                      <strong>Color:</strong> {color}
                    </p>
                    <p className="text-gray-600">
                      <strong>Brand/Model:</strong> {brandModel || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      <strong>Identifiers:</strong> {specialIdentifiers || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      <strong>Description:</strong> {description}
                    </p>
                    <p className="text-gray-600">
                      <strong>Reported By:</strong> {fullName}
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
    </div>
  );
};

export default Home;
