import React from 'react';

interface KingLogoProps {
  variant?: 'color' | 'on-dark' | 'on-yellow' | 'monochrome';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const KingLogo: React.FC<KingLogoProps> = ({
  variant = 'color',
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24',
  };

  const isYellowBg = variant === 'on-yellow';
  const isMonochrome = variant === 'monochrome';

  // Colors based on variant
  const lettersColor = isYellowBg ? '#2E3192' : isMonochrome ? 'currentColor' : '#2E3192';
  const accentColor = isYellowBg ? '#2E3192' : isMonochrome ? 'currentColor' : '#FFEA00';
  const shockColor = isYellowBg ? '#2E3192' : isMonochrome ? 'currentColor' : '#FFEA00';

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 420 190"
        className={`${sizeClasses[size]} w-auto transition-transform hover:scale-105 duration-200`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Crown on top of G */}
        <g transform="translate(330, 10) rotate(15)">
          <path
            d="M 5,30 L 0,8 L 14,18 L 25,0 L 36,18 L 50,8 L 45,30 Z"
            fill={accentColor}
          />
          {/* Crown Jewels dots */}
          <circle cx="0" cy="7" r="3" fill={accentColor} />
          <circle cx="25" cy="0" r="3.5" fill={accentColor} />
          <circle cx="50" cy="7" r="3" fill={accentColor} />
        </g>

        {/* Shock Absorber (forming the left stem of 'K') */}
        <g transform="translate(25, 20) rotate(-18)">
          {/* Top Eyelet Mount */}
          <circle cx="45" cy="22" r="14" fill={shockColor} />
          <circle cx="45" cy="22" r="6" fill={variant === 'on-dark' ? '#101416' : '#ffffff'} />
          
          {/* Top Shaft */}
          <rect x="39" y="36" width="12" height="14" rx="2" fill={shockColor} />
          
          {/* Shock Main Body / Upper Reservoir */}
          <rect x="33" y="50" width="24" height="20" rx="3" fill={shockColor} />
          
          {/* Coil Springs */}
          <rect x="30" y="74" width="30" height="8" rx="4" fill={shockColor} />
          <rect x="30" y="86" width="30" height="8" rx="4" fill={shockColor} />
          <rect x="30" y="98" width="30" height="8" rx="4" fill={shockColor} />
          <rect x="30" y="110" width="30" height="8" rx="4" fill={shockColor} />
          <rect x="30" y="122" width="30" height="8" rx="4" fill={shockColor} />
          
          {/* Lower Shock Body */}
          <rect x="36" y="132" width="18" height="14" rx="2" fill={shockColor} />
          
          {/* Bottom Eyelet Mount */}
          <circle cx="45" cy="154" r="13" fill={shockColor} />
          <circle cx="45" cy="154" r="5" fill={variant === 'on-dark' ? '#101416' : '#ffffff'} />
        </g>

        {/* Letter 'K' diagonal arms */}
        <path
          d="M 125,48 L 78,145 L 122,145 L 148,88 L 180,145 L 225,145 L 172,60 L 210,48 L 160,48 L 125,98 L 125,48 Z"
          fill={lettersColor}
        />

        {/* Letter 'I' */}
        <path
          d="M 235,48 L 202,145 L 235,145 L 268,48 Z"
          fill={lettersColor}
        />

        {/* Letter 'N' */}
        <path
          d="M 276,48 L 243,145 L 273,145 L 290,95 L 305,145 L 335,145 L 368,48 L 338,48 L 315,115 L 300,48 Z"
          fill={lettersColor}
        />

        {/* Letter 'G' */}
        <path
          d="M 405,52 C 385,38 350,38 335,65 C 320,92 325,125 348,140 C 370,152 400,145 410,120 L 380,120 C 375,128 360,132 350,125 C 338,118 338,98 348,80 C 358,62 380,60 395,72 L 405,52 Z"
          fill={lettersColor}
        />
        <path
          d="M 370,95 L 415,95 L 400,145 L 372,145 L 382,115 L 370,115 Z"
          fill={lettersColor}
        />

        {/* 4x4 Text underneath */}
        {showSubtitle && (
          <g transform="translate(235, 142)">
            {/* First 4 */}
            <path
              d="M 24,10 L 8,30 L 24,30 L 24,38 L 32,38 L 32,30 L 38,30 L 38,24 L 32,24 L 32,10 Z M 16,24 L 24,13 L 24,24 Z"
              fill={accentColor}
            />
            {/* 'x' */}
            <path
              d="M 45,18 L 52,26 L 44,36 L 52,36 L 56,29 L 61,36 L 69,36 L 61,26 L 68,18 L 60,18 L 56,23 L 52,18 Z"
              fill={accentColor}
            />
            {/* Second 4 */}
            <path
              d="M 85,10 L 69,30 L 85,30 L 85,38 L 93,38 L 93,30 L 99,30 L 99,24 L 93,24 L 93,10 Z M 77,24 L 85,13 L 85,24 Z"
              fill={accentColor}
            />
          </g>
        )}
      </svg>
    </div>
  );
};
