import React, { useEffect, useState } from 'react';
import { Sparkles, Globe, Compass } from 'lucide-react';

interface JackpotTickerProps {
  continentName: string;
}

export const JackpotTicker: React.FC<JackpotTickerProps> = ({ continentName }) => {
  // Live ticking amounts reflecting global game summoner activity
  const [localSeekers, setLocalSeekers] = useState(84290);
  const [contInvocations, setContInvocations] = useState(420580);
  const [worldAwakenings, setWorldAwakenings] = useState(2140650);

  // Subtle real-time increments simulating live world network activity
  useEffect(() => {
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 8) + 2;
      setWorldAwakenings((prev) => prev + increment * 4);
      setContInvocations((prev) => prev + increment * 2);
      setLocalSeekers((prev) => prev + increment);
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (val: number) => {
    return val.toLocaleString('en-US');
  };

  return (
    <div
      className="glass-panel jackpot-ticker-panel"
      style={{
        border: '1px solid rgba(200, 134, 10, 0.3)',
      }}
    >
      {/* Local Realm Activity */}
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
            {continentName.toUpperCase()} ACTIVE SEEKERS
          </div>
          <div className="jackpot-value" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#FFD700' }}>
            {formatNumber(localSeekers)} Summoners
          </div>
        </div>
      </div>

      <div className="jackpot-divider" style={{ width: '1px', height: '32px', background: 'rgba(255, 255, 255, 0.1)' }} />

      {/* Continental Invocations */}
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
            CONTINENTAL INVOCATIONS
          </div>
          <div className="jackpot-value" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#80A4FF' }}>
            {formatNumber(contInvocations)} Rites
          </div>
        </div>
      </div>

      <div className="jackpot-divider" style={{ width: '1px', height: '32px', background: 'rgba(255, 255, 255, 0.1)' }} />

      {/* World Gods Awakened */}
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
            ✨ GLOBAL DIVINE AWAKENINGS
          </div>
          <div
            className="gold-gradient-text jackpot-value"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 800 }}
          >
            {formatNumber(worldAwakenings)} Gods Summoned
          </div>
        </div>
      </div>
    </div>
  );
};
