import React, { useEffect, useRef, useState } from 'react';

export const ThreeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Mouse tracking variables
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // 3D Point definition for our interactive mesh
    interface Point3D {
      x: number;
      y: number;
      z: number;
    }

    // Generate icosahedron-like vertices in 3D
    const generateIcosahedronVertices = (): Point3D[] => {
      const t = (1.0 + Math.sqrt(5.0)) / 2.0; // Golden ratio
      const raw = [
        { x: -1, y: t, z: 0 },
        { x: 1, y: t, z: 0 },
        { x: -1, y: -t, z: 0 },
        { x: 1, y: -t, z: 0 },
        { x: 0, y: -1, z: t },
        { x: 0, y: 1, z: t },
        { x: 0, y: -1, z: -t },
        { x: 0, y: 1, z: -t },
        { x: t, y: 0, z: -1 },
        { x: t, y: 0, z: 1 },
        { x: -t, y: 0, z: -1 },
        { x: -t, y: 0, z: 1 }
      ];

      // Normalize vertices to form a sphere of radius R
      const R = 180;
      return raw.map(p => {
        const len = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
        return {
          x: (p.x / len) * R,
          y: (p.y / len) * R,
          z: (p.z / len) * R
        };
      });
    };

    const vertices = generateIcosahedronVertices();

    // Define indices for faces (groups of 3 vertices) to draw glass facets
    const faces = [
      [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
      [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
      [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
      [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
    ];

    // Floating particles background
    interface Particle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 200 - 100,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 3 + 1,
        color: Math.random() > 0.5 ? 'rgba(14, 165, 233, 0.4)' : 'rgba(139, 92, 246, 0.4)',
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    // Geometry rotations angles
    let angleX = 0.003;
    let angleY = 0.005;

    // Projection function from 3D to 2D
    const project = (point: Point3D, screenWidth: number, screenHeight: number, fov: number, viewerDistance: number, offsetX: number, offsetY: number) => {
      // 3D coordinates relative to viewer
      const z = point.z + viewerDistance;
      // Perspective projection
      return {
        x: (point.x * fov) / z + offsetX,
        y: (point.y * fov) / z + offsetY,
        depth: point.z // preserve depth for z-sorting
      };
    };

    const rotateX = (point: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: point.x,
        y: point.y * cos - point.z * sin,
        z: point.y * sin + point.z * cos
      };
    };

    const rotateY = (point: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: point.x * cos + point.z * sin,
        y: point.y,
        z: -point.x * sin + point.z * cos
      };
    };

    const rotateZ = (point: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: point.x * cos - point.y * sin,
        y: point.x * sin + point.y * cos,
        z: point.z
      };
    };

    // Keep track of mesh rotated states
    let rotatedVertices = [...vertices];

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse tracking interpolation (lag)
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // 1. Draw elegant background organic light spots (blobs) using gradients
      const radialGradient1 = ctx.createRadialGradient(
        currentX, currentY, 10,
        currentX, currentY, 400
      );
      radialGradient1.addColorStop(0, 'rgba(14, 165, 233, 0.12)'); // Sky
      radialGradient1.addColorStop(0.5, 'rgba(139, 92, 246, 0.04)'); // Violet
      radialGradient1.addColorStop(1, 'rgba(248, 250, 252, 0)'); // slate-50
      
      ctx.fillStyle = radialGradient1;
      ctx.fillRect(0, 0, width, height);

      const oppositeX = width - currentX;
      const oppositeY = height - currentY;
      const radialGradient2 = ctx.createRadialGradient(
        oppositeX, oppositeY, 50,
        oppositeX, oppositeY, 500
      );
      radialGradient2.addColorStop(0, 'rgba(37, 99, 235, 0.08)'); // Blue
      radialGradient2.addColorStop(0.6, 'rgba(14, 165, 233, 0.02)');
      radialGradient2.addColorStop(1, 'rgba(248, 250, 252, 0)');

      ctx.fillStyle = radialGradient2;
      ctx.fillRect(0, 0, width, height);

      // 2. Render and update background particles
      particles.forEach(p => {
        // Subtle magnetic pull towards mouse
        const dx = targetX - p.x;
        const dy = targetY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 300) {
          const force = (300 - dist) / 1000;
          p.vx += (dx / dist) * force * 0.15;
          p.vy += (dy / dist) * force * 0.15;
        }

        // Limit velocity
        const maxV = 1.5;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > maxV) {
          p.vx = (p.vx / speed) * maxV;
          p.vy = (p.vy / speed) * maxV;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // 3. Render the interactive 3D Refractive mesh
      // Rotate the original vertices incrementally
      // Base rotation + mouse interaction offset rotation
      const mouseAngleY = (currentX - width / 2) * 0.00005;
      const mouseAngleX = (currentY - height / 2) * 0.00005;

      rotatedVertices = rotatedVertices.map(v => {
        let r = rotateY(v, angleY + mouseAngleY);
        r = rotateX(r, angleX + mouseAngleX);
        r = rotateZ(r, 0.001);
        return r;
      });

      // Central position of the 3D visualizer
      // On desktop, place it towards the middle-right to balance the left-aligned hero text
      const isMobile = width < 768;
      const centerX = isMobile ? width / 2 : width * 0.65;
      const centerY = isMobile ? height * 0.55 : height * 0.5;

      const fov = 400;
      const viewerDistance = 350;

      // Project vertices to 2D
      const projected = rotatedVertices.map(v => project(v, width, height, fov, viewerDistance, centerX, centerY));

      // Calculate face depths for painter's algorithm (Z-sorting)
      const sortedFaces = faces.map((face, index) => {
        const p1 = projected[face[0]];
        const p2 = projected[face[1]];
        const p3 = projected[face[2]];
        const averageDepth = (p1.depth + p2.depth + p3.depth) / 3;
        return { face, index, averageDepth };
      }).sort((a, b) => b.averageDepth - a.averageDepth); // draw back-to-front

      // Draw glass facets
      sortedFaces.forEach(({ face, averageDepth }) => {
        const p1 = projected[face[0]];
        const p2 = projected[face[1]];
        const p3 = projected[face[2]];

        // Back-face culling simulation based on vertex order
        const v1x = p2.x - p1.x;
        const v1y = p2.y - p1.y;
        const v2x = p3.x - p1.x;
        const v2y = p3.y - p1.y;
        const crossProduct = v1x * v2y - v1y * v2x;

        // Draw even if culled but with different opacity to simulate refraction/specular back-surface
        const isFacing = crossProduct > 0;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();

        // Calculate translucent colors reflecting depth and mouse lighting
        const depthFactor = (averageDepth + 180) / 360; // normalized 0 to 1
        
        if (isFacing) {
          // Front glass face
          const gradient = ctx.createLinearGradient(p1.x, p1.y, p3.x, p3.y);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${0.4 + (1 - depthFactor) * 0.3})`);
          gradient.addColorStop(0.5, `rgba(14, 165, 233, ${0.15 + (1 - depthFactor) * 0.15})`);
          gradient.addColorStop(1, `rgba(139, 92, 246, ${0.15 + depthFactor * 0.15})`);
          
          ctx.fillStyle = gradient;
          ctx.fill();

          // Highlight edge border
          ctx.strokeStyle = `rgba(14, 165, 233, ${0.3 + (1 - depthFactor) * 0.2})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        } else {
          // Back refractive face (softer refraction)
          ctx.fillStyle = `rgba(139, 92, 246, ${0.05 + depthFactor * 0.1})`;
          ctx.fill();

          ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 + depthFactor * 0.1})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      // 4. Draw delicate vertices overlays with interactive glowing dots
      projected.forEach(p => {
        const depthFactor = (p.depth + 180) / 360; // 0 to 1
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4 * (1.2 - depthFactor), 0, Math.PI * 2);
        ctx.fillStyle = depthFactor < 0.5 ? '#0ea5e9' : '#8b5cf6';
        ctx.shadowBlur = 10;
        ctx.shadowColor = depthFactor < 0.5 ? '#0ea5e9' : '#8b5cf6';
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full bg-transparent overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
};
