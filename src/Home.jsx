import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.container}>
      <h1>⚽ Football Stats Comparator</h1>
      <p>
        Welcome! This tool lets you compare football players using a radar
        chart across attributes like pace, shooting, passing, and more.
      </p>
      <Link to="/compare" style={styles.button}>
        Go to Comparator
      </Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "2rem",
  },
  button: {
    display: "inline-block",
    marginTop: "1rem",
    padding: "0.8rem 1.4rem",
    background: "#646cff",
    color: "white",
    textDecoration: "none",
    borderRadius: "6px",
  },
};
