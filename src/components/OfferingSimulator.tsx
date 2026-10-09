import React, { useState } from 'react';
import type { Currency } from './CurrencyToggle';
import type { ContinentData } from '../data/continents';
import { FEATURED_DEITIES, type DeityPreview } from '../data/deities';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { Flame, RotateCcw, Sparkles } from 'lucide-react';

interface OfferingSimulatorProps {
  currency: Currency;
  selectedContinent: ContinentData;
  onSimulateSpin: (spinning: boolean) => void;
}

export const OfferingSimulator: React.FC<OfferingSimulatorProps> = ({
  currency,
  selectedContinent,
  onSimulateSpin,
}) => {
  const [selectedTier, setSelectedTier] = useState<'small' | 'medium' | 'large' | 'supreme'>('medium');
  const [isPulling, setIsPulling] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [revealDeity, setRevealDeity] = useState<DeityPreview | null>(null);
  const [payoutResult, setPayoutResult] = useState<{ win: boolean; amount: number; multiplier: number } | null>(null);

  // 3D Card tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const tiers = {
    NGN: [
      { id: 'small', name: 'Small Offering', amount: 10, label: '₦10', edge: '22% Edge' },
      { id: 'medium', name: 'Medium Offering', amount: 100, label: '₦100', edge: '18% Edge' },
      { id: 'large', name: 'Large Offering', amount: 500, label: '₦500', edge: '15% Edge' },
      { id: 'supreme', name: 'Supreme Offering', amount: 2500, label: '₦2,500', edge: '12% Edge' },
    ],
    USD: [
      { id: 'small', name: 'Small Offering', amount: 0.1, label: '$0.10', edge: '22% Edge' },
      { id: 'medium', name: 'Medium Offering', amount: 1.0, label: '$1.00', edge: '18% Edge' },
      { id: 'large', name: 'Large Offering', amount: 5.0, label: '$5.00', edge: '15% Edge' },
      { id: 'supreme', name: 'Supreme Offering', amount: 25.0, label: '$25.00', edge: '12% Edge' },
    ],
  };

  const currentTiers = tiers[currency];
  const activeBetObj = currentTiers.find((t) => t.id === selectedTier) || currentTiers[1];

  const handlePledge = () => {
    if (isPulling) return;
    setIsPulling(true);
    setRevealDeity(null);
    setPayoutResult(null);
    onSimulateSpin(true);
    sound.playChime(660);

    // 2.2 second ritual sequence
    setTimeout(() => {
      const continentPool = FEATURED_DEITIES.filter((d) => d.continent === selectedContinent.id);
      const poolToPick = continentPool.length > 0 ? continentPool : FEATURED_DEITIES;
      const picked = poolToPick[Math.floor(Math.random() * poolToPick.length)];

      const isWin = Math.random() < 0.8; // 80% win rate preview
      const mult = isWin ? picked.multiplier : 0;
      const payout = isWin ? Number((activeBetObj.amount * mult).toFixed(2)) : 0;

      // Trigger thunder boom & camera shake
      sound.playThunderBoom();
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);

      setRevealDeity(picked);
      setPayoutResult({ win: isWin, amount: payout, multiplier: mult });
      setIsPulling(false);
      onSimulateSpin(false);

      if (isWin) {
        confetti({
          particleCount: 120,
          spread: 85,
          origin: { y: 0.65 },
          colors: ['#FFD700', '#C8860A', '#FFFFFF', '#4CAF50', '#80A4FF'],
        });
      }
    }, 2200);
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const getRarityStars = (rarity: string) => {
    switch (rarity) {
      case 'MYTHIC': return '★★★★★★';
      case 'LEGENDARY': return '★★★★★';
      case 'EPIC': return '★★★★';
      case 'RARE': return '★★★';
      case 'UNCOMMON': return '★★';
      default: return '★';
    }
  };

  const symbol = currency === 'USD' ? '$' : '₦';

  return (
    <div
      className={`ornate-card simulator-container-card ${isShaking ? 'camera-shake' : ''}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(16, 16, 38, 0.95) 0%, rgba(7, 7, 20, 0.98) 100%)',
      }}
    >
      {/* Decorative Golden Armillary Sigil in Background */}
      <div
        className="rune-spin-slow"
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          border: '1px dashed rgba(200, 134, 10, 0.15)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#FFD700' }}><Sparkles size={16} /></span>
            <span style={{ fontSize: '11px', color: 'var(--accent-light)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 800 }}>
              SACRED OFFERING SHRINE · LIVE SIMULATOR
            </span>
          </div>
          <h3 className="simulator-title" style={{ fontFamily: 'var(--font-display)', color: '#FFF', marginTop: '4px' }}>
            Pledge Offering to {selectedContinent.name}
          </h3>
        </div>

        {/* Currency Indicator Pill */}
        <div
          style={{
            background: 'rgba(25, 25, 55, 0.7)',
            border: '1px solid var(--border-gold)',
            borderRadius: '20px',
            padding: '6px 16px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ color: 'var(--text-muted)' }}>Wagering In:</span>
          <span style={{ color: currency === 'USD' ? '#4CAF50' : '#00A86B', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
            {currency} ({symbol})
          </span>
        </div>
      </div>

      {/* Offering Bet Tier Grid */}
      <div
        className="tier-grid"
        style={{
          marginBottom: '28px',
        }}
      >
        {currentTiers.map((tier) => {
          const isSelected = tier.id === selectedTier;
          return (
            <button
              key={tier.id}
              className={`tier-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => {
                sound.playChime(750);
                setSelectedTier(tier.id as any);
              }}
              disabled={isPulling}
              style={{
                background: isSelected 
                  ? 'linear-gradient(135deg, rgba(200, 134, 10, 0.35) 0%, rgba(26, 26, 62, 0.7) 100%)' 
                  : 'rgba(20, 20, 48, 0.6)',
                border: isSelected ? '2px solid #FFD700' : '1px solid rgba(200, 134, 10, 0.2)',
                borderRadius: '12px',
                padding: '16px 12px',
                color: isSelected ? '#FFD700' : '#E0E0FF',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.25s ease',
                boxShadow: isSelected ? '0 0 24px rgba(200, 134, 10, 0.45), inset 0 1px 0 rgba(255,215,0,0.5)' : 'none',
                transform: isSelected ? 'scale(1.03)' : 'scale(1)',
              }}
            >
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {tier.name}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 800 }}>
                {tier.label}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-dim)', marginTop: '4px' }}>
                {tier.edge}
              </div>
            </button>
          );
        })}
      </div>

      {/* Primary Summon Action CTA */}
      <div style={{ textAlign: 'center', marginBottom: revealDeity ? '28px' : '0' }}>
        <button
          className="btn-gold summon-main-btn"
          onClick={handlePledge}
          disabled={isPulling}
          style={{
            width: '100%',
            maxWidth: '420px',
            opacity: isPulling ? 0.75 : 1,
          }}
        >
          {isPulling ? (
            <>
              <RotateCcw className="animate-spin" size={22} />
              THE SPHERE SPINS... AWAKENING GODS...
            </>
          ) : (
            <>
              <Flame size={22} />
              PLEDGE {activeBetObj.label} SACRED OFFERING
            </>
          )}
        </button>
      </div>

      {/* 3D Holographic Deity Reveal Card */}
      {revealDeity && payoutResult && (
        <div
          className="holo-card reveal-card"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          style={{
            marginTop: '28px',
            padding: '32px',
            background: 'linear-gradient(135deg, rgba(28, 28, 68, 0.95) 0%, rgba(12, 12, 30, 0.98) 100%)',
            border: `2px solid ${revealDeity.primaryColor}`,
            boxShadow: `0 0 45px ${revealDeity.primaryColor}60, inset 0 0 25px ${revealDeity.primaryColor}20`,
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: 'transform 0.1s ease-out',
            borderRadius: '16px',
          }}
        >
          <div className="reveal-card-body" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
            {/* Left: Lore & Deity Identity */}
            <div className="reveal-card-lore" style={{ flex: '1 1 300px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    background: revealDeity.primaryColor,
                    color: '#070714',
                    padding: '3px 10px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 900,
                    letterSpacing: '1px',
                  }}
                >
                  {revealDeity.rarity}
                </span>
                <span style={{ color: '#FFD700', fontSize: '13px', letterSpacing: '1px' }}>
                  {getRarityStars(revealDeity.rarity)}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {revealDeity.culture} Tradition · {revealDeity.country}
                </span>
              </div>

              <h4 className="reveal-card-title" style={{ fontFamily: 'var(--font-display)', color: '#FFF', fontWeight: 900, letterSpacing: '0.5px' }}>
                {revealDeity.name}
              </h4>

              <div style={{ fontSize: '14px', color: 'var(--accent-light)', fontStyle: 'italic', marginBottom: '10px' }}>
                Bearing: <strong>{revealDeity.heldObject}</strong>
              </div>

              <p style={{ fontSize: '13px', color: '#D0CFE8', lineHeight: '1.6', maxWidth: '520px', fontFamily: 'var(--font-lore)' }}>
                "{revealDeity.lore}"
              </p>
            </div>

            {/* Right: Divine Payout Gauge */}
            <div
              className="reveal-card-payout"
              style={{
                textAlign: 'center',
                background: payoutResult.win ? 'rgba(76, 175, 80, 0.12)' : 'rgba(231, 76, 60, 0.12)',
                border: `1px solid ${payoutResult.win ? '#4CAF50' : '#E74C3C'}`,
                padding: '24px 28px',
                borderRadius: '14px',
                minWidth: '220px',
                boxShadow: payoutResult.win ? '0 0 25px rgba(76, 175, 80, 0.3)' : 'none',
              }}
            >
              <div style={{ fontSize: '12px', color: payoutResult.win ? '#81C784' : '#FF8A80', fontWeight: 800, letterSpacing: '1px' }}>
                {payoutResult.win ? '✨ DIVINE FAVOR GRANTED' : 'OFFERING CONSUMED'}
              </div>

              <div
                className="reveal-card-payout-val"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 900,
                  color: payoutResult.win ? '#FFD700' : '#BBB',
                  margin: '6px 0',
                }}
              >
                {payoutResult.win ? `${symbol}${payoutResult.amount.toLocaleString()}` : `${symbol}0.00`}
              </div>

              {payoutResult.win && (
                <div style={{ fontSize: '12px', color: 'var(--accent-light)', fontWeight: 700 }}>
                  Multiplier: ×{revealDeity.multiplier} ({revealDeity.outcomeType} FX)
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
