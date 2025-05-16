
import React from 'react';

interface MedConnectLogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export function MedConnectLogo({ className = "", size = "medium" }: MedConnectLogoProps) {
  // Size based on the prop
  const logoSize = {
    small: "h-6",
    medium: "h-8",
    large: "h-10"
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center justify-center bg-apple-blue text-white rounded-lg p-1.5 mr-2">
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
          <path d="M8 19h8a4 4 0 0 0 0-8h-8a4 4 0 0 0 0 8Z" />
          <path d="M8 19a4 4 0 1 0 0-8" />
          <path d="M12 19V5" />
          <path d="M12 6H6" />
        </svg>
      </div>
      <div>
        <h2 className={`font-bold ${size === 'large' ? 'text-xl' : size === 'medium' ? 'text-lg' : 'text-base'}`}>
          Med-Connect
        </h2>
        <p className={`text-xs text-gray-500 ${size === 'small' ? 'hidden' : ''}`}>Healthcare Solutions</p>
      </div>
    </div>
  );
}
