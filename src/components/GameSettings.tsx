import { useState } from 'react';
import { 
  Box, 
  Button,
  Slider, 
  Typography,
  TextField,
  Chip
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

interface GameSettingsProps {
  boardSize: number;
  winCondition: number;
  players: string[];
  onSettingsChange: (size: number, winCondition: number, players: string[]) => void;
}

const GameSettings = ({ 
  boardSize, 
  winCondition, 
  players, 
  onSettingsChange 
}: GameSettingsProps) => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(boardSize);
  const [winCond, setWinCond] = useState(winCondition);
  const [playerSymbols, setPlayerSymbols] = useState<string[]>(players);
  const [newPlayerSymbol, setNewPlayerSymbol] = useState('');

  const handleSizeChange = (_event: Event, newValue: number | number[]) => {
    const newSize = newValue as number;
    setSize(newSize);
    
    if (winCond > newSize) {
      setWinCond(newSize);
    }
  };

  const handleWinConditionChange = (_event: Event, newValue: number | number[]) => {
    setWinCond(newValue as number);
  };

  const handleAddPlayer = () => {
    if (newPlayerSymbol && !playerSymbols.includes(newPlayerSymbol) && playerSymbols.length < 5) {
      setPlayerSymbols([...playerSymbols, newPlayerSymbol]);
      setNewPlayerSymbol('');
    }
  };

  const handleRemovePlayer = (index: number) => {
    if (playerSymbols.length > 2) {
      const newPlayers = [...playerSymbols];
      newPlayers.splice(index, 1);
      setPlayerSymbols(newPlayers);
    }
  };

  const handleApplySettings = () => {
    onSettingsChange(size, winCond, playerSymbols);
    setOpen(false);
  };

  return (
    <Box sx={{ mt: 2, mb: 3 }}>
      <Button 
        variant="outlined" 
        startIcon={<SettingsIcon />}
        onClick={() => setOpen(!open)}
      >
        {open ? 'Hide Settings' : 'Game Settings'}
      </Button>
      
      {open && (
        <Box sx={{ mt: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Game Configuration
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography id="board-size-slider" gutterBottom>
              Board Size: {size}x{size}
            </Typography>
            <Slider
              value={size}
              onChange={handleSizeChange}
              aria-labelledby="board-size-slider"
              step={1}
              marks
              min={3}
              max={10}
              valueLabelDisplay="auto"
            />
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography id="win-condition-slider" gutterBottom>
              Win Condition: {winCond} in a row
            </Typography>
            <Slider
              value={winCond}
              onChange={handleWinConditionChange}
              aria-labelledby="win-condition-slider"
              step={1}
              marks
              min={3}
              max={size}
              valueLabelDisplay="auto"
            />
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>
              Players ({playerSymbols.length})
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {playerSymbols.map((symbol, index) => (
                <Chip
                  key={index}
                  label={symbol}
                  onDelete={() => handleRemovePlayer(index)}
                  disabled={playerSymbols.length <= 2}
                />
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                label="New Symbol"
                value={newPlayerSymbol}
                onChange={(e) => setNewPlayerSymbol(e.target.value)}
                size="small"
                inputProps={{ maxLength: 2 }}
                disabled={playerSymbols.length >= 5}
              />
              <Button 
                variant="contained" 
                onClick={handleAddPlayer}
                disabled={!newPlayerSymbol || playerSymbols.includes(newPlayerSymbol) || playerSymbols.length >= 5}
              >
                Add
              </Button>
            </Box>
          </Box>
          
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleApplySettings}
          >
            Apply Settings
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default GameSettings; 