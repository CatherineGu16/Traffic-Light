import React from 'react';
import { Box } from '@mui/material';

function Clouds({ clouds }) {
  return (
    <>
      {clouds.map(cloud => (
        <Box
          key={cloud.id}
          sx={{
            position: 'absolute',
            left: cloud.position,
            top: cloud.top,
            transition: 'left 0.05s linear',
            width: '100px',
            height: '40px',
            bgcolor: 'white',
            borderRadius: '20px',
            boxShadow: '0 0 20px rgba(255,255,255,0.5)',
            '&::before': {
              content: '""',
              position: 'absolute',
              width: '50px',
              height: '50px',
              bgcolor: 'white',
              borderRadius: '25px',
              top: '-20px',
              left: '15px'
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              width: '40px',
              height: '40px',
              bgcolor: 'white',
              borderRadius: '20px',
              top: '-10px',
              left: '45px'
            }
          }}
        />
      ))}
    </>
  );
}

export default Clouds;
