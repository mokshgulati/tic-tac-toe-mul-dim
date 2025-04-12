import { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { checkWinner, createEmptyBoard } from "../utils/gameUtils";

interface GameBoardProps {
  size: number;
  players: string[];
  winCondition: number;
  resetTrigger: number;
}

const Cell = styled(Paper)(({ theme }) => ({
  height: "60px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "1.5rem",
  fontWeight: "bold",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
}));

const WinnerDisplay = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.success.light,
  color: theme.palette.success.contrastText,
  borderRadius: theme.shape.borderRadius,
}));

const BoardContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: theme.spacing(1),
  maxWidth: 500,
  margin: "0 auto",
}));

const GameBoard = ({
  size,
  players,
  winCondition,
  resetTrigger,
}: GameBoardProps) => {
  const [board, setBoard] = useState<string[][]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [moveCount, setMoveCount] = useState(0);

  useEffect(() => {
    initializeBoard();
    setCurrentPlayerIndex(0);
    setWinner(null);
    setGameOver(false);
    setMoveCount(0);
  }, [resetTrigger, size]);

  const initializeBoard = () => {
    setBoard(createEmptyBoard(size));
  };

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] !== "" || gameOver) return;

    const newBoard = [...board];
    newBoard[row][col] = players[currentPlayerIndex];
    setBoard(newBoard);
    setMoveCount(moveCount + 1);

    if (
      checkWinner(
        newBoard,
        row,
        col,
        players[currentPlayerIndex],
        size,
        winCondition
      )
    ) {
      setWinner(players[currentPlayerIndex]);
      setGameOver(true);
      return;
    }

    if (moveCount === size * size - 1) {
      setGameOver(true);
      return;
    }

    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
  };

  const getCellBackgroundColor = (value: string) => {
    if (!value) return "white";

    switch (value) {
      case "X":
        return "#e3f2fd";
      case "O":
        return "#ffebee";
      case "Δ":
        return "#e8f5e9";
      default:
        return "white";
    }
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="subtitle1" gutterBottom>
        Current Player:{" "}
        <strong
          style={{
            color:
              currentPlayerIndex === 0
                ? "blue"
                : currentPlayerIndex === 1
                ? "red"
                : "green",
          }}
        >
          {players[currentPlayerIndex]}
        </strong>
      </Typography>

      <BoardContainer sx={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              elevation={1}
              sx={{ backgroundColor: getCellBackgroundColor(cell) }}
            >
              {cell}
            </Cell>
          ))
        )}
      </BoardContainer>

      {winner && (
        <WinnerDisplay>
          <Typography variant="h6">Player {winner} wins!</Typography>
        </WinnerDisplay>
      )}

      {gameOver && !winner && (
        <Box sx={{ mt: 2, p: 2, bgcolor: "warning.light", borderRadius: 1 }}>
          <Typography variant="h6">Game ended in a draw!</Typography>
        </Box>
      )}
    </Box>
  );
};

export default GameBoard;
