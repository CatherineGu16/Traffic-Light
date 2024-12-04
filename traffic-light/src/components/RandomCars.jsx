import React from 'react';
import Car from './Car';

function RandomCars({ randomCars }) {
  return (
    <>
      {randomCars.map(car => (
        <Car key={car.id} position={car.position} color={car.color} />
      ))}
    </>
  );
}

export default RandomCars; 