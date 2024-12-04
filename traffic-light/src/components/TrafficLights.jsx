import React from 'react';
import { Box } from '@mui/material';

function TrafficLights({ lights }) {
  return (
    <>
      {[0.2, 0.5, 0.8].map((position, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            bottom: '35%',
            left: `${position * 100}%`,
            transform: 'translate(-50%, 0)',
            width: '20px',
            height: '85px',
            bgcolor: 'black',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '5px',
            borderRadius: '10px',
            '&::before': {
              content: '""',
              position: 'absolute',
              bottom: '-50px',
              width: '10px',
              height: '50px',
              bgcolor: 'black'
            }
          }}
        >
          <Box
            sx={{
              width: '15px',
              height: '15px',
              borderRadius: '50%',
              bgcolor: lights[index].current === 'red' ? 'red' : '#1b1b1b',
              boxShadow: lights[index].current === 'red' ? '0 0 10px red' : 'none'
            }}
          />
          <Box
            sx={{
              width: '15px',
              height: '15px',
              borderRadius: '50%',
              bgcolor: lights[index].current === 'yellow' ? 'yellow' : '#1b1b1b',
              boxShadow: lights[index].current === 'yellow' ? '0 0 10px yellow' : 'none'
            }}
          />
          <Box
            sx={{
              width: '15px',
              height: '15px',
              borderRadius: '50%',
              bgcolor: lights[index].current === 'green' ? '#00ff00' : '#1b1b1b',
              boxShadow: lights[index].current === 'green' ? '0 0 10px #00ff00' : 'none'
            }}
          />
        </Box>
      ))}
    </>
  );
}

export default TrafficLights; 