import "./App.css";
import PlayingCard from "../features/playing_cards/PlayingCard";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

function App() {
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
          <PlayingCard card={{ rank: "A", suit: "♠" }} />
          <PlayingCard card={{ rank: "A", suit: "♥" }} />
        </header>
      </div>
    </>
  );
}

export default App;
