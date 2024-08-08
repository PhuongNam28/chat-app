// import React from 'react'
// import {Button} from "@/components/ui/button"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/auth";
import Profile from "./pages/profile";
import Chat from "./pages/chat";
import { userAppStore } from "./store";
import { useEffect, useState } from "react";
import { apiClient } from "./lib/api-client";
import { GET_USER_INFO } from "./utils/constants";



const PrivateRoute = ({ children }) => {
  const { userInfo } = userAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = userAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};



function App() {

  const {userInfo,setUserInfo} = userAppStore()
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    const getUserData = async()=>{
        try {
          const response = await apiClient.get(GET_USER_INFO,{
            withCredentials:true
          })
          if(response.status===200 && response.data.id){
            setUserInfo(response.data)
          }
          else{
            setUserInfo(undefined)
          }
          
          console.log({response})
        } catch(error)
        {
          setUserInfo(undefined)

        }
        finally{
          setLoading(false)
        }
    }
    if(!userInfo){
      getUserData()
    }
    else{
      setLoading(false)
    }
  },[userInfo,setUserInfo])

  if(loading){
    return <div>Loading...</div>
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/auth"
            element={
              <AuthRoute>
                <Auth />
              </AuthRoute>
            }
          ></Route>
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<Navigate to="/auth" />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
