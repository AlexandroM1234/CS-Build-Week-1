import React, { useState } from "react";
import randomColor from "random-color";
import produce from "immer";
import "./App.css";

const numRow = 50;
const numCols = 50;
let colors = randomColor();

function App() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRow; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });

  const [running, setRunning] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setRunning(!running);
        }}
      >
        {running ? "stop" : "start"}
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols},25px)`,
        }}
        className="App"
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 25,
                height: 25,
                backgroundColor: grid[i][k]
                  ? `${colors.hexString()}`
                  : undefined,
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
