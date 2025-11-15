"use client";

import React from "react";

interface ByteBattleLogoProps {
  className?: string;
  size?: number;
}

const ByteBattleLogo: React.FC<ByteBattleLogoProps> = ({ 
  className = "", 
  size = 40 
}) => {
  return (
    <div className={`relative group ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
      >
        {/* Outer Ring */}
        <circle
          cx="50"
          cy="50"
          r="48"
          stroke="url(#outerGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
        
        {/* Circuit Pattern Background */}
        <g opacity="0.3">
          {/* Circuit lines */}
          <path
            d="M20 30 L35 30 L35 40 L50 40 L50 25 L70 25 L70 35 L80 35"
            stroke="#ef4444"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M20 70 L30 70 L30 60 L45 60 L45 75 L65 75 L65 65 L80 65"
            stroke="#ef4444"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="35" cy="30" r="2" fill="#dc2626" />
          <circle cx="50" cy="40" r="2" fill="#dc2626" />
          <circle cx="70" cy="25" r="2" fill="#dc2626" />
          <circle cx="30" cy="70" r="2" fill="#dc2626" />
          <circle cx="65" cy="75" r="2" fill="#dc2626" />
        </g>

        {/* Main Hexagon */}
        <polygon
          points="50,15 70,27.5 70,52.5 50,65 30,52.5 30,27.5"
          fill="url(#hexGradient)"
          stroke="url(#hexStroke)"
          strokeWidth="2"
          className="group-hover:fill-red-500/20 transition-all duration-300"
        />

        {/* Inner Tech Pattern */}
        <g>
          {/* Binary-inspired pattern */}
          <rect x="40" y="25" width="3" height="8" fill="#ef4444" opacity="0.8" />
          <rect x="47" y="25" width="3" height="8" fill="#ef4444" opacity="0.8" />
          <rect x="54" y="25" width="3" height="8" fill="#ef4444" opacity="0.8" />
          
          <rect x="37" y="37" width="3" height="8" fill="#ef4444" opacity="0.6" />
          <rect x="44" y="37" width="3" height="8" fill="#ef4444" opacity="0.8" />
          <rect x="51" y="37" width="3" height="8" fill="#ef4444" opacity="0.6" />
          <rect x="58" y="37" width="3" height="8" fill="#ef4444" opacity="0.8" />
          
          <rect x="40" y="49" width="3" height="8" fill="#ef4444" opacity="0.8" />
          <rect x="47" y="49" width="3" height="8" fill="#ef4444" opacity="0.6" />
          <rect x="54" y="49" width="3" height="8" fill="#ef4444" opacity="0.8" />
        </g>

        {/* Central Glowing Core */}
        <circle
          cx="50"
          cy="40"
          r="6"
          fill="url(#coreGradient)"
          className="animate-pulse"
        />
        
        {/* Lightning Bolt */}
        <path
          d="M48 35 L52 35 L50 40 L53 40 L49 45 L47 45 L50 40 L47 40 Z"
          fill="white"
          className="drop-shadow-lg"
        />

        {/* Animated Corner Accents */}
        <g className="animate-spin" style={{ transformOrigin: '50px 50px', animationDuration: '8s' }}>
          <circle cx="25" cy="25" r="2" fill="#ef4444" opacity="0.7" />
          <circle cx="75" cy="25" r="2" fill="#ef4444" opacity="0.7" />
          <circle cx="75" cy="75" r="2" fill="#ef4444" opacity="0.7" />
          <circle cx="25" cy="75" r="2" fill="#ef4444" opacity="0.7" />
        </g>

        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#dc2626" stopOpacity="1" />
            <stop offset="100%" stopColor="#991b1b" stopOpacity="0.8" />
          </linearGradient>
          
          <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.8)" />
            <stop offset="50%" stopColor="rgba(239,68,68,0.1)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.9)" />
          </linearGradient>
          
          <linearGradient id="hexStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
          
          <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fca5a5" />
            <stop offset="50%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#dc2626" />
          </radialGradient>
        </defs>
      </svg>
      
      {/* Glowing Effect */}
      <div className="absolute inset-0 rounded-full bg-red-500/20 blur-lg opacity-0 group-hover:opacity-60 transition-all duration-500" />
    </div>
  );
};

export default ByteBattleLogo;