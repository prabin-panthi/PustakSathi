import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react"; // ⬅️ IMPORT USESTATE

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ReadBooks from "./pages/ReadBooks";
import ManageBackend from "./components/ManageBackend";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  // 🛡️ Declare recommendations state at the App level so it persists
  const [recommendations, setRecommendations] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/readbooks" element={<ReadBooks />} />
      <Route path="/register" element={<RegisterAndLogout />} />

      {/* 🔐 Protected User Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {/* ⬇️ Pass state and setter props down to Dashboard */}
            <Dashboard
              recommendations={recommendations}
              setRecommendations={setRecommendations}
            />
          </ProtectedRoute>
        }
      />

      {/* 🛠️ Custom Admin Workspace Route */}
      <Route path="/manage/backend" element={<ManageBackend />} />
    </Routes>
  );
}

export default App;