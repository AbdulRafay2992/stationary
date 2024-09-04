import React, { useState, useEffect } from 'react';

const Logo = () => {
  const [color, setColor] = useState('orange');

  useEffect(() => {
    const randomColorChange = () => {
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      setColor(randomColor);
    };

    const randomTime = Math.floor(Math.random() * 100000) + 100000; // Random time between 10 and 20 seconds in milliseconds
    const colorChangeTimer = setInterval(randomColorChange, randomTime);

    return () => clearInterval(colorChangeTimer);
  }, []);

  return (
    <svg
      className="w-24 h-24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: 'rotate(353deg)',
      }}
    >
      <rect
        width="20"
        height="13"
        x="2"
        y="5"
        rx="4"
        fill={color}
        stroke={color}
        strokeWidth="2"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fill="white"
        fontSize="12px"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        <tspan x="36%" y="66%" dy="0">
          E
        </tspan>
        <tspan x="64%" y="6%" dy="1.2em">
          B
        </tspan>
      </text>
    </svg>
  );
};

export default Logo;
