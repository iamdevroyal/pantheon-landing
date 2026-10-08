import React, { useState } from 'react';
import { FEATURED_DEITIES, type DeityPreview } from '../data/deities';
import { CONTINENTS } from '../data/continents';
import { sound } from '../utils/audio';
import { Compass, Zap, X } from 'lucide-react';

export const PantheonAtlas: React.FC = () => {
  const [selectedContinentFilter, setSelectedContinentFilter] = useState<string>('ALL');
  const [selectedRarityFilter, setSelectedRarityFilter] = useState<string>('ALL');
  const [activeDeityModal, setActiveDeityModal] = useState<DeityPreview | null>(null);

  const filteredDeities = FEATURED_DEITIES.filter((d) => {
    const matchesContinent = selectedContinentFilter === 'ALL' || d.continent === selectedContinentFilter;
    const matchesRarity = selectedRarityFilter === 'ALL' || d.rarity === selectedRarityFilter;
    return matchesContinent && matchesRarity;
  });

  const rarities = ['ALL', 'MYTHIC', 'LEGENDARY', 'EPIC', 'RARE', 'COMMON'];

  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'MYTHIC': return '#E74C3C';
      case 'LEGENDARY': return '#F39C12';
      case 'EPIC': return '#9B59B6';
      case 'RARE': return '#3498DB';
      case 'UNCOMMON': return '#2ECC71';
      default: return '#8E9297';
    }
  };

  const getRarityStars = (rarity: string) => {
    switch (rarity) {
      case 'MYTHIC': return '★★★★★★';
      case 'LEGENDARY': return '★★★★★';
      case 'EPIC': return '★★★★';
      case 'RARE': return '★★★';
      default: return '★';
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Filters Toolbar */}
      <div
        className="ornate-card"
        style={{
          padding: '18px 24px',
          marginBottom: '32px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        {/* Continent Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', maxWidth: '100%' }}>
          <button
            onClick={() => {
              sound.playChime(600);
              setSelectedContinentFilter('ALL');
            }}
            style={{
              background: selectedContinentFilter === 'ALL' ? 'var(--accent)' : 'rgba(25, 25, 55, 0.6)',
              color: selectedContinentFilter === 'ALL' ? '#070714' : '#E0E0FF',
              border: 'none',
              padding: '7px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
          >
            All Pantheons ({FEATURED_DEITIES.length})
          </button>

          {CONTINENTS.map((c) => {
            const isSelected = selectedContinentFilter === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  sound.playChime(700);
                  setSelectedContinentFilter(c.id);
                }}
                style={{
                  background: isSelected ? c.color : 'rgba(25, 25, 55, 0.6)',
                  color: isSelected ? '#070714' : '#E0E0FF',
                  border: isSelected ? `1px solid ${c.color}` : '1px solid transparent',
                  padding: '7px 14px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                }}
              >
                <span>{c.emoji}</span>
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>

        {/* Rarity Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto' }}>
          {rarities.map((r) => {
            const isSelected = selectedRarityFilter === r;
            return (
              <button
                key={r}
                onClick={() => {
                  sound.playChime(800);
                  setSelectedRarityFilter(r);
                }}
                style={{
                  background: isSelected ? 'rgba(255, 215, 0, 0.2)' : 'transparent',
                  color: isSelected ? '#FFD700' : 'var(--text-muted)',
                  border: isSelected ? '1px solid #FFD700' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {r}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}
      >
        {filteredDeities.map((deity) => {
          const badgeColor = getRarityBadgeColor(deity.rarity);
          return (
            <div
              key={deity.id}
              className="ornate-card holo-card"
              onClick={() => {
                sound.playChime(950);
                setActiveDeityModal(deity);
              }}
              style={{
                padding: '26px',
                border: `1px solid ${deity.primaryColor}55`,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Card Header: Rarity & Culture */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span
                  style={{
                    background: badgeColor,
                    color: '#070714',
                    fontSize: '10px',
                    fontWeight: 900,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    letterSpacing: '1px',
                  }}
                >
                  {deity.rarity}
                </span>

                <span style={{ color: '#FFD700', fontSize: '11px', letterSpacing: '1px' }}>
                  {getRarityStars(deity.rarity)}
                </span>
              </div>

              {/* Deity Title & Relic */}
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: '#FFF', fontWeight: 800, marginBottom: '4px' }}>
                {deity.name}
              </h4>

              <div style={{ fontSize: '12px', color: 'var(--accent-light)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Compass size={13} />
                <span>{deity.culture} · {deity.country}</span>
              </div>

              <div style={{ fontSize: '12px', color: '#E0E0FF', fontStyle: 'italic', marginBottom: '14px' }}>
                Bearing: <strong style={{ color: '#FFF' }}>{deity.heldObject}</strong>
              </div>

              <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5', minHeight: '36px', marginBottom: '18px', fontFamily: 'var(--font-lore)' }}>
                "{deity.lore}"
              </p>

              {/* Bottom Meta Bar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '14px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '12px',
                }}
              >
                <span
                  style={{
                    background: 'rgba(200, 134, 10, 0.15)',
                    color: '#FFD700',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {deity.outcomeType} FX
                </span>

                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#FFD700', fontSize: '14px' }}>
                  ×{deity.multiplier} MULT
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Outcome Types Legend Showcase */}
      <div
        className="ornate-card"
        style={{
          marginTop: '48px',
          padding: '28px',
          background: 'linear-gradient(135deg, rgba(20, 20, 48, 0.8) 0%, rgba(10, 10, 26, 0.95) 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Zap size={20} color="#FFD700" />
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#FFF' }}>
            The 8 Outcome Typologies & Volatility Behaviors
          </h4>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '14px',
            fontSize: '12px',
          }}
        >
          <div style={{ background: 'rgba(255, 69, 0, 0.1)', border: '1px solid rgba(255, 69, 0, 0.3)', padding: '12px', borderRadius: '8px' }}>
            <strong style={{ color: '#FF4500' }}>BURST (Thunder / Flame):</strong> +15% bonus on win. Explosive high variance.
          </div>
          <div style={{ background: 'rgba(0, 206, 209, 0.1)', border: '1px solid rgba(0, 206, 209, 0.3)', padding: '12px', borderRadius: '8px' }}>
            <strong style={{ color: '#00CED1' }}>FLOW (Water / Ocean):</strong> Base multiplier. Soothing, balanced payouts.
          </div>
          <div style={{ background: 'rgba(46, 204, 113, 0.1)', border: '1px solid rgba(46, 204, 113, 0.3)', padding: '12px', borderRadius: '8px' }}>
            <strong style={{ color: '#2ECC71' }}>BLOOM (Nature / Earth):</strong> Frequent payouts, steady organic harvest.
          </div>
          <div style={{ background: 'rgba(155, 89, 182, 0.1)', border: '1px solid rgba(155, 89, 182, 0.3)', padding: '12px', borderRadius: '8px' }}>
            <strong style={{ color: '#9B59B6' }}>SHATTER (Chaos / Ice):</strong> +25% bonus on win. Peak high-stakes rush.
          </div>
        </div>
      </div>

      {/* Deity Grimoire Inspection Modal */}
      {activeDeityModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 5, 15, 0.88)',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setActiveDeityModal(null)}
        >
          <div
            className="ornate-card"
            style={{
              width: '100%',
              maxWidth: '560px',
              padding: '36px',
              border: `2px solid ${activeDeityModal.primaryColor}`,
              boxShadow: `0 0 50px ${activeDeityModal.primaryColor}50`,
              position: 'relative',
              background: 'linear-gradient(135deg, rgba(20, 20, 50, 0.98) 0%, rgba(8, 8, 20, 0.98) 100%)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveDeityModal(null)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              <X size={22} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span
                style={{
                  background: getRarityBadgeColor(activeDeityModal.rarity),
                  color: '#070714',
                  fontSize: '11px',
                  fontWeight: 900,
                  padding: '3px 10px',
                  borderRadius: '4px',
                }}
              >
                {activeDeityModal.rarity}
              </span>
              <span style={{ color: '#FFD700', fontSize: '13px' }}>
                {getRarityStars(activeDeityModal.rarity)}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {activeDeityModal.culture} · {activeDeityModal.country}
              </span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: '#FFF', fontWeight: 900, marginBottom: '6px' }}>
              {activeDeityModal.name}
            </h3>

            <div style={{ fontSize: '14px', color: 'var(--accent-light)', marginBottom: '14px' }}>
              Domain: <strong>{activeDeityModal.domain}</strong>
            </div>

            <div
              style={{
                background: 'rgba(10, 10, 26, 0.6)',
                border: '1px solid rgba(255, 215, 0, 0.2)',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '18px',
                fontSize: '13px',
              }}
            >
              Relic / Bearing: <strong style={{ color: '#FFD700' }}>{activeDeityModal.heldObject}</strong>
            </div>

            <p style={{ fontSize: '14px', color: '#E0E0FF', lineHeight: '1.6', fontFamily: 'var(--font-lore)', marginBottom: '24px' }}>
              "{activeDeityModal.lore}"
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Outcome FX Style</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#FFD700' }}>
                  {activeDeityModal.outcomeType}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Base Win Multiplier</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '20px', color: '#FFD700' }}>
                  ×{activeDeityModal.multiplier}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
