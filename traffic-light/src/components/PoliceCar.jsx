import React from 'react';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Box } from '@mui/material';

function PoliceCar({ position, hasCaught, redCarPosition }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '20%',
        left: position,
        transition: 'left 0.02s linear',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* Add police lights */}
      <Box
        sx={{
          position: 'absolute',
          top: '-15px',
          width: '40px',
          height: '10px',
          bgcolor: hasCaught ? '#1a237e' : (Date.now() % 1000 < 500 ? '#ff0000' : '#0000ff'),
          borderRadius: '5px',
        }}
      />
      <DirectionsCarIcon sx={{ 
        fontSize: 80, 
        color: '#1a237e',  // Darker blue for police car
        transform: 'scaleX(1.2)',  // Make it slightly wider to look more like a police car
      }} />
    </Box>
  );
}

export default PoliceCar; 