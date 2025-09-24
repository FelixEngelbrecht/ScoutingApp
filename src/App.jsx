// App.jsx
// Single-file React component: drop into src/App.jsx of a Vite React project.
// Expects these dependencies: react, react-dom, react-chartjs-2, chart.js

import React, { useMemo, useState, useRef } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// --- Sample player data (replace with your real data / API) ---
const PLAYERS = [
  {
    id: "messi",
    name: "Lionel Messi",
    stats: {
      Pace: 85,
      Shooting: 92,
      Passing: 93,
      Dribbling: 97,
      Defending: 38,
      Physical: 65,
    },
  },
  {
    id: "ronaldo",
    name: "Cristiano Ronaldo",
    stats: {
      Pace: 87,
      Shooting: 93,
      Passing: 82,
      Dribbling: 89,
      Defending: 35,
      Physical: 79,
    },
  },
  {
    id: "mbappe",
    name: "Kylian Mbappé",
    stats: {
      Pace: 98,
      Shooting: 88,
      Passing: 78,
      Dribbling: 91,
      Defending: 36,
      Physical: 76,
    },
  },
  {
    id: "kante",
    name: "N'Golo Kanté",
    stats: {
      Pace: 78,
      Shooting: 66,
      Passing: 78,
      Dribbling: 80,
      Defending: 89,
      Physical: 85,
    },
  },
];

function makeChartData(playerA, playerB) {
  const labels = Object.keys(playerA.stats);
  return {
    labels,
    datasets: [
      {
        label: playerA.name,
        data: labels.map((k) => playerA.stats[k]),
        backgroundColor: "rgba(34,202,236,0.18)",
        borderColor: "rgba(34,202,236,1)",
        pointBackgroundColor: "rgba(34,202,236,1)",
        pointRadius: 4,
        fill: true,
      },
      {
        label: playerB.name,
        data: labels.map((k) => playerB.stats[k]),
        backgroundColor: "rgba(255,99,132,0.16)",
        borderColor: "rgba(255,99,132,1)",
        pointBackgroundColor: "rgba(255,99,132,1)",
        pointRadius: 4,
        fill: true,
      },
    ],
  };
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // we'll control container height via CSS
  plugins: {
    legend: { position: "top" },
    tooltip: { enabled: true },
  },
  scales: {
    r: {
      beginAtZero: true,
      suggestedMin: 0,
      suggestedMax: 100,
      ticks: { stepSize: 20 },
      pointLabels: { font: { size: 12 } },
    },
  },
};

export default function App() {
  const [playerAId, setPlayerAId] = useState(PLAYERS[0].id);
  const [playerBId, setPlayerBId] = useState(PLAYERS[1].id);
  const chartRef = useRef(null);

  const playerA = useMemo(
    () => PLAYERS.find((p) => p.id === playerAId) || PLAYERS[0],
    [playerAId]
  );
  const playerB = useMemo(
    () => PLAYERS.find((p) => p.id === playerBId) || PLAYERS[1],
    [playerBId]
  );

  const data = useMemo(() => makeChartData(playerA, playerB), [playerA, playerB]);

  function swap() {
    setPlayerAId((prev) => {
      setPlayerBId(prev);
      return playerBId;
    });
  }

  function exportPNG() {
    // exports the chart as PNG (client-side)
    const chart = chartRef.current;
    if (!chart) return;
    const url = chart.toBase64Image();
    const a = document.createElement("a");
    a.href = url;
    a.download = `${playerA.name}_vs_${playerB.name}.png`;
    a.click();
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.h1}>Football Player Comparator — Radar</h1>
        <p style={styles.lead}>Compare two players across your chosen attributes.</p>
      </header>

      <section style={styles.controls}>
        <div style={styles.selectorRow}>
          <label style={styles.label}>
            Player A
            <select
              value={playerAId}
              onChange={(e) => setPlayerAId(e.target.value)}
              style={styles.select}
            >
              {PLAYERS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>

          <div style={styles.actions}>
            <button style={styles.swapBtn} onClick={swap} aria-label="Swap players">
              Swap
            </button>
          </div>

          <label style={styles.label}>
            Player B
            <select
              value={playerBId}
              onChange={(e) => setPlayerBId(e.target.value)}
              style={styles.select}
            >
              {PLAYERS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={styles.buttonsRow}>
          <button style={styles.exportBtn} onClick={exportPNG}>
            Export PNG
          </button>
        </div>
      </section>

      <main style={styles.chartWrap}>
        <div style={styles.chartCard}>
          <div style={styles.cardHeader}>
            <strong>{playerA.name}</strong> vs <strong>{playerB.name}</strong>
          </div>

          <div style={styles.chartContainer}>
            {/* The Radar chart will stretch to the container height */}
            <Radar ref={chartRef} data={data} options={chartOptions} />
          </div>
        </div>
      </main>

      <footer style={styles.footer}>
        <small>Tip: replace the PLAYERS array with your API or CSV-imported data.</small>
      </footer>
    </div>
  );
}

// --- Styles (inline for a single-file example) ---
const styles = {
  page: {
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    padding: 16,
    maxWidth: 980,
    margin: "0 auto",
  },
  header: { textAlign: "center", marginBottom: 12 },
  h1: { margin: 0, fontSize: 22 },
  lead: { marginTop: 6, color: "#555" },
  controls: { marginBottom: 12 },
  selectorRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  label: { display: "flex", flexDirection: "column", fontSize: 14 },
  select: { marginTop: 6, padding: "6px 8px", minWidth: 180 },
  actions: { display: "flex", alignItems: "center" },
  swapBtn: { padding: "6px 10px", cursor: "pointer" },
  buttonsRow: { marginTop: 8, textAlign: "center" },
  exportBtn: { padding: "8px 12px", cursor: "pointer" },
  chartWrap: { display: "flex", justifyContent: "center" },
  chartCard: {
    width: "100%",
    maxWidth: 860,
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
    borderRadius: 12,
    padding: 12,
    background: "#fff",
  },
  cardHeader: { marginBottom: 6, textAlign: "center" },
  chartContainer: {
    height: "min(62vh, 460px)",
    // Chart.js will fill the container; on mobile this keeps the chart usable
  },
  footer: { marginTop: 18, textAlign: "center", color: "#666" },
};
