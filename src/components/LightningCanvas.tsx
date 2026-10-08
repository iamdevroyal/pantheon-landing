import React, { useEffect, useRef } from 'react';
import { sound } from '../utils/audio';

export const LightningCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Point {
      x: number;
      y: number;
    }

    interface LightningStrike {
      branches: Point[][];
      life: number;
      maxLife: number;
      color: string;
      flashIntensity: number;
    }

    let activeStrike: LightningStrike | null = null;
    let nextStrikeTime = Date.now() + 2000; // First strike in 2 seconds

    // Recursive procedural lightning branch generator
    const createLightningBranch = (
      start: Point,
      end: Point,
      displace: number,
      minSegment = 12
    ): Point[] => {
      const split = (p1: Point, p2: Point, depth: number): Point[] => {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.hypot(dx, dy);

        if (dist <= minSegment || depth <= 0) {
          return [p1, p2];
        }

        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;

        // Perpendicular offset with chaotic jitter
        const normalX = -dy / dist;
        const normalY = dx / dist;
        const offset = (Math.random() - 0.5) * displace * dist * 0.6;

        const midPoint: Point = {
          x: midX + normalX * offset,
          y: midY + normalY * offset,
        };

        const left = split(p1, midPoint, depth - 1);
        const right = split(midPoint, p2, depth - 1);

        return [...left.slice(0, -1), ...right];
      };

      return split(start, end, 5);
    };

    const triggerRandomLightning = () => {
      // Pick random start and end positions across the screen
      const startSide = Math.floor(Math.random() * 4); // 0: Top, 1: Top-Right, 2: Top-Left, 3: Side
      let start: Point = { x: 0, y: 0 };
      let end: Point = { x: 0, y: 0 };

      if (startSide === 0) {
        // From top cloud down to center/globe
        start = { x: Math.random() * width, y: 0 };
        end = { x: width * 0.3 + Math.random() * (width * 0.4), y: height * 0.4 + Math.random() * (height * 0.5) };
      } else if (startSide === 1) {
        // From top-right diagonal across
        start = { x: width * 0.7 + Math.random() * (width * 0.3), y: 0 };
        end = { x: Math.random() * (width * 0.5), y: height * 0.6 + Math.random() * (height * 0.4) };
      } else if (startSide === 2) {
        // From top-left diagonal down
        start = { x: Math.random() * (width * 0.3), y: 0 };
        end = { x: width * 0.4 + Math.random() * (width * 0.6), y: height * 0.5 + Math.random() * (height * 0.4) };
      } else {
        // Horizontal cloud-to-cloud arc
        start = { x: 0, y: Math.random() * (height * 0.3) };
        end = { x: width, y: Math.random() * (height * 0.4) };
      }

      const mainBranch = createLightningBranch(start, end, 0.45);
      const branches: Point[][] = [mainBranch];

      // Create 2–4 smaller forks sprouting from the main trunk
      const forkCount = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < forkCount; i++) {
        const forkIndex = Math.floor(Math.random() * (mainBranch.length - 10)) + 5;
        const forkOrigin = mainBranch[forkIndex];
        const forkAngle = Math.random() * Math.PI * 2;
        const forkLen = 80 + Math.random() * 180;
        const forkEnd: Point = {
          x: forkOrigin.x + Math.cos(forkAngle) * forkLen,
          y: forkOrigin.y + Math.sin(forkAngle) * forkLen,
        };
        branches.push(createLightningBranch(forkOrigin, forkEnd, 0.35, 16));
      }

      // Golden celestial lightning with cyan core
      const colors = ['#FFE785', '#FFD700', '#A0E6FF', '#FFFFFF'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      activeStrike = {
        branches,
        life: 0,
        maxLife: 16, // frames (short electric flicker)
        color,
        flashIntensity: 0.35,
      };

      // Subtle atmospheric rumble
      sound.playThunderBoom();

      // Schedule next strike between 4.5 and 9.5 seconds
      nextStrikeTime = Date.now() + 4500 + Math.random() * 5000;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Check if time for a new strike
      if (!activeStrike && Date.now() >= nextStrikeTime) {
        triggerRandomLightning();
      }

      if (activeStrike) {
        activeStrike.life++;
        const progress = activeStrike.life / activeStrike.maxLife;

        // Flicker pulse formula
        const flicker = Math.sin(activeStrike.life * 1.5) > 0 ? (1 - progress) : (1 - progress) * 0.3;

        if (flicker > 0.05) {
          // 1. Screen Flash overlay
          ctx.fillStyle = `rgba(255, 235, 170, ${activeStrike.flashIntensity * flicker * 0.35})`;
          ctx.fillRect(0, 0, width, height);

          // 2. Draw Lightning Branches
          activeStrike.branches.forEach((branch, bIdx) => {
            if (branch.length < 2) return;

            // Outer Aura Glow
            ctx.save();
            ctx.strokeStyle = activeStrike!.color;
            ctx.lineWidth = bIdx === 0 ? 5 * flicker : 3 * flicker;
            ctx.shadowColor = activeStrike!.color;
            ctx.shadowBlur = bIdx === 0 ? 25 : 15;
            ctx.globalAlpha = flicker * 0.85;
            ctx.beginPath();
            ctx.moveTo(branch[0].x, branch[0].y);
            for (let i = 1; i < branch.length; i++) {
              ctx.lineTo(branch[i].x, branch[i].y);
            }
            ctx.stroke();
            ctx.restore();

            // Inner Core Bright White Beam
            ctx.save();
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = bIdx === 0 ? 2 * flicker : 1 * flicker;
            ctx.globalAlpha = flicker;
            ctx.beginPath();
            ctx.moveTo(branch[0].x, branch[0].y);
            for (let i = 1; i < branch.length; i++) {
              ctx.lineTo(branch[i].x, branch[i].y);
            }
            ctx.stroke();
            ctx.restore();
          });
        }

        if (activeStrike.life >= activeStrike.maxLife) {
          activeStrike = null;
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    />
  );
};
