import React, { useState } from 'react';
import { sound } from '../utils/audio';

export type Currency = 'NGN' | 'USD';

interface CurrencyToggleProps {
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
}

export const CurrencyToggle: React.FC<CurrencyToggleProps> = ({
  currency,
  onCurrencyChange,
}) => {
  const [isFlipping, setIsFlipping] = useState(false);

  const handleToggle = (newCurr: Currency) => {
    if (newCurr === currency) return;
    setIsFlipping(true);
    sound.playCoinFlip();
    onCurrencyChange(newCurr);
    setTimeout(() => setIsFlipping(false), 520);
  };

  return (
    <div
      className={`currency-toggle-pill ${isFlipping ? 'coin-flip-anim' : ''}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, rgba(25, 25, 55, 0.95) 0%, rgba(10, 10, 26, 0.98) 100%)',
        border: '1px solid var(--border-gold)',
        borderRadius: '30px',
        padding: '2px',
        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 215, 0, 0.2)',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      {/* NGN Button */}
      <button
        type="button"
        onClick={() => handleToggle('NGN')}
        className={`currency-btn ${currency === 'NGN' ? 'active-ngn' : ''}`}
        style={{
          background: currency === 'NGN' 
            ? 'linear-gradient(135deg, #00A86B 0%, #005F38 100%)' 
            : 'transparent',
          color: currency === 'NGN' ? '#FFFFFF' : '#8A89A6',
          border: currency === 'NGN' ? '1px solid #4ECCA3' : 'none',
          borderRadius: '24px',
          fontWeight: 800,
          fontFamily: 'var(--font-mono)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: currency === 'NGN' ? '0 0 14px rgba(0, 168, 107, 0.55), inset 0 1px 0 rgba(255,255,255,0.4)' : 'none',
          textShadow: currency === 'NGN' ? '0 1px 4px rgba(0,0,0,0.6)' : 'none',
        }}
        title="Switch to Nigerian Naira (₦ NGN)"
      >
        <span className="currency-flag">🇳🇬</span>
        <span className="currency-symbol">₦</span>
        <span className="currency-label-code"> NGN</span>
      </button>

      {/* USD Button */}
      <button
        type="button"
        onClick={() => handleToggle('USD')}
        className={`currency-btn ${currency === 'USD' ? 'active-usd' : ''}`}
        style={{
          background: currency === 'USD' 
            ? 'linear-gradient(135deg, #FFD700 0%, #C8860A 100%)' 
            : 'transparent',
          color: currency === 'USD' ? '#070714' : '#8A89A6',
          border: currency === 'USD' ? '1px solid #FFE57F' : 'none',
          borderRadius: '24px',
          fontWeight: 800,
          fontFamily: 'var(--font-mono)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: currency === 'USD' ? '0 0 14px rgba(255, 215, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.6)' : 'none',
          textShadow: currency === 'USD' ? '0 1px 2px rgba(255,255,255,0.4)' : 'none',
        }}
        title="Switch to US Dollar ($ USD)"
      >
        <span className="currency-flag">🇺🇸</span>
        <span className="currency-symbol">$</span>
        <span className="currency-label-code"> USD</span>
      </button>
    </div>
  );
};
