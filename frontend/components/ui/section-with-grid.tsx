import React from 'react';

interface SectionWithGridProps {
  children: React.ReactNode;
  gridIntensity?: number;
  gridSize?: number;
  maskOpacity?: number;
  className?: string;
}

const SectionWithGrid: React.FC<SectionWithGridProps> = ({ 
  children, 
  gridIntensity = 0.05, 
  gridSize = 40,
  maskOpacity = 0.9,
  className = ""
}) => {
  return (
    <section className={`relative ${className}`}>
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, ${gridIntensity}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, ${gridIntensity}) 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          maskImage: `radial-gradient(ellipse at center, black 60%, transparent ${maskOpacity * 100}%)`,
          WebkitMaskImage: `radial-gradient(ellipse at center, black 60%, transparent ${maskOpacity * 100}%)`
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

export default SectionWithGrid; 