import React from "react";
import ChartApp from "../ChartApp"; // rename old App.jsx to ChartApp.jsx

export default function Compare() {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Player Comparison</h2>
      <ChartApp />
    </div>
  );
}