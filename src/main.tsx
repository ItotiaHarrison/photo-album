import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import Albums from "./pages/Albums.tsx";
import Photos from "./pages/Photos.tsx";
import EditPhoto from "./pages/EditPhoto.tsx";
import Login from "./pages/Login.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import SignUp from "./pages/SignUp.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import Profile from "./pages/Profile.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/albums/:id" element={<Albums />} />
            <Route path="/photos/:id" element={<Photos />} />
            <Route path="/edit-photo/:id" element={<EditPhoto />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </App>
    </Router>
  </StrictMode>
);
