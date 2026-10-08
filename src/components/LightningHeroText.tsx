import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../utils/audio';

interface LightningHeroTextProps {
  primaryLine?: string;
  highlightLine?: string;
}

export const LightningHeroText: React.FC<LightningHeroTextProps> = ({
  primaryLine = 'WHEN THE GODS AWAKEN',
  highlightLine = 'MORTALS CLAIM THE HEAVENS',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isStriking, setIsStriking] = useState(false);

  // Crackling electric arcs on canvas across the text
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 200);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Procedural electric spark arcs
    interface Arc {
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      alpha: number;
      life: number;
      color: string;
      segments: { x: number; y: number }[];
    }

    const activeArcs: Arc[] = [];

    const createArc = (sx?: number, sy?: number, ex?: number, ey?: number) => {
      const startX = sx ?? Math.random() * width;
      const startY = sy ?? Math.random() * height;
      const endX = ex ?? startX + (Math.random() - 0.5) * 160;
      const endY = ey ?? startY + (Math.random() - 0.5) * 60;

      const segments: { x: number; y: number }[] = [{ x: startX, y: startY }];
      const steps = 6 + Math.floor(Math.random() * 6);
      const dx = (endX - startX) / steps;
      const dy = (endY - startY) / steps;

      let curX = startX;
      let curY = startY;

      for (let i = 1; i < steps; i++) {
        curX += dx + (Math.random() - 0.5) * 24;
        curY += dy + (Math.random() - 0.5) * 20;
        segments.push({ x: curX, y: curY });
      }
      segments.push({ x: endX, y: endY });

      const colors = ['#70D6FF', '#00F0FF', '#FFE600', '#FFFFFF', '#FFB703'];
      return {
        startX,
        startY,
        endX,
        endY,
        alpha: 1.0,
        life: 0.15 + Math.random() * 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
        segments,
      };
    };

    let lastSpawn = 0;

    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      // Periodically spawn crackling sparks along letters
      if (time - lastSpawn > 90) {
        lastSpawn = time;
        if (Math.random() > 0.25) {
          activeArcs.push(createArc());
        }
      }

      // Draw and decay arcs
      for (let i = activeArcs.length - 1; i >= 0; i--) {
        const arc = activeArcs[i];
        arc.alpha -= 0.055;

        if (arc.alpha <= 0) {
          activeArcs.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = arc.color;
        ctx.globalAlpha = arc.alpha;
        ctx.lineWidth = 1.5 + arc.alpha * 2;
        ctx.shadowColor = arc.color;
        ctx.shadowBlur = 14;

        ctx.beginPath();
        arc.segments.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();

        // Inner white hot core
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Trigger manual thunder strike on click
  const handleTriggerStrike = () => {
    setIsStriking(true);
    sound.playThunder();
    sound.playChime(1200);
    setTimeout(() => setIsStriking(false), 500);
  };

  const renderSentenceWords = (sentence: string) => {
    const words = sentence.trim().split(/\s+/);
    return words.map((word, wIdx) => (
      <span
        key={wIdx}
        style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          margin: '0 0.18em',
        }}
      >
        {word.split('').map((char, cIdx) => (
          <span key={cIdx} className="lightning-glyph revealed">
            {char}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <div
      ref={containerRef}
      onClick={handleTriggerStrike}
      title="Click to unleash celestial thunder"
      style={{
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer',
        userSelect: 'none',
        padding: '6px 0',
        width: '100%',
        maxWidth: '100%',
      }}
    >
      {/* Dynamic Overlay Canvas for Electric Arcs */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 4,
        }}
      />

      <h1
        className={`lightning-hero-header ${isStriking ? 'lightning-striking' : ''}`}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(24px, 4.2vw, 58px)',
          fontWeight: 900,
          lineHeight: 1.18,
          marginBottom: '16px',
          letterSpacing: '0.8px',
          position: 'relative',
          zIndex: 2,
          textTransform: 'uppercase',
          transition: 'transform 0.1s ease',
          width: '100%',
          maxWidth: '100%',
          wordBreak: 'normal',
        }}
      >
        {/* Line 1: Primordial Call */}
        <span
          style={{
            display: 'block',
            position: 'relative',
            color: '#F8F9FF',
            textShadow: isStriking
              ? '0 0 25px #00F0FF, 0 0 50px #70D6FF, 0 0 90px #FFFFFF'
              : '0 0 12px rgba(112, 214, 255, 0.4), 0 2px 4px rgba(0, 0, 0, 0.8)',
          }}
        >
          {renderSentenceWords(primaryLine)}
        </span>

        {/* Line 2: Blazing Gold & Electric Arc Title */}
        <span
          className="lightning-gold-gradient"
          style={{
            display: 'block',
            marginTop: '8px',
            position: 'relative',
          }}
        >
          {renderSentenceWords(highlightLine)}
        </span>
      </h1>

      {/* Micro-spark status indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '10px',
          color: '#70D6FF',
          letterSpacing: '2px',
          fontFamily: 'var(--font-mono)',
          opacity: 0.8,
          marginTop: '-4px',
          marginBottom: '20px',
        }}
      >

      </div>
    </div>
  );
};
export default LightningHeroText;
