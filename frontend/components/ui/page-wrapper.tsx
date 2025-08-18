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

interface DotsOverlayProps {
  mousePosition: MousePosition | null;
  className?: string;
  dotSize?: number;
  spacing?: number;
  opacity?: number;
}

// Enhanced DotsOverlay component with constellation effect
const DotsOverlay = ({ mousePosition, className = "", dotSize = 1, spacing = 40, opacity = 0.4 }: DotsOverlayProps) => {
  const dotsRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [dotPositions, setDotPositions] = useState<DotPosition[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [stableConnections, setStableConnections] = useState<Connection[]>([]);
  const [connectedDots, setConnectedDots] = useState<Set<string>>(new Set());
  const frameRef = useRef<number>(0);
  const lastUpdateRef = useRef({ x: 0, y: 0, time: 0 });
  const lastConnectionUpdateRef = useRef<number>(0);
  const dotGlowMap = useRef<Map<string, number>>(new Map());

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

  // Function to find connections between dots with better distribution and less mouse influence
  const findConnections = (positions: DotPosition[], mousePos: MousePosition | null) => {
    const newConnections: Connection[] = [];
    const maxDistance = 110; // Slightly increased to better capture diagonals
    const maxConnections = 30; // More connections to show more variety
    const connectionsPerDot = 3; // Max connections per dot

    const dotConnections = new Map<string, number>();

    // Find all potential connections first
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
          const baseOpacity = (1 - (distance / maxDistance)) * 0.45; // Increased base brightness
          let connectionOpacity = baseOpacity;

          // Much more subtle mouse influence
          if (mousePos) {
            const midX = (dot1.currentX + dot2.currentX) / 2;
            const midY = (dot1.currentY + dot2.currentY) / 2;
            const mouseDistance = Math.sqrt(
              Math.pow(mousePos.x - midX, 2) + Math.pow(mousePos.y - midY, 2)
            );
            // Reduced influence radius and strength
            const mouseInfluence = Math.max(0, 1 - mouseDistance / 250);
            connectionOpacity = Math.min(0.8, connectionOpacity + mouseInfluence * 0.25); // Higher max brightness
          }

          const connectionId = `${dot1.id}-${dot2.id}`;
          potentialConnections.push({
            dot1,
            dot2,
            distance,
            opacity: 0, // Start at 0 for smooth fade-in
            targetOpacity: connectionOpacity,
            id: connectionId,
          });
        }
      }
    }

    // Sort potential connections with balanced weighting for different connection types
    potentialConnections.sort((a, b) => {
      // Calculate connection angles to identify diagonal vs straight lines
      const deltaX1 = Math.abs(a.dot1.currentX - a.dot2.currentX);
      const deltaY1 = Math.abs(a.dot1.currentY - a.dot2.currentY);
      const deltaX2 = Math.abs(b.dot1.currentX - b.dot2.currentX);
      const deltaY2 = Math.abs(b.dot1.currentY - b.dot2.currentY);

      const isDiagonal1 = deltaX1 > 10 && deltaY1 > 10; // Both X and Y change significantly
      const isDiagonal2 = deltaX2 > 10 && deltaY2 > 10;

      // Slight preference for diagonal connections to increase variety
      const diagonalBonus1 = isDiagonal1 ? -15 : 0;
      const diagonalBonus2 = isDiagonal2 ? -15 : 0;

      // Favor shorter distances (but less strongly to allow more variety)
      const distanceScore = (a.distance - b.distance) * 1.5;

      // Add randomness to prevent clustering
      const randomFactor = (Math.random() - 0.5) * 50;

      // Very minimal preference for connections with higher opacity
      const opacityScore = (b.targetOpacity - a.targetOpacity) * 15;

      return distanceScore + randomFactor + opacityScore + diagonalBonus1 - diagonalBonus2;
    });

    // Select connections while respecting limits and ensuring distribution
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
    const fadeSpeed = 0.03; // Slower fade speed for smoother transitions

    // Create a map of existing connections for quick lookup
    const currentConnectionMap = new Map<string, Connection>();
    currentConnections.forEach(conn => {
      currentConnectionMap.set(conn.id, conn);
    });

    // Handle target connections
    targetConnections.forEach(targetConn => {
      const existingConn = currentConnectionMap.get(targetConn.id);

      if (existingConn) {
        // Existing connection - smoothly interpolate towards target
        const newOpacity = existingConn.opacity + (targetConn.targetOpacity - existingConn.opacity) * fadeSpeed;
        interpolatedConnections.push({
          ...existingConn,
          opacity: newOpacity,
          targetOpacity: targetConn.targetOpacity,
        });
      } else {
        // New connection - start fading in from 0
        interpolatedConnections.push({
          ...targetConn,
          opacity: fadeSpeed, // Start very low
        });
      }
    });

    // Handle connections that should fade out
    currentConnections.forEach(currentConn => {
      const stillExists = targetConnections.some(target => target.id === currentConn.id);

      if (!stillExists && currentConn.opacity > 0.01) {
        // Fade out existing connection
        const newOpacity = Math.max(0, currentConn.opacity - fadeSpeed * 1.5); // Fade out slightly faster
        interpolatedConnections.push({
          ...currentConn,
          opacity: newOpacity,
          targetOpacity: 0,
        });
      }
    });

    return interpolatedConnections.filter(conn => conn.opacity > 0.01); // Remove fully faded connections
  };
  // Update dots and connections
  const updateDotsAndConnections = () => {
    if (!dotsRef.current || dotPositions.length === 0) return;

    const dots = dotsRef.current.children;
    const updatedPositions = [...dotPositions];

    // Update dot positions and visual effects
    for (let i = 0; i < Math.min(dots.length, updatedPositions.length); i++) {
      const dot = dots[i] as HTMLElement;
      const position = updatedPositions[i];
      const isConnected = connectedDots.has(position.id);
      const glowIntensity = dotGlowMap.current.get(position.id) || 0;

      if (!mousePosition) {
        // Reset dots when mouse leaves
        dot.style.transform = 'translate(0, 0)';

        // Apply star glow effect for connected dots
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

        // Combine mouse interaction with star glow effect
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

        // Apply star glow effect for connected dots
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

    // Only update connections every 2 seconds for slower, more stable changes
    if (now - lastConnectionUpdateRef.current < 3000) return;

    lastConnectionUpdateRef.current = now;
    const targetConnections = findConnections(dotPositions, mousePosition);
    setStableConnections(targetConnections);

    // Update which dots are connected and assign random glow values
    const newConnectedDots = new Set<string>();
    targetConnections.forEach(connection => {
      newConnectedDots.add(connection.dot1.id);
      newConnectedDots.add(connection.dot2.id);

      // Assign random glow values to newly connected dots
      if (!dotGlowMap.current.has(connection.dot1.id)) {
        dotGlowMap.current.set(connection.dot1.id, 0.3 + Math.random() * 0.7); // Random glow between 0.3-1.0
      }
      if (!dotGlowMap.current.has(connection.dot2.id)) {
        dotGlowMap.current.set(connection.dot2.id, 0.3 + Math.random() * 0.7);
      }
    });

    // Remove glow values for dots that are no longer connected
    const dotsToRemove = [];
    for (const [dotId] of dotGlowMap.current) {
      if (!newConnectedDots.has(dotId)) {
        dotsToRemove.push(dotId);
      }
    }
    dotsToRemove.forEach(dotId => dotGlowMap.current.delete(dotId));

    setConnectedDots(newConnectedDots);
  };

  // Animation loop with separated dot and connection updates
  useEffect(() => {
    const animate = () => {
      const now = Date.now();
      const lastUpdate = lastUpdateRef.current;

      // Update dots more frequently for responsive feel
      const shouldUpdateDots =
        !mousePosition ||
        now - lastUpdate.time > 50 || // Update every 50ms for dots
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

      // Update connections much less frequently
      updateConnections();

      // Smooth interpolation of connection opacities every frame
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