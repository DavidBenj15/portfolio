import React from 'react';

interface GridOverlayProps {
  className?: string;
  intensity?: number;
  size?: number;
  maskOpacity?: number;
}

const GridOverlay: React.FC<GridOverlayProps> = ({ 
  className = "", 
  intensity = 0.05, 
  size = 40,
  maskOpacity = 0.7
}) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, ${intensity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, ${intensity}) 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
        maskImage: `radial-gradient(ellipse at center, black 40%, transparent ${maskOpacity * 100}%)`,
        WebkitMaskImage: `radial-gradient(ellipse at center, black 40%, transparent ${maskOpacity * 100}%)`
      }}
    />
  );
};

export default GridOverlay; 