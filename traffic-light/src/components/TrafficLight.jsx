import React, { useState, useEffect } from 'react';
import Sky from './Sky';
import Clouds from './Clouds';
import TrafficLights from './TrafficLights';
import Road from './Road';
import Car from './Car';
import PoliceCar from './PoliceCar';
import RandomCars from './RandomCars';
import { Box } from '@mui/material';

function TrafficLight() {
  const [carPosition, setCarPosition] = useState(0);
  const [car2Position, setCar2Position] = useState(-200);
  const [redCarPosition, setRedCarPosition] = useState(-400);
  const [policePosition, setPolicePosition] = useState(-900);
  const [hasCaught, setHasCaught] = useState(false);
  const [ranRedLight, setRanRedLight] = useState(false);
  const sequence = ['red', 'green', 'yellow'];
  const DURATION = 3000; // 5 seconds for each state

  // Initialize lights with staggered states
  const [lights, setLights] = useState(() => {
    const startIndex = Math.floor(Math.random() * sequence.length);
    return [
      { id: 1, current: sequence[startIndex] },
      { id: 2, current: sequence[(startIndex + 1) % sequence.length] },
      { id: 3, current: sequence[(startIndex + 2) % sequence.length] }
    ];
  });

  const [randomCars, setRandomCars] = useState([]);
  const [clouds, setClouds] = useState([
    { id: 1, position: '10%', top: '10%', direction: 'right' },
    { id: 2, position: '30%', top: '15%', direction: 'right' },
    { id: 3, position: '50%', top: '5%', direction: 'right' },
    { id: 4, position: '70%', top: '20%', direction: 'right' },
    { id: 5, position: '90%', top: '8%', direction: 'right' },
    { id: 6, position: '80%', top: '12%', direction: 'left' },
    { id: 7, position: '20%', top: '18%', direction: 'left' }
  ]);

  const [isNight, setIsNight] = useState(false);
  const [stars, setStars] = useState(() => 
    Array.from({ length: 50 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 30}%`,
      opacity: 0
    }))
  );

  const [policeHasResponded, setPoliceHasResponded] = useState(false);

  // Day/Night cycle
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setIsNight(prev => !prev);
    }, 20000); // 20 seconds

    return () => clearInterval(cycleInterval);
  }, []);

  // Update stars opacity with night cycle
  useEffect(() => {
    const starInterval = setInterval(() => {
      if (isNight) {
        setStars(prev => prev.map(star => ({
          ...star,
          opacity: Math.random() // Makes stars twinkle
        })));
      }
    }, 1000);

    return () => clearInterval(starInterval);
  }, [isNight]);

  useEffect(() => {
    const timers = lights.map((light, index) => {
      const updateLight = () => {
        setLights(prevLights => {
          return prevLights.map((l, i) => {
            if (i !== index) return l;
            const currentIndex = sequence.indexOf(l.current);
            const nextIndex = (currentIndex + 1) % sequence.length;
            return { ...l, current: sequence[nextIndex] };
          });
        });
      };

      // Set initial delay to maintain stagger
      const initialDelay = index * (DURATION / 3);
      const timer = setInterval(updateLight, DURATION);
      
      // Initial timeout to start the stagger
      setTimeout(() => {
        updateLight();
        // Start the interval after the initial delay
      }, initialDelay);

      return timer;
    });

    return () => timers.forEach(timer => clearInterval(timer));
  }, []);

  // Blue car movement
  useEffect(() => {
    const moveCar = setInterval(() => {
      const lightPositions = [0.2, 0.5, 0.8].map(x => x * window.innerWidth);
      const carDistances = lightPositions.map((pos, index) => ({
        index,
        distance: pos - carPosition
      })).filter(d => d.distance > -20);
      
      const closestLight = lights[carDistances[0]?.index || 0];
      const distanceToLight = carDistances[0]?.distance || Infinity;
      const hasPassed = carPosition > lightPositions[closestLight.id - 1];

      // Speed adjustment based on light color and position
      const baseSpeed = 5;
      let speedMultiplier = 1;
      if (!hasPassed && distanceToLight < 200) {
        if (closestLight.current === 'red') {
          speedMultiplier = 0.5; // Slow down for red lights
        } else if (closestLight.current === 'green') {
          speedMultiplier = 1.2;
        }
      }
      const currentSpeed = baseSpeed * speedMultiplier;

      if (closestLight.current === 'green' || 
          closestLight.current === 'yellow' || 
          Math.abs(lightPositions[closestLight.id - 1] - carPosition) > 90 ||
          hasPassed) {
        setCarPosition(prev => (prev < window.innerWidth ? prev + currentSpeed : 0));
      }
    }, 50);
    return () => clearInterval(moveCar);
  }, [lights, carPosition]);

  // White car movement
  useEffect(() => {
    const moveCar2 = setInterval(() => {
      const lightPositions = [0.2, 0.5, 0.8].map(x => x * window.innerWidth);
      const carDistances = lightPositions.map((pos, index) => ({
        index,
        distance: pos - car2Position
      })).filter(d => d.distance > -20);
      
      const closestLight = lights[carDistances[0]?.index || 0];
      const distanceToLight = carDistances[0]?.distance || Infinity;
      const hasPassed = car2Position > lightPositions[closestLight.id - 1];

      const baseSpeed = 8;
      let speedMultiplier = 1;
      if (!hasPassed && distanceToLight < 200) {
        if (closestLight.current === 'red') {
          speedMultiplier = 0.5; // Slow down for red lights
        } else if (closestLight.current === 'green') {
          speedMultiplier = 1.2;
        }
      }
      const currentSpeed = baseSpeed * speedMultiplier;

      if (closestLight.current === 'green' || 
          closestLight.current === 'yellow' || 
          Math.abs(lightPositions[closestLight.id - 1] - car2Position) > 90 ||
          hasPassed) {
        setCar2Position(prev => (prev < window.innerWidth ? prev + currentSpeed : -200));
      }
    }, 50);
    return () => clearInterval(moveCar2);
  }, [lights, car2Position]);

  // Check if red car runs a red light
  useEffect(() => {
    const lightPositions = [0.2, 0.5, 0.8].map(x => x * window.innerWidth);
    const carDistances = lightPositions.map((pos, index) => ({
      index,
      distance: Math.abs(pos - redCarPosition)
    }));
    const closestLight = lights[carDistances.reduce((min, curr) => 
      curr.distance < carDistances[min].distance ? curr.index : min
    , 0)];

    if (closestLight.current === 'red' && 
        Math.abs(lightPositions[closestLight.id - 1] - redCarPosition) < 20 &&
        !policeHasResponded) {
      setRanRedLight(true);
      setPoliceHasResponded(true);
    }
  }, [redCarPosition, lights, policeHasResponded]);

  // Reset police response when red car restarts
  useEffect(() => {
    if (redCarPosition === -400) {
      setPoliceHasResponded(false);
    }
  }, [redCarPosition]);

  // Red car movement with restart delay
  useEffect(() => {
    if (hasCaught) {
      const restartTimer = setTimeout(() => {
        setRedCarPosition(-400);
        setPolicePosition(-900);
        setHasCaught(false);
        setRanRedLight(false);
      }, 3000);

      return () => clearTimeout(restartTimer);
    }

    const moveRedCar = setInterval(() => {
      setRedCarPosition(prev => (prev < window.innerWidth ? prev + 10 : -400));
    }, 50);

    return () => clearInterval(moveRedCar);
  }, [hasCaught]);

  // Police car movement
  useEffect(() => {
    if (hasCaught || !ranRedLight) return;

    const movePolice = setInterval(() => {
      setPolicePosition(prev => {
        const nextPosition = prev + 25;
        if (Math.abs(nextPosition - redCarPosition) < 100) {
          setHasCaught(true);
          return redCarPosition - 100;
        }
        return nextPosition < window.innerWidth ? nextPosition : -900;
      });
    }, 20);

    return () => clearInterval(movePolice);
  }, [hasCaught, redCarPosition, ranRedLight]);

  // Add keyboard listener for 'c' key
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === 'c') {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        const newCar = {
          id: Date.now(),
          position: -100,
          color: randomColor,
          speed: 5 + Math.random() * 10 // Random speed between 5 and 15
        };
        setRandomCars(prev => [...prev, newCar]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Move random cars
  useEffect(() => {
    if (randomCars.length === 0) return;

    const moveRandomCars = setInterval(() => {
      const lightPositions = [0.2, 0.5, 0.8].map(x => x * window.innerWidth);
      
      setRandomCars(prev => {
        const updatedCars = prev.map(car => {
          const carDistances = lightPositions.map((pos, index) => ({
            index,
            distance: pos - car.position
          })).filter(d => d.distance > -20);
          
          const closestLight = lights[carDistances[0]?.index || 0];
          const stopPosition = lightPositions[closestLight.id - 1] - 90;
          const distanceToLight = carDistances[0]?.distance || Infinity;
          const hasPassed = car.position > lightPositions[closestLight.id - 1];

          // Speed adjustment based on light color and position
          let speedMultiplier = 1;
          if (!hasPassed && distanceToLight < 200) {
            if (closestLight.current === 'red') {
              speedMultiplier = 0.5; // Slow down for red lights
            } else if (closestLight.current === 'green') {
              speedMultiplier = 1.2;
            }
          }
          const currentSpeed = car.speed * speedMultiplier;

          // If already stopped at light, maintain position
          if (Math.abs(car.position - stopPosition) < 5 && closestLight.current === 'red') {
            return { ...car, position: stopPosition };
          }

          // Normal movement logic
          if (closestLight.current === 'green' || 
              closestLight.current === 'yellow' || 
              carDistances[0]?.distance > 90 ||
              hasPassed) {
            return { ...car, position: car.position + currentSpeed };
          } else {
            return { ...car, position: stopPosition };
          }
        });
        
        return updatedCars.filter(car => car.position < window.innerWidth);
      });
    }, 50);

    return () => clearInterval(moveRandomCars);
  }, [randomCars.length, lights]);

  // Cloud movement
  useEffect(() => {
    const moveCloud = setInterval(() => {
      setClouds(prevClouds => 
        prevClouds.map(cloud => {
          const movement = cloud.direction === 'right' ? 0.1 : -0.1;
          const newPosition = parseFloat(cloud.position) + movement;
          
          // Reset position based on direction
          if (cloud.direction === 'right' && newPosition > 120) {
            return { ...cloud, position: '-20%' };
          } else if (cloud.direction === 'left' && newPosition < -20) {
            return { ...cloud, position: '120%' };
          }
          
          return { ...cloud, position: `${newPosition}%` };
        })
      );
    }, 50);

    return () => clearInterval(moveCloud);
  }, []);

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Sky isNight={isNight} stars={stars} />
      <Clouds clouds={clouds} />
      <TrafficLights lights={lights} />
      <Road />
      <Car position={carPosition} color="primary.main" />
      <Car position={car2Position} color="white" bottom="25%" />
      <Car position={redCarPosition} color="red" bottom="19%" />
      <PoliceCar position={policePosition} hasCaught={hasCaught} redCarPosition={redCarPosition} />
      <RandomCars randomCars={randomCars} />
    </Box>
  );
}

export default TrafficLight; 