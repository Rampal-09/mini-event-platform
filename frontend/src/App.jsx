import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreateEvent from "./pages/CreateEvent";
import EventList from "./pages/EventList";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/events" element={<EventList />} />
      </Routes>
    </Router>
  );
}

export default App;
