import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import randomColor from "random-color";
let numRows = 25;
let numCols = 25;
let speed = 100;
let colors = randomColor();
let count = 0;
const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};

function Grid() {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
    count += 1;
    setTimeout(runSimulation, speed);
  }, []);

  return (
    <div className="grid">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
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
                width: 20,
                height: 20,
                backgroundColor: grid[i][k]
                  ? `${colors.rgbString()}`
                  : undefined,
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
      <h3>{`Generation:${count}`}</h3>
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
          }
        }}
      >
        {running ? "stop" : "start"}
      </button>
      <button
        onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(
              Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
            );
          }
          setGrid(rows);
        }}
      >
        random
      </button>
      <button
        onClick={() => {
          count = 0;
          setGrid(generateEmptyGrid());
        }}
      >
        clear
      </button>
      <button
        onClick={() => {
          numCols = 25;
          numRows = 25;
        }}
      >
        25 by 25 Grid
      </button>
      <button
        onClick={() => {
          numCols = 50;
          numRows = 50;
        }}
      >
        50 by 50 Grid
      </button>
      <button
        onClick={() => {
          numCols = 75;
          numRows = 75;
        }}
      >
        75 by 75 Grid
      </button>
      <button
        onClick={() => {
          speed = 100;
        }}
      >
        Fast
      </button>
      <button
        onClick={() => {
          speed = 1000;
        }}
      >
        Medium
      </button>
      <button
        onClick={() => {
          speed = 1500;
        }}
      >
        Slow
      </button>
    </div>
  );
}

export default Grid;
