
import React from 'react';

interface MedConnectLogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export function MedConnectLogo({ className = "", size = "medium" }: MedConnectLogoProps) {
  // Size based on the prop
  const logoSize = {
    small: "h-8",
    medium: "h-10",
    large: "h-12"
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center justify-center bg-pharmacy-primary text-white rounded-lg p-2 mr-2">
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={`${logoSize[size]}`}
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          <line x1="12" x2="12" y1="7" y2="13" />
          <line x1="9" x2="15" y1="10" y2="10" />
        </svg>
      </div>
      <div>
        <h2 className={`font-bold ${size === 'large' ? 'text-2xl' : size === 'medium' ? 'text-xl' : 'text-lg'}`}>
          Med-Connect
        </h2>
        <p className="text-xs text-gray-500">Healthcare Solutions</p>
      </div>
    </div>
  );
}
