import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SIgnIn";
import Customize from "./pages/Customize";
import { userDataContext } from "./context/UserContext";
import { useContext } from "react";
import Home from "./pages/Home";
import Customize2 from "./pages/Customize2";
function App() {
  const { user, setUserData } = useContext(userDataContext);
  return (
    <Routes>
      <Route
        path="/"
        element={
          user?.assistantImage && user?.assistantName ? (
            <Home />
          ) : (
            <Navigate to="/customize" />
          )
        }
      />
      <Route
        path="/signup"
        element={!user ? <SignUp /> : <Navigate to="/" />}
      />
      <Route
        path="/signin"
        element={!user ? <SignIn /> : <Navigate to="/" />}
      />
      <Route
        path="/customize"
        element={user ? <Customize /> : <Navigate to="/signup" />}
      />
      <Route
        path="/customize2"
        element={user ? <Customize2 /> : <Navigate to="/signup" />}
      />
    </Routes>
  );
}

export default App;
