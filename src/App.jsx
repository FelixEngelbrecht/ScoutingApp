import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Compare from "./pages/Compare";

export default function App() {
  return (
    <div>
      <nav style={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/compare">Compare Players</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    gap: "1rem",
    padding: "1rem",
    background: "#1a1a1a",
  },
};
