"use client"
import { useState, useEffect, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface DotsOverlayProps {
  mousePosition: MousePosition | null;
  className?: string;
  dotSize?: number;
  spacing?: number;
  opacity?: number;
}

// Simplified DotsOverlay component with magnetic effect
const DotsOverlay = ({ mousePosition, className = "", dotSize = 1, spacing = 40, opacity = 0.4 }: DotsOverlayProps) => {
  const dotsRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update dimensions only on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: Math.max(window.innerHeight, document.documentElement.scrollHeight)
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Handle magnetic effect
  useEffect(() => {
    if (!dotsRef.current) return;

    const dots = dotsRef.current.children;

    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i] as HTMLElement;

      if (!mousePosition) {
        // Reset dots when mouse leaves
        dot.style.transform = 'translate(0, 0)';
        dot.style.opacity = opacity.toString();
        continue;
      }

      const rect = dot.getBoundingClientRect();
      const dotCenterX = rect.left + rect.width / 2;
      const dotCenterY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(mousePosition.x - dotCenterX, 2) +
        Math.pow(mousePosition.y - dotCenterY, 2)
      );

      const maxDistance = 150; // Influence radius
      const maxOffset = 8; // Maximum movement in pixels

      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        const offsetX = (mousePosition.x - dotCenterX) * force * (maxOffset / distance);
        const offsetY = (mousePosition.y - dotCenterY) * force * (maxOffset / distance);

        dot.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        dot.style.opacity = Math.min(1, opacity + force * 0.6).toString();
        dot.style.boxShadow = `0 0 ${force * 8}px rgba(255, 255, 255, ${Math.min(1, opacity + force * 0.6) * Math.random()})`;
      } else {
        dot.style.transform = 'translate(0, 0)';
        dot.style.opacity = opacity.toString();
      }
    }
  }, [mousePosition, opacity]);

  // Generate dots pattern - memoized to prevent recreation
  const dots = [];
  if (dimensions.width > 0 && dimensions.height > 0) {
    const rows = Math.ceil(dimensions.height / spacing) + 2;
    const cols = Math.ceil(dimensions.width / spacing) + 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push(
          <div
            key={`${row}-${col}`}
            className="absolute rounded-full transition-all duration-300 ease-out"
            style={{
              left: `${col * spacing}px`,
              top: `${row * spacing}px`,
              width: `${dotSize * 2}px`,
              height: `${dotSize * 2}px`,
              backgroundColor: 'currentColor',
              opacity: opacity,
            }}
          />
        );
      }
    }
  }

  return (
    <div
      ref={dotsRef}
      className={`absolute inset-0 pointer-events-none text-muted-foreground ${className}`}
      style={{
        height: `${dimensions.height}px`,
        maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 80%)'
      }}
    >
      {dots}
    </div>
  );
};

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

// Simplified PageWrapper component
const PageWrapper = ({ children, className = "" }: PageWrapperProps) => {
  const [mousePosition, setMousePosition] = useState<MousePosition | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setMousePosition(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={`relative min-h-screen bg-background overflow-hidden ${className}`}>
      {/* Magnetic dots overlay */}
      <DotsOverlay
        mousePosition={mousePosition}
        dotSize={1}
        spacing={40}
        opacity={0.4}
      />

      {/* Content with proper z-index */}
      <div className="relative z-30">
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;