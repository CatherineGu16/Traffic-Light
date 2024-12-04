import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

function Sky({ isNight, stars }) {
  const [celestialPosition, setCelestialPosition] = useState({ x: -10, y: 100 });

  useEffect(() => {
    let animationFrame;
    let startTime = Date.now();
    const animationDuration = 20000; // 20 seconds for a complete cycle

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) % animationDuration;
      const progress = elapsed / animationDuration;

      if (!isNight) {
        const angle = progress * Math.PI;
        const x = 50 - Math.cos(angle) * 60;
        const y = 40 - Math.sin(angle) * 30;
        setCelestialPosition({ x, y });
      } else {
        const x = 70 + Math.sin(progress * Math.PI * 2) * 5;
        const y = 20 + Math.cos(progress * Math.PI * 2) * 2;
        setCelestialPosition({ x, y });
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [isNight]);

  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%', 
      height: '100vh',
      bgcolor: isNight ? '#1a237e' : '#87CEEB',
      transition: 'background-color 10s linear',
      overflow: 'hidden'
    }}>
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
      {/* Sun/Moon */}
      <Box
        sx={{
          position: 'absolute',
          left: `${celestialPosition.x}%`,
          top: `${celestialPosition.y}%`,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          bgcolor: isNight ? '#ffffff' : '#ffeb3b',
          boxShadow: isNight 
            ? '0 0 20px #ffffff80'
            : '0 0 40px #ffeb3b',
          transition: 'background-color 10s linear, box-shadow 10s linear',
          transform: `scale(${isNight ? 0.8 : 1})`,
          zIndex: 1,
          opacity: celestialPosition.y > 85 ? 
            Math.max(0, 1 - (celestialPosition.y - 85) / 5) : 1
        }}
      />
    </Box>
  );
}

export default Sky;
