import React from 'react';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Box } from '@mui/material';

function Car({ position, color, bottom }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: bottom || '22%',
        left: position,
        transition: 'left 0.05s linear',
      }}
    >
      <DirectionsCarIcon sx={{ fontSize: 80, color }} />
    </Box>
  );
}

export default Car; 