import React from 'react';

const Logo = ({ className = "", size = "default" }) => {
  const sizeClasses = {
    small: "w-12 h-12",
    default: "w-16 h-16",
    large: "w-20 h-20"
  };

  return (
    <div className={`${sizeClasses[size]} flex items-center justify-center ${className}`}>
      <img 
        src="/logo.svg" 
        alt="Nivasi Space Logo" 
        className={`${size === 'small' ? 'w-10 h-10' : size === 'large' ? 'w-16 h-16' : 'w-12 h-12'} object-contain`}
      />
    </div>
  );
};

export default Logo; 
