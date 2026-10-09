import React, { useEffect, useState } from 'react';
import type { Currency } from './CurrencyToggle';
import { Sparkles, Globe, Compass } from 'lucide-react';

interface JackpotTickerProps {
  currency: Currency;
  continentName: string;
}

export const JackpotTicker: React.FC<JackpotTickerProps> = ({ currency, continentName }) => {
  // Live ticking amounts
  const [localPool, setLocalPool] = useState(currency === 'NGN' ? 84200 : 124.5);
  const [contPool, setContPool] = useState(currency === 'NGN' ? 420500 : 850.0);
  const [worldPool, setWorldPool] = useState(currency === 'NGN' ? 2140000 : 12450.0);

  // Sync baseline when currency flips
  useEffect(() => {
    if (currency === 'NGN') {
      setLocalPool(84200);
      setContPool(420500);
      setWorldPool(2140000);
    } else {
      setLocalPool(124.5);
      setContPool(850.0);
      setWorldPool(12450.0);
    }
  }, [currency]);

  // Subtle real-time increments simulating live game feed
  useEffect(() => {
    const interval = setInterval(() => {
      const increment = currency === 'NGN' ? Math.floor(Math.random() * 25) + 5 : Number((Math.random() * 0.08 + 0.01).toFixed(2));
      setWorldPool((prev) => prev + increment * 3);
      setContPool((prev) => prev + increment * 2);
      setLocalPool((prev) => prev + increment);
    }, 2400);

    return () => clearInterval(interval);
  }, [currency]);

  const symbol = currency === 'USD' ? '$' : '₦';
  const formatAmount = (val: number) => {
    return symbol + val.toLocaleString('en-US', { minimumFractionDigits: currency === 'USD' ? 2 : 0, maximumFractionDigits: 2 });
  };

  return (
    <div
      className="glass-panel jackpot-ticker-panel"
      style={{
        border: '1px solid rgba(200, 134, 10, 0.3)',
      }}
    >
      {/* Local Pool */}
      <div className="jackpot-item" style={{ display: 'flex', alignItems: 'center' }}>
        <div
          className="jackpot-icon"
          style={{
            borderRadius: '50%',
            background: 'rgba(200, 134, 10, 0.15)',
            border: '1px solid rgba(200, 134, 10, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFD700',
            flexShrink: 0,
          }}
        >
          <Compass size={18} />
        </div>
        <div className="jackpot-info">
          <div className="jackpot-title" style={{ color: 'var(--text-muted)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
            LOCAL {continentName.toUpperCase()} POOL
          </div>
          <div className="jackpot-value" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#FFD700' }}>
            {formatAmount(localPool)}
          </div>
        </div>
      </div>

      <div className="jackpot-divider" style={{ width: '1px', height: '32px', background: 'rgba(255, 255, 255, 0.1)' }} />

      {/* Continental Pool */}
      <div className="jackpot-item" style={{ display: 'flex', alignItems: 'center' }}>
        <div
          className="jackpot-icon"
          style={{
            borderRadius: '50%',
            background: 'rgba(68, 102, 204, 0.15)',
            border: '1px solid rgba(68, 102, 204, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#80A4FF',
            flexShrink: 0,
          }}
        >
          <Globe size={18} />
        </div>
        <div className="jackpot-info">
          <div className="jackpot-title" style={{ color: 'var(--text-muted)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
            CONTINENTAL POOL
          </div>
          <div className="jackpot-value" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#80A4FF' }}>
            {formatAmount(contPool)}
          </div>
        </div>
      </div>

      <div className="jackpot-divider" style={{ width: '1px', height: '32px', background: 'rgba(255, 255, 255, 0.1)' }} />

      {/* World Pool (Grand Jackpot) */}
      <div className="jackpot-item" style={{ display: 'flex', alignItems: 'center' }}>
        <div
          className="jackpot-icon"
          style={{
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(200, 134, 10, 0.2) 100%)',
            border: '1px solid #FFD700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFF',
            boxShadow: '0 0 15px rgba(255, 215, 0, 0.4)',
            flexShrink: 0,
          }}
        >
          <Sparkles size={18} />
        </div>
        <div className="jackpot-info">
          <div className="jackpot-title" style={{ color: '#FFD700', letterSpacing: '1px', fontWeight: 700, textTransform: 'uppercase' }}>
            ✨ GRAND WORLD JACKPOT
          </div>
          <div
            className="gold-gradient-text jackpot-value"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 800 }}
          >
            {formatAmount(worldPool)}
          </div>
        </div>
      </div>
    </div>
  );
};
