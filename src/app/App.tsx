import React, { useMemo } from "react";
import { Counter } from "../features/counter/Counter";
import "./App.css";
import PlayingCard from "../features/playing_cards/PlayingCard";
import { createInitialPiles } from "../features/spider/engine/SpiderSolitaireEngine";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function App() {
  const piles = useMemo(() => createInitialPiles(), []);
  // console.log(piles);

  return (
    <>
      <CssBaseline enableColorScheme />
      <div className="App">
        <header className="App-header">
          <AppBar>
            <Typography
              variant="h3"
              component="div"
              align="center">
              DEWS - Spider
            </Typography>
          </AppBar>
          <Counter />
          <PlayingCard card={{ rank: "A", suit: "♠" }} />
          <PlayingCard card={{ rank: "A", suit: "♥" }} />
        </header>
      </div>
    </>
  );
}

export default App;
