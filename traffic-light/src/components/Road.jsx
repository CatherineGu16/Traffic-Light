import React from 'react';
import { Box } from '@mui/material';

function Road() {
  return (
    <>
      {/* Add grass at the bottom */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '15%',
          bgcolor: '#90EE90',  // Light green color
        }}
      />

      {/* Keep road above grass but below other elements */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: 0,
          right: 0,
          height: '100px',
          bgcolor: 'grey.800',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '4px',
            bgcolor: 'yellow',
            borderStyle: 'dashed'
          }
        }}
      />
    </>
  );
}

export default Road;
