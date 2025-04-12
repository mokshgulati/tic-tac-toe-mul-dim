import { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import GameBoard from "./components/GameBoard";
import GameControls from "./components/GameControls";
import GameSettings from "./components/GameSettings";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  const [boardSize, setBoardSize] = useState(5);
  const [winCondition, setWinCondition] = useState(4);
  const [players, setPlayers] = useState(["X", "O", "Δ"]);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleReset = () => {
    setResetTrigger((prev) => prev + 1);
  };

  const handleSettingsChange = (
    size: number,
    winCond: number,
    newPlayers: string[]
  ) => {
    setBoardSize(size);
    setWinCondition(winCond);
    setPlayers(newPlayers);
    handleReset();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box sx={{ my: 4, textAlign: "center" }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Tic Tac Toe Game
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {boardSize}x{boardSize} Board - {players.length} Players
          </Typography>

          <GameSettings
            boardSize={boardSize}
            winCondition={winCondition}
            players={players}
            onSettingsChange={handleSettingsChange}
          />

          <GameBoard
            size={boardSize}
            players={players}
            winCondition={winCondition}
            resetTrigger={resetTrigger}
          />

          <GameControls onReset={handleReset} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
