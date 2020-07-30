import React from "react";
import Grid from "./components/grid";
import "../src/App.scss";
const App = () => {
  return (
    <div className="app">
      <h1>The Game of Life</h1>
      <Grid />
      <div>
        <h3>The Rules</h3>
      </div>
    </div>
  );
};

export default App;
