import React, { useState } from 'react';
import { Box, Switch, styled } from '@mui/material';

// Custom styled switch for day/night toggle
const DayNightSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#8796A5',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#003892',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#8796A5',
    borderRadius: 20 / 2,
  },
}));

function Sky({ stars }) {
  const [isNight, setIsNight] = useState(false);

  // Fixed position in top left corner
  const celestialPosition = {
    x: 10,  // 10% from left
    y: 15   // 15% from top
  };

  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%', 
      height: '100vh',
      bgcolor: isNight ? '#1a237e' : '#87CEEB',
      transition: 'background-color 1s linear',
      overflow: 'hidden'
    }}>
      {/* Toggle Switch */}
      <Box sx={{ 
        position: 'absolute', 
        top: 20, 
        right: 20, 
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        color: 'white'
      }}>
        <DayNightSwitch
          checked={isNight}
          onChange={(e) => setIsNight(e.target.checked)}
        />
      </Box>

      {/* Stars */}
      {isNight && stars.map((star, index) => (
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
            opacity: star.opacity,
            transition: 'opacity 2s linear',
            boxShadow: '0 0 2px white',
          }}
        />
      ))}
      {/* Sun */}
      <Box
        sx={{
          position: 'absolute',
          left: `${celestialPosition.x}%`,
          top: isNight ? '150%' : `${celestialPosition.y}%`, // Move below view when night
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          bgcolor: '#ffeb3b',
          boxShadow: '0 0 40px #ffeb3b',
          transition: 'top 2s ease-in-out, opacity 0.5s ease-in-out',
          transform: 'scale(1)',
          zIndex: 1,
          opacity: !isNight ? 1 : 0
        }}
      />
      {/* Moon */}
      <Box
        sx={{
          position: 'absolute',
          left: `${celestialPosition.x}%`,
          top: isNight ? `${celestialPosition.y}%` : '150%', // Move below view when day
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          bgcolor: '#ffffff',
          boxShadow: '0 0 20px #ffffff80',
          transition: 'top 2s ease-in-out, opacity 0.5s ease-in-out',
          transform: 'scale(0.8)',
          zIndex: 1,
          opacity: isNight ? 1 : 0
        }}
      />
    </Box>
  );
}

export default Sky;
