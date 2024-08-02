import React from "react";

const HeaderBackground = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 1600 800"
    >
      <rect fill="#000000" width="1600" height="800" />
      <g fillOpacity="0.88">
        <polygon fill="#010501" points="1600 160 0 460 0 350 1600 50" />
        <polygon fill="#030a02" points="1600 260 0 560 0 450 1600 150" />
        <polygon fill="#041002" points="1600 360 0 660 0 550 1600 250" />
        <polygon fill="#061503" points="1600 460 0 760 0 650 1600 350" />
        <polygon fill="#071A04" points="1600 800 0 800 0 750 1600 450" />
      </g>
    </svg>
  );
};

export default HeaderBackground;
