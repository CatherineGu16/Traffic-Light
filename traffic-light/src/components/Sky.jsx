import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

function Sky({ isNight, stars }) {
  const [sunPosition, setSunPosition] = useState({ x: -10, y: 100 });
  const [moonPosition, setMoonPosition] = useState({ x: -10, y: 100 });
  const [prevIsNight, setPrevIsNight] = useState(isNight);
  const [moonStartTime, setMoonStartTime] = useState(Date.now());

  useEffect(() => {
    // Reset moon animation when night begins
    if (isNight && !prevIsNight) {
      setMoonStartTime(Date.now());
    }
    setPrevIsNight(isNight);
  }, [isNight, prevIsNight]);

  useEffect(() => {
    let animationFrame;
    let startTime = Date.now();
    const sunCycleDuration = 40000; // 40 seconds for sun cycle
    const moonCycleDuration = 20000; // 20 seconds for moon cycle

    const animate = () => {
      const currentTime = Date.now();
      const sunElapsed = currentTime - startTime;
      const moonElapsed = currentTime - moonStartTime;
      
      // Sun progress (complete cycle)
      const sunProgress = (sunElapsed % sunCycleDuration) / sunCycleDuration;
      
      // Moon progress (only during night)
      const moonProgress = Math.min(moonElapsed / moonCycleDuration, 1);

      // Calculate position along elliptical path for the sun
      const angle = sunProgress * Math.PI * 2;
      const sunX = 50 + Math.cos(angle) * 40;
      const sunY = 50 + Math.sin(angle) * 35;

      // Calculate linear arc path for the moon (left to right)
      const moonX = moonProgress * 100; // Moves from left to right
      const moonY = 30 - Math.sin(moonProgress * Math.PI) * 20; // Arc path

      setSunPosition({ x: sunX, y: sunY });
      setMoonPosition({ x: moonX, y: moonY });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [moonStartTime]);

  // Calculate if celestial bodies should be visible
  const isSunVisible = !isNight && sunPosition.y < 50;
  const isMoonVisible = isNight && moonPosition.x >= 0 && moonPosition.x <= 100;

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
      {/* Sun */}
      <Box
        sx={{
          position: 'absolute',
          left: `${sunPosition.x}%`,
          top: `${sunPosition.y}%`,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          bgcolor: '#ffeb3b',
          boxShadow: '0 0 40px #ffeb3b',
          transition: 'opacity 0.5s ease-in-out',
          transform: 'scale(1)',
          zIndex: 1,
          opacity: isSunVisible ? 1 : 0
        }}
      />
      {/* Moon */}
      <Box
        sx={{
          position: 'absolute',
          left: `${moonPosition.x}%`,
          top: `${moonPosition.y}%`,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          bgcolor: '#ffffff',
          boxShadow: '0 0 20px #ffffff80',
          transition: 'opacity 0.5s ease-in-out',
          transform: 'scale(0.8)',
          zIndex: 1,
          opacity: isMoonVisible ? 1 : 0
        }}
      />
    </Box>
  );
}

export default Sky;
