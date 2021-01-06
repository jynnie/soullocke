import React from "react";

/**
 * Icon Attribution: https://icons8.com/icons/set/pokeball
 */
const Pokeball = ({ width, height, size = 30 }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={width || size}
      height={height || size}
      viewBox="0 0 172 172"
      style={{ fill: "#000000" }}
    >
      <g
        fill="none"
        fillRule="nonzero"
        stroke="none"
        strokeWidth="1"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeDasharray=""
        strokeDashoffset="0"
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
        style={{ mixBlendMode: "normal" }}
      >
        <path d="M0,172v-172h172v172z" fill="none"></path>
        <g fill="currentColor">
          <path d="M86,17.2c-37.92867,0 -68.8,30.87133 -68.8,68.8c0,37.92867 30.87133,68.8 68.8,68.8c37.92867,0 68.8,-30.87133 68.8,-68.8c0,-37.92867 -30.87133,-68.8 -68.8,-68.8zM86,68.8c9.56721,0 17.2,7.63279 17.2,17.2c0,9.56721 -7.63279,17.2 -17.2,17.2c-9.56721,0 -17.2,-7.63279 -17.2,-17.2c0,-9.56721 7.63279,-17.2 17.2,-17.2zM86,80.26667c-3.16643,0 -5.73333,2.5669 -5.73333,5.73333c0,3.16643 2.5669,5.73333 5.73333,5.73333c3.16643,0 5.73333,-2.5669 5.73333,-5.73333c0,-3.16643 -2.5669,-5.73333 -5.73333,-5.73333zM28.66667,86h28.66667c0,15.76425 12.90241,28.66667 28.66667,28.66667c15.76425,0 28.66667,-12.90241 28.66667,-28.66667h28.66667c0,31.73133 -25.60201,57.33333 -57.33333,57.33333c-31.73133,0 -57.33333,-25.60201 -57.33333,-57.33333z"></path>
        </g>
      </g>
    </svg>
  );
};

export default Pokeball;
