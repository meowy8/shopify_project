import React from "react";

const PaymentSuccessIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 40 40"
    >
      <path
        fill="currentColor"
        d="M20,38.5C9.8,38.5,1.5,30.2,1.5,20S9.8,1.5,20,1.5S38.5,9.8,38.5,20S30.2,38.5,20,38.5z"
      ></path>
      <path
        fill="#5e9c76"
        d="M20,2c9.9,0,18,8.1,18,18s-8.1,18-18,18S2,29.9,2,20S10.1,2,20,2 M20,1C9.5,1,1,9.5,1,20s8.5,19,19,19	s19-8.5,19-19S30.5,1,20,1L20,1z"
      ></path>
      <polyline
        fill="none"
        stroke="#fff"
        strokeMiterlimit="10"
        strokeWidth="3"
        points="11.2,20.1 17,25.9 30.2,12.7"
      ></polyline>
    </svg>
  );
};

export default PaymentSuccessIcon;
