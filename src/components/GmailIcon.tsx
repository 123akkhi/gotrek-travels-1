import React from "react";

export const GmailIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M45 16.2V38C45 40.2 43.2 42 41 42H37V22L24 31.5L11 22V42H7C4.8 42 3 40.2 3 38V16.2C3 13.9 5.6 12.5 7.6 13.9L24 25.8L40.4 13.9C42.4 12.5 45 13.9 45 16.2Z"
      fill="#EA4335"
    />
    <path d="M37 42H41C43.2 42 45 40.2 45 38V16.2L37 22V42Z" fill="#B31412" />
    <path d="M11 42H7C4.8 42 3 40.2 3 38V16.2L11 22V42Z" fill="#4285F4" />
    <path
      d="M40.4 13.9L37 16.4V22L45 16.2C45 13.9 42.4 12.5 40.4 13.9Z"
      fill="#FBBC04"
    />
    <path
      d="M7.6 13.9L11 16.4V22L3 16.2C3 13.9 5.6 12.5 7.6 13.9Z"
      fill="#34A853"
    />
  </svg>
);
