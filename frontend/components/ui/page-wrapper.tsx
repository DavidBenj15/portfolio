"use client"
import { useState, useEffect, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface DotPosition {
  x: number;
  y: number;
  id: string;
  currentX: number;
  currentY: number;
}

interface Connection {
  dot1: DotPosition;
  dot2: DotPosition;
  distance: number;
  opacity: number;
  id: string;
  targetOpacity: number;
}

interface HeaderElement {
  element: Element;
  id: string;
  breathingOffset: number;
  breathingSpeed: number;
}

interface DotsOverlayProps {
  mousePosition: MousePosition | null;
  className?: string;
  dotSize?: number;
  spacing?: number;
  opacity?: number;
}

// Enhanced DotsOverlay component with subtle breathing glow for headers
const DotsOverlay = ({ mousePosition, className = "", dotSize = 1, spacing = 40, opacity = 0.4 }: DotsOverlayProps) => {
  const dotsRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [dotPositions, setDotPositions] = useState<DotPosition[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [stableConnections, setStableConnections] = useState<Connection[]>([]);
  const [connectedDots, setConnectedDots] = useState<Set<string>>(new Set());
  const [headerElements, setHeaderElements] = useState<HeaderElement[]>([]);
  const frameRef = useRef<number>(0);
  const lastUpdateRef = useRef({ x: 0, y: 0, time: 0 });
  const lastConnectionUpdateRef = useRef<number>(0);
  const lastHeaderUpdateRef = useRef<number>(0);
  const dotGlowMap = useRef<Map<string, number>>(new Map());
  const startTimeRef = useRef<number>(Date.now());

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

  // Scan for headers with glow classes - much less frequently and simpler
  const scanForHeaders = (): HeaderElement[] => {
    const now = Date.now();

    // Only scan for headers every 5 seconds to minimize performance impact
    if (now - lastHeaderUpdateRef.current < 5000) return headerElements;
    lastHeaderUpdateRef.current = now;

    const glowSelectors = [
      '.glow-white',
      '.glow-white-soft',
      '.glow-primary',
      '.glow-accent',
      '.glow-responsive'
    ];

    const newHeaders: HeaderElement[] = [];

    glowSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element, index) => {
        newHeaders.push({
          element,
          id: `${selector.replace('.', '')}-${index}`,
          breathingOffset: Math.random() * Math.PI * 2, // Random phase offset for organic feel
          breathingSpeed: 0.8 + Math.random() * 0.4 // Slight speed variation (0.8-1.2x)
        });
      });
    });

    return newHeaders;
  };

  // Apply subtle breathing glow effect to headers
  const applyBreathingGlow = (headers: HeaderElement[], currentTime: number) => {
    const baseBreathingCycle = 4000; // 4 second base cycle
    const glowIntensityRange = 0.15; // How much the glow varies (0.3 = 30% variation)
    const baseGlowIntensity = 0.05; // Base glow level

    headers.forEach(header => {
      // Calculate breathing wave with individual offsets and speeds
      const cycle = (currentTime - startTimeRef.current) * header.breathingSpeed / baseBreathingCycle;
      const breathingWave = Math.sin(cycle * 2 * Math.PI + header.breathingOffset);

      // Convert wave (-1 to 1) to glow intensity (baseGlow ± range)
      const glowIntensity = baseGlowIntensity + (breathingWave * glowIntensityRange);

      // Create layered text shadow with breathing intensity
      const glowSize = 8 + glowIntensity * 12; // 8px to 20px
      const glowOpacity = 0.5 + glowIntensity * 0.5; // 0.5 to 1.0
      const textShadowBase = 10 + glowIntensity * 8; // 10px to 18px
      const textShadowExtended = 20 + glowIntensity * 12; // 20px to 32px

      const breathingTextShadow = [
        `0 0 ${textShadowBase}px rgba(255, 255, 255, ${Math.min(glowOpacity * 0.8, 0.9)})`,
        `0 0 ${textShadowExtended}px rgba(255, 255, 255, ${Math.min(glowOpacity * 0.4, 0.5)})`,
        `0 0 ${glowSize}px rgba(255, 255, 255, ${Math.min(glowOpacity * 0.25, 0.3)})`
      ].join(', ');

      // Apply the breathing glow
      (header.element as HTMLElement).style.textShadow = breathingTextShadow;

      // Optional: very subtle filter glow for extra ambiance
      const filterGlow = `drop-shadow(0 0 ${glowSize * 0.5}px rgba(255, 255, 255, ${glowIntensity * 0.08}))`;
      (header.element as HTMLElement).style.filter = filterGlow;
    });
  };

  // Initialize dot positions when dimensions change
  useEffect(() => {
    if (dimensions.width <= 0 || dimensions.height <= 0) return;

    const positions: DotPosition[] = [];
    const rows = Math.ceil(dimensions.height / spacing) + 2;
    const cols = Math.ceil(dimensions.width / spacing) + 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * spacing;
        const y = row * spacing;
        positions.push({
          x,
          y,
          id: `${row}-${col}`,
          currentX: x,
          currentY: y,
        });
      }
    }

    setDotPositions(positions);
  }, [dimensions, spacing]);

  // Function to find connections between dots
  const findConnections = (positions: DotPosition[], mousePos: MousePosition | null) => {
    const newConnections: Connection[] = [];
    const maxDistance = 110;
    const maxConnections = 30;
    const connectionsPerDot = 3;

    const dotConnections = new Map<string, number>();
    const potentialConnections: Connection[] = [];

    for (let i = 0; i < positions.length; i++) {
      const dot1 = positions[i];

      for (let j = i + 1; j < positions.length; j++) {
        const dot2 = positions[j];

        const distance = Math.sqrt(
          Math.pow(dot1.currentX - dot2.currentX, 2) +
          Math.pow(dot1.currentY - dot2.currentY, 2)
        );

        if (distance <= maxDistance) {
          const baseOpacity = (1 - (distance / maxDistance)) * 0.45;
          let connectionOpacity = baseOpacity;

          if (mousePos) {
            const midX = (dot1.currentX + dot2.currentX) / 2;
            const midY = (dot1.currentY + dot2.currentY) / 2;
            const mouseDistance = Math.sqrt(
              Math.pow(mousePos.x - midX, 2) + Math.pow(mousePos.y - midY, 2)
            );
            const mouseInfluence = Math.max(0, 1 - mouseDistance / 250);
            connectionOpacity = Math.min(0.8, connectionOpacity + mouseInfluence * 0.25);
          }

          const connectionId = `${dot1.id}-${dot2.id}`;
          potentialConnections.push({
            dot1,
            dot2,
            distance,
            opacity: 0,
            targetOpacity: connectionOpacity,
            id: connectionId,
          });
        }
      }
    }

    potentialConnections.sort((a, b) => {
      const deltaX1 = Math.abs(a.dot1.currentX - a.dot2.currentX);
      const deltaY1 = Math.abs(a.dot1.currentY - a.dot2.currentY);
      const deltaX2 = Math.abs(b.dot1.currentX - b.dot2.currentX);
      const deltaY2 = Math.abs(b.dot1.currentY - b.dot2.currentY);

      const isDiagonal1 = deltaX1 > 10 && deltaY1 > 10;
      const isDiagonal2 = deltaX2 > 10 && deltaY2 > 10;

      const diagonalBonus1 = isDiagonal1 ? -15 : 0;
      const diagonalBonus2 = isDiagonal2 ? -15 : 0;
      const distanceScore = (a.distance - b.distance) * 1.5;
      const randomFactor = (Math.random() - 0.5) * 50;
      const opacityScore = (b.targetOpacity - a.targetOpacity) * 15;

      return distanceScore + randomFactor + opacityScore + diagonalBonus1 - diagonalBonus2;
    });

    for (const connection of potentialConnections) {
      if (newConnections.length >= maxConnections) break;

      const dot1Connections = dotConnections.get(connection.dot1.id) || 0;
      const dot2Connections = dotConnections.get(connection.dot2.id) || 0;

      if (dot1Connections < connectionsPerDot && dot2Connections < connectionsPerDot) {
        newConnections.push(connection);
        dotConnections.set(connection.dot1.id, dot1Connections + 1);
        dotConnections.set(connection.dot2.id, dot2Connections + 1);
      }
    }

    return newConnections;
  };

  // Smooth connection interpolation function
  const interpolateConnections = (currentConnections: Connection[], targetConnections: Connection[]) => {
    const interpolatedConnections: Connection[] = [];
    const fadeSpeed = 0.03;

    const currentConnectionMap = new Map<string, Connection>();
    currentConnections.forEach(conn => {
      currentConnectionMap.set(conn.id, conn);
    });

    targetConnections.forEach(targetConn => {
      const existingConn = currentConnectionMap.get(targetConn.id);

      if (existingConn) {
        const newOpacity = existingConn.opacity + (targetConn.targetOpacity - existingConn.opacity) * fadeSpeed;
        interpolatedConnections.push({
          ...existingConn,
          opacity: newOpacity,
          targetOpacity: targetConn.targetOpacity,
        });
      } else {
        interpolatedConnections.push({
          ...targetConn,
          opacity: fadeSpeed,
        });
      }
    });

    currentConnections.forEach(currentConn => {
      const stillExists = targetConnections.some(target => target.id === currentConn.id);

      if (!stillExists && currentConn.opacity > 0.01) {
        const newOpacity = Math.max(0, currentConn.opacity - fadeSpeed * 1.5);
        interpolatedConnections.push({
          ...currentConn,
          opacity: newOpacity,
          targetOpacity: 0,
        });
      }
    });

    return interpolatedConnections.filter(conn => conn.opacity > 0.01);
  };

  // Update dots and connections
  const updateDotsAndConnections = () => {
    if (!dotsRef.current || dotPositions.length === 0) return;

    const dots = dotsRef.current.children;
    const updatedPositions = [...dotPositions];

    for (let i = 0; i < Math.min(dots.length, updatedPositions.length); i++) {
      const dot = dots[i] as HTMLElement;
      const position = updatedPositions[i];
      const isConnected = connectedDots.has(position.id);
      const glowIntensity = dotGlowMap.current.get(position.id) || 0;

      if (!mousePosition) {
        dot.style.transform = 'translate(0, 0)';

        if (isConnected) {
          const starOpacity = Math.min(1, opacity + glowIntensity * 0.6);
          const glowSize = glowIntensity * 12;
          dot.style.opacity = starOpacity.toString();
          dot.style.boxShadow = `0 0 ${glowSize}px rgba(255, 255, 255, ${glowIntensity * 0.8})`;
        } else {
          dot.style.opacity = opacity.toString();
          dot.style.boxShadow = 'none';
        }

        position.currentX = position.x;
        position.currentY = position.y;
        continue;
      }

      const rect = dot.getBoundingClientRect();
      const dotCenterX = rect.left + rect.width / 2;
      const dotCenterY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(mousePosition.x - dotCenterX, 2) +
        Math.pow(mousePosition.y - dotCenterY, 2)
      );

      const maxDistance = 150;
      const maxOffset = 8;

      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        const offsetX = (mousePosition.x - dotCenterX) * force * (maxOffset / distance);
        const offsetY = (mousePosition.y - dotCenterY) * force * (maxOffset / distance);

        dot.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

        let finalOpacity = Math.min(1, opacity + force * 0.6);
        let finalGlowSize = force * 8;
        let finalGlowOpacity = Math.min(1, opacity + force * 0.6) * 0.3;

        if (isConnected) {
          finalOpacity = Math.max(finalOpacity, opacity + glowIntensity * 0.6);
          finalGlowSize = Math.max(finalGlowSize, glowIntensity * 12);
          finalGlowOpacity = Math.max(finalGlowOpacity, glowIntensity * 0.8);
        }

        dot.style.opacity = finalOpacity.toString();
        dot.style.boxShadow = `0 0 ${finalGlowSize}px rgba(255, 255, 255, ${finalGlowOpacity})`;

        position.currentX = position.x + offsetX;
        position.currentY = position.y + offsetY;
      } else {
        dot.style.transform = 'translate(0, 0)';

        if (isConnected) {
          const starOpacity = Math.min(1, opacity + glowIntensity * 0.6);
          const glowSize = glowIntensity * 12;
          dot.style.opacity = starOpacity.toString();
          dot.style.boxShadow = `0 0 ${glowSize}px rgba(255, 255, 255, ${glowIntensity * 0.8})`;
        } else {
          dot.style.opacity = opacity.toString();
          dot.style.boxShadow = 'none';
        }

        position.currentX = position.x;
        position.currentY = position.y;
      }
    }

    setDotPositions(updatedPositions);
  };

  // Separate function to update connections less frequently
  const updateConnections = () => {
    const now = Date.now();

    if (now - lastConnectionUpdateRef.current < 3000) return;

    lastConnectionUpdateRef.current = now;
    const targetConnections = findConnections(dotPositions, mousePosition);
    setStableConnections(targetConnections);

    const newConnectedDots = new Set<string>();
    targetConnections.forEach(connection => {
      newConnectedDots.add(connection.dot1.id);
      newConnectedDots.add(connection.dot2.id);

      if (!dotGlowMap.current.has(connection.dot1.id)) {
        dotGlowMap.current.set(connection.dot1.id, 0.3 + Math.random() * 0.7);
      }
      if (!dotGlowMap.current.has(connection.dot2.id)) {
        dotGlowMap.current.set(connection.dot2.id, 0.3 + Math.random() * 0.7);
      }
    });

    const dotsToRemove = [];
    for (const [dotId] of dotGlowMap.current) {
      if (!newConnectedDots.has(dotId)) {
        dotsToRemove.push(dotId);
      }
    }
    dotsToRemove.forEach(dotId => dotGlowMap.current.delete(dotId));

    setConnectedDots(newConnectedDots);
  };

  // Lightweight animation loop with breathing glow
  useEffect(() => {
    const animate = () => {
      const now = Date.now();
      const lastUpdate = lastUpdateRef.current;

      const shouldUpdateDots =
        !mousePosition ||
        now - lastUpdate.time > 50 ||
        Math.abs((mousePosition?.x || 0) - lastUpdate.x) > 10 ||
        Math.abs((mousePosition?.y || 0) - lastUpdate.y) > 10;

      if (shouldUpdateDots) {
        updateDotsAndConnections();
        lastUpdateRef.current = {
          x: mousePosition?.x || 0,
          y: mousePosition?.y || 0,
          time: now
        };
      }

      updateConnections();

      // Lightweight header scanning and breathing glow application
      const currentHeaders = scanForHeaders();
      setHeaderElements(currentHeaders);
      applyBreathingGlow(currentHeaders, now);

      setConnections(prevConnections =>
        interpolateConnections(prevConnections, stableConnections)
      );

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [mousePosition, dotPositions.length, opacity, stableConnections, connectedDots]);

  // Generate dots pattern
  const dots = [];
  if (dimensions.width > 0 && dimensions.height > 0) {
    const rows = Math.ceil(dimensions.height / spacing) + 2;
    const cols = Math.ceil(dimensions.width / spacing) + 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push(
          <div
            key={`${row}-${col}`}
            className="absolute rounded-full transition-opacity duration-300 ease-out"
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
    <div className={`absolute inset-0 pointer-events-none text-muted-foreground ${className}`}>
      {/* Constellation lines */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          height: `${dimensions.height}px`,
          maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 60%, transparent 85%)'
        }}
      >
        {connections.map((connection, index) => (
          <line
            key={connection.id}
            x1={connection.dot1.currentX}
            y1={connection.dot1.currentY}
            x2={connection.dot2.currentX}
            y2={connection.dot2.currentY}
            stroke="currentColor"
            strokeWidth="0.5"
            opacity={connection.opacity}
          />
        ))}
      </svg>

      {/* Dots */}
      <div
        ref={dotsRef}
        className="absolute inset-0"
        style={{
          height: `${dimensions.height}px`,
          maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 80%)'
        }}
      >
        {dots}
      </div>
    </div>
  );
};

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

// Enhanced PageWrapper component
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
      {/* Magnetic dots with constellation overlay */}
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