import React, { useMemo } from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import PlayingCard from "./playing_cards/PlayingCard";
import { createInitialPiles } from "./spider/SpiderSolitaireEngine";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const piles = useMemo(() => createInitialPiles(), []);
  // console.log(piles);

  return (
    <>
      <CssBaseline enableColorScheme />
      <div className="App">
        <header className="App-header">
          <Counter />
          <PlayingCard card={{ rank: "A", suit: "♠" }} />
          <PlayingCard card={{ rank: "A", suit: "♥" }} />
        </header>
      </div>
    </>
  );
}

export default App;
