import HeartOverlay from "./components/HeartOverlay";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Gift from "./components/Gift";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HeartOverlay />} />
          <Route path="/gift" element={<Gift />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
