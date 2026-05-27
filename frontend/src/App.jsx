
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
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

        <Route path="/upload" element={<Upload />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/trainee/:id" element={<TraineeDetails />} /> 

      </Routes>
    </BrowserRouter>
  );
}

export default App;