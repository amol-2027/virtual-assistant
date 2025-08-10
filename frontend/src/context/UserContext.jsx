import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const userDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = import.meta.env.VITE_SERVER_URL || "https://virtual-assistant-backend-uqx4.onrender.com";
  const [user, setUserData] = useState(null);

  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleCurrentUser = async () =>{
    try {

      const result = await axios.get(`${serverUrl}/api/user/current`,
        {withCredentials: true})
        setUserData(result.data)
        console.log(result.data)
    } catch (error) {
      // Only log error if it's not a "token not found" error (which is normal for non-logged in users)
      if (error.response && error.response.status === 400 && error.response.data.message === "token not found") {
        // This is normal behavior when user is not logged in
        setUserData(null);
        return;
      }
      console.log(error);
      // If token is invalid or not found, clear user data
      if (error.response && (error.response.status === 401 || error.response.status === 400)) {
        setUserData(null);
      }
    }
  }
  const getGeminiResponse=async (command)=>{
    try {
      const result=await axios.post(`${serverUrl}/api/user/asktoassistant`,{command},{withCredentials:true})
      return result.data
    } catch (error) {
      console.log(error)
    } }
  useEffect(() => {
    handleCurrentUser()
  }, [])

  const value = {
    serverUrl, user, setUserData, frontendImage, setFrontendImage,
     backendImage, setBackendImage, selectedImage, setSelectedImage,
     getGeminiResponse
  }

  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  );
}

export default UserContext;

