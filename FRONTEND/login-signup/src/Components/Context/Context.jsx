import axios from "../axios";
import { useState, useEffect, createContext, useCallback } from "react";

const AppContext = createContext({
  lostData: [],
  foundData: [],
  isLostError: "",
  isFoundError: "",
  refreshLostData: () => {},
  refreshFoundData: () => {},
});

export const AppProvider = ({ children }) => {

  const [lostData, setLostData] = useState([]);
  const [isLostError, setIsLostError] = useState(false);


  const [foundData, setFoundData] = useState([]);
  const [isFoundError, setIsFoundError] = useState(false);


  const refreshLostData = useCallback(async () => {
    try {
      const response = await axios.get("/lostitems");
      const itemsWithImages = await Promise.all(
        response.data.map(async (item) => {
          try {
            const imageResponse = await axios.get(
              `/lostitem/${item.id}/image`,
              { responseType: "blob" }
            );
            return {
              ...item,
              imageUrl: URL.createObjectURL(imageResponse.data)
            };
          } catch (imageError) {
            return { ...item, imageUrl: "placeholder-image-url" };
          }
        })
      );
      setLostData(itemsWithImages);
    } catch (error) {
      setIsLostError(error.message);
    }
  }, []);

  const refreshFoundData = useCallback(async () => {
    try {
      const response = await axios.get("/founditems");
      const itemsWithImages = await Promise.all(
        response.data.map(async (item) => {
          try {
            const imageResponse = await axios.get(
              `/founditem/${item.id}/image`,
              { responseType: "blob" }
            );
            return {
              ...item,
              imageUrl: URL.createObjectURL(imageResponse.data)
            };
          } catch (imageError) {
            return { ...item, imageUrl: "placeholder-image-url" };
          }
        })
      );
      setFoundData(itemsWithImages);
    } catch (error) {
      setIsFoundError(error.message);
    }
  }, []);

  
  useEffect(() => {
    console.log("hello")
    refreshLostData();
    refreshFoundData();
  }, [refreshLostData, refreshFoundData]);

  return (
    <AppContext.Provider
      value={{
        lostData,
        foundData,
        isLostError,
        isFoundError,
        refreshLostData,
        refreshFoundData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;