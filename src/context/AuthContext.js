import { createContext, useEffect, useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/check-auth", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setCurrentUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setCurrentUser(null);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
