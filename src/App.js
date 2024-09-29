import Home from "./pages/Home";
import React,{ useContext } from "react";

import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom"; // Import necessary components
import Login from "./pages/Login";
import Register from "./pages/Register";  // Import the Register component
import "./style.scss";
import Congratulations from "./pages/Congratulations";
function App() {
  const userToken = localStorage.getItem('token');
  const ProtectedRoute = ({ children }) => {
    if (!userToken) {
      return <Navigate to="/login" />;
    }

    return children
  };
  const AuthRoute = ({ children }) => {
    if (userToken) {
      return <Navigate to="/"/>;
    }
    else{
      return children;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}>
        </Route>
        
        <Route path="login" element={<AuthRoute><Login /></AuthRoute>} />
          <Route path="register" element={<AuthRoute><Register /></AuthRoute>} />
          <Route path="/verification" element={<Congratulations />} />
        {/* Catch-all route for undefined routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
