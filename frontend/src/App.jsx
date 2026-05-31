
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import TrainerDashboard from "./pages/TrainerDashboard";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import TraineeDetails from "./pages/TraineeDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route
  path="/admin-dashboard"
  element={<AdminDashboard />}
/>

<Route
  path="/manager-dashboard"
  element={<ManagerDashboard />}
/>

<Route
  path="/trainer-dashboard"
  element={<TrainerDashboard />}
/>

        <Route path="/upload" element={<Upload />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/trainee/:id" element={<TraineeDetails />} /> 

      </Routes>
    </BrowserRouter>
  );
}

export default App;