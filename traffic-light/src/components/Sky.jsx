import React from 'react';
import { Box } from '@mui/material';

function Sky({ isNight, stars }) {
  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%', 
      height: '100vh',
      bgcolor: isNight ? '#1a237e' : '#87CEEB',
      transition: 'background-color 10s linear'
    }}>
      {/* Stars */}
      {stars.map((star, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            left: star.left,
            top: star.top,
            width: '2px',
            height: '2px',
            bgcolor: 'white',
            borderRadius: '50%',
            opacity: isNight ? star.opacity : 0,
            transition: 'opacity 2s linear',
            boxShadow: '0 0 2px white',
          }}
        />
      ))}

      {/* Moon/Sun */}
      <Box
        sx={{
          position: 'absolute',
          right: '10%',
          top: '10%',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          bgcolor: isNight ? '#ffffff' : '#ffeb3b',
          boxShadow: isNight 
            ? '0 0 20px #ffffff80'
            : '0 0 40px #ffeb3b',
          transition: 'all 10s linear'
        }}
      />
    </Box>
  );
}

export default Sky;
