import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react"; // 

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ReadBooks from "./pages/ReadBooks";
import Wishlist from "./pages/Wishlist";
import ManageBackend from "./pages/ManageBackend";
import NavBar from "./components/NavBar";
import DashboardLayout from "./layouts/DashboardLayout";
import { useAuth } from "./context/AuthContext";

function Logout() {
  const { logout } = useAuth(); // contextual logout handler

  useEffect(() => {
    localStorage.clear(); // 🛡️ Safely purges existing storage keys alongside context calls
    logout();
  }, [logout]);

  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  const { logout } = useAuth();

  useEffect(() => {
    localStorage.clear(); // 🛡️ Safely purges existing storage keys alongside context calls
    logout();
  }, [logout]);

  return <Register />;
}

function App() {
  // 🛡️ Recommendations tracking state shared seamlessly across views
  const [recommendations, setRecommendations] = useState([]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />

        {/*  Wrapping System with matching state definitions */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard
                  recommendations={recommendations}
                  setRecommendations={setRecommendations}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist
                  recommendations={recommendations}
                  setRecommendations={setRecommendations}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/readbooks"
            element={
              <ProtectedRoute>
                <ReadBooks
                  recommendations={recommendations}
                  setRecommendations={setRecommendations}
                />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 🛠️ Protected Admin Panel Workspace Route Route */}
        <Route
          path="/manage/backend"
          element={
            <ProtectedRoute>
              <ManageBackend />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
