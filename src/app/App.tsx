import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import SpiderSolitaireGame from "../features/spider/SpiderSolitaireGame";

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
          <SpiderSolitaireGame />
        </header>
      </div>
    </>
  );
}

export default App;
