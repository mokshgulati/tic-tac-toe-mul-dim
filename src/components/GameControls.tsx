import { Button, Box } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

interface GameControlsProps {
  onReset: () => void;
}

const GameControls = ({ onReset }: GameControlsProps) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={onReset}
        startIcon={<RestartAltIcon />}
        size="large"
      >
        Reset Game
      </Button>
    </Box>
  );
};

export default GameControls; 