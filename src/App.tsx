import { useState, useEffect } from 'react';
import { CONTINENTS, type ContinentData } from './data/continents';
import { GlobePreview } from './components/GlobePreview';
import { CurrencyToggle, type Currency } from './components/CurrencyToggle';
import { JackpotTicker } from './components/JackpotTicker';
import { OfferingSimulator } from './components/OfferingSimulator';
import { PantheonAtlas } from './components/PantheonAtlas';
import { WaitlistModal } from './components/WaitlistModal';
import { LightningCanvas } from './components/LightningCanvas';
import { LightningHeroText } from './components/LightningHeroText';
import { sound } from './utils/audio';
import {
  Globe2,
  Sparkles,
  Flame,
  Volume2,
  VolumeX,
  Compass,
  Zap,
  Crown,
  Scale,
} from 'lucide-react';

export function App() {
  const [currency, setCurrency] = useState<Currency>('NGN');
  const [selectedContinent, setSelectedContinent] = useState<ContinentData>(CONTINENTS[0]);
  const [isSimulatingSpin, setIsSimulatingSpin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    // Automatically initialize mythic ambient drone on first user interaction
    sound.setupAutoAmbient();
  }, []);

  const bonusLabel = currency === 'NGN' ? '₦100' : '$1.00';

  const handleToggleAudio = () => {
    const newState = sound.toggleMute();
    setIsAudioPlaying(newState);
    if (newState) {
      sound.playChime(1100);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      {/* ── PROCEDURAL LIGHTNING CANVAS (Strikes across screen with random flashes) ── */}
      <LightningCanvas />

      {/* ── BACKGROUND FLOATING COSMIC EMBERS ── */}
      <div className="cosmic-background-layer" />

      {/* ── TOP ANNOUNCEMENT TICKER ── */}
      <div
        style={{
          background: 'linear-gradient(90deg, #101026 0%, #C8860A 50%, #101026 100%)',
          padding: '8px 16px',
          textAlign: 'center',
          fontSize: '12px',
          fontWeight: 700,
          color: '#FFF',
          letterSpacing: '0.8px',
          position: 'relative',
          zIndex: 101,
          boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
        }}
      >
        <Sparkles size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: '#FFD700' }} />
        GLOBAL EARLY ACCESS: Pre-register today and receive a guaranteed <strong style={{ color: '#FFD700' }}>{bonusLabel} Sacred Offering</strong> at launch!
      </div>

      {/* ── HEADER / NAVIGATION ── */}
      <header
        className="ornate-card site-header"
        style={{
          margin: '14px 20px',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: '12px',
          zIndex: 100,
        }}
      >
        {/* Brand Logo with Glowing Emblem */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFD700 0%, #C8860A 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#070714',
              boxShadow: '0 0 20px rgba(255, 215, 0, 0.6), inset 0 1px 0 #FFF',
            }}
          >
            <Globe2 size={24} />
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '18px',
                letterSpacing: '1.5px',
                color: '#FFF',
              }}
            >
              PANTHEON GACHA
            </div>
            <div style={{ fontSize: '10px', color: 'var(--accent-light)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700 }}>
              Continental Globe Edition
            </div>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            fontSize: '12px',
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            letterSpacing: '0.5px',
          }}
          className="nav-desktop"
        >
          <a href="#globe" onClick={() => sound.playChime(600)} style={{ color: '#F0EFFF', textDecoration: 'none' }}>
            The Globe
          </a>
          <a href="#jackpots" onClick={() => sound.playChime(650)} style={{ color: '#F0EFFF', textDecoration: 'none' }}>
            Jackpots
          </a>
          <a href="#simulator" onClick={() => sound.playChime(700)} style={{ color: '#F0EFFF', textDecoration: 'none' }}>
            Offering Altar
          </a>
          <a href="#atlas" onClick={() => sound.playChime(750)} style={{ color: '#F0EFFF', textDecoration: 'none' }}>
            Grimoire Atlas
          </a>
          <a href="#payments" onClick={() => sound.playChime(800)} style={{ color: '#F0EFFF', textDecoration: 'none' }}>
            Dual Currency
          </a>
        </nav>

        {/* Right Controls: Audio Ambient Switch, Currency Toggle, & CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Ambient Music Toggle */}
          <button
            onClick={handleToggleAudio}
            title={isAudioPlaying ? 'Mute Celestial Drone' : 'Enable Celestial Ambient Drone'}
            style={{
              background: isAudioPlaying ? 'rgba(200, 134, 10, 0.3)' : 'rgba(25, 25, 55, 0.6)',
              border: isAudioPlaying ? '1px solid #FFD700' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              color: isAudioPlaying ? '#FFD700' : 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s',
              boxShadow: isAudioPlaying ? '0 0 12px rgba(255, 215, 0, 0.4)' : 'none',
            }}
          >
            {isAudioPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          <CurrencyToggle currency={currency} onCurrencyChange={setCurrency} />

          <button
            className="btn-gold"
            onClick={() => {
              sound.playChime(900);
              setIsModalOpen(true);
            }}
            style={{ padding: '9px 18px', fontSize: '12px' }}
          >
            CLAIM {bonusLabel}
          </button>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section
        style={{
          padding: '50px 20px 36px',
          maxWidth: '1240px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Animated Lightning & Thunder Typography */}
        <LightningHeroText
          primaryLine="WHEN THE GODS AWAKEN"
          highlightLine="MORTALS CLAIM THE HEAVENS"
        />

        <p
          style={{
            maxWidth: '780px',
            margin: '0 auto 36px',
            fontSize: 'clamp(16px, 2.2vw, 20px)',
            color: '#D8D7F0',
            lineHeight: 1.68,
            fontFamily: 'var(--font-lore)',
          }}
        >
          Across six primordial continents, cosmic immortals stir from ancient slumber. Ṣàngó strikes burning thunder across the Yoruba sky, Zeus hurls crackling bolts from Olympus, Amaterasu illuminates the cosmic dawn, and Quetzalcoatl commands emerald storms. Pledge your offering in <strong style={{ color: '#00E676' }}>₦ Naira</strong> or <strong style={{ color: '#FFD700' }}>$ US Dollars</strong>, command the living 3D globe, and unearth celestial riches.
        </p>

        {/* Hero Action CTAs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '52px' }}>
          <button
            className="btn-gold"
            onClick={() => {
              sound.playThunder();
              sound.playChime(1000);
              setIsModalOpen(true);
            }}
            style={{ fontSize: '15px' }}
          >
            <Flame size={19} />
            ENTER THE SANCTUM & CLAIM {bonusLabel}
          </button>
          <a
            href="#globe"
            onClick={() => sound.playChime(700)}
            className="btn-secondary"
            style={{ textDecoration: 'none' }}
          >
            <Compass size={19} />
            INVOKE THE LIVING ORACLE
          </a>
        </div>

        {/* Divine Power Badges HUD */}
        <div
          className="ornate-card"
          style={{
            padding: '24px 32px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '24px',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ color: '#FFD700' }}><Zap size={30} /></div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '20px', color: '#FFF' }}>10,000x Max</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Mythic Multipliers & Windfalls</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ color: '#00E676' }}><Crown size={30} /></div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '20px', color: '#FFF' }}>₦ NGN & $ USD</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Dual Sacred Treasury Vaults</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ color: '#80A4FF' }}><Globe2 size={30} /></div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '20px', color: '#FFF' }}>6 Continents</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>250+ Authentic Global Gods</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ color: '#00CED1' }}><Scale size={30} /></div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '20px', color: '#FFF' }}>The Scales of Fate</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Cryptographically Sealed Destiny</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3D CENTERPIECE: THE LIVING GLOBE ── */}
      <section
        id="globe"
        style={{
          padding: '60px 20px',
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '11px', color: 'var(--accent-light)', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 800 }}>
            SACRED ASTROLABE OF THE SEVEN REALMS
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: '#FFF', marginTop: '6px', fontWeight: 900 }}>
            The Living Oracle Globe
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '680px', margin: '8px auto 0', fontFamily: 'var(--font-lore)' }}>
            Grip the earth. Rotate the sphere to summon your ancestral realm. When your offering is pledged, divine lightning strikes down from the stars upon your deity's sacred coordinates, unearthing your celestial fortune.
          </p>
        </div>

        {/* Live Multi-Currency Jackpot Ticker Bar */}
        <div id="jackpots" style={{ marginBottom: '22px' }}>
          <JackpotTicker currency={currency} continentName={selectedContinent.name} />
        </div>

        {/* 3D WebGL Canvas Card with Celestial Astrolabe Ring */}
        <div
          className="ornate-card globe-container-card"
          style={{
            height: 'clamp(360px, 58vh, 580px)',
            position: 'relative',
            overflow: 'hidden',
            border: '2px solid var(--border-gold-bright)',
            boxShadow: '0 0 60px rgba(10, 20, 45, 0.9), inset 0 0 30px rgba(255, 215, 0, 0.1)',
          }}
        >
          <GlobePreview
            selectedContinent={selectedContinent}
            onSelectContinent={setSelectedContinent}
            isPledged={isSimulatingSpin}
          />
        </div>

        {/* Selected Continent Deity Lore Showcase Card */}
        <div
          className="ornate-card"
          style={{
            marginTop: '22px',
            padding: '28px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            borderLeft: `6px solid ${selectedContinent.color}`,
            background: 'linear-gradient(135deg, rgba(16, 16, 40, 0.95) 0%, rgba(8, 8, 20, 0.98) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '22px', flex: '1 1 500px' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img
                src={selectedContinent.godImage}
                alt={selectedContinent.featuredGod}
                style={{
                  width: '94px',
                  height: '94px',
                  borderRadius: '16px',
                  border: '2px solid #FFD700',
                  boxShadow: `0 0 25px ${selectedContinent.color}70`,
                  objectFit: 'cover',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  right: '-6px',
                  fontSize: '20px',
                  background: '#070714',
                  borderRadius: '50%',
                  padding: '2px 4px',
                  border: '1px solid #FFD700',
                }}
              >
                {selectedContinent.emoji}
              </span>
            </div>

            <div>
              <div style={{ fontSize: '11px', color: selectedContinent.color, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
                ACTIVE REALM: {selectedContinent.name}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#FFF', marginTop: '2px', fontWeight: 900 }}>
                {selectedContinent.featuredGod}
              </div>
              <div style={{ fontSize: '13px', color: '#FFD700', fontWeight: 700, marginTop: '2px' }}>
                {selectedContinent.tagline}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px', maxWidth: '720px', lineHeight: '1.65', fontFamily: 'var(--font-lore)' }}>
                {selectedContinent.lore}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '26px', fontWeight: 900, color: '#FFD700' }}>
              {selectedContinent.deityCount} IMMORTALS
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '0.5px' }}>Summonable Pantheon Realm</div>
            <button
              className="btn-gold"
              onClick={() => {
                sound.playThunder();
                const sim = document.getElementById('simulator');
                sim?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ marginTop: '6px', padding: '10px 18px', fontSize: '12px' }}
            >
              <Flame size={15} />
              PLEDGE OFFERING TO {selectedContinent.name.toUpperCase()}
            </button>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE OFFERING SHRINE SIMULATOR ── */}
      <section
        id="simulator"
        style={{
          padding: '40px 20px 60px',
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <OfferingSimulator
          currency={currency}
          selectedContinent={selectedContinent}
          onSimulateSpin={setIsSimulatingSpin}
        />
      </section>

      {/* ── PANTHEON GRIMOIRE & DEITY ATLAS ── */}
      <section
        id="atlas"
        style={{
          padding: '60px 20px',
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '11px', color: 'var(--accent-light)', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 800 }}>
            SACRED LINEAGE
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: '#FFF', marginTop: '6px', fontWeight: 900 }}>
            The Pantheon Grimoire Atlas
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '620px', margin: '8px auto 0', fontFamily: 'var(--font-lore)' }}>
            Inspect world gods by continent and rarity tier. Learn their domain powers, authentic cultural origins, and volatility impact.
          </p>
        </div>

        <PantheonAtlas />
      </section>

      {/* ── DUAL CURRENCY & FINANCIAL RAILS ── */}
      <section
        id="payments"
        style={{
          padding: '60px 20px',
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          className="ornate-card"
          style={{
            padding: '52px 40px',
            border: '2px solid var(--border-gold)',
            background: 'linear-gradient(135deg, rgba(16, 16, 40, 0.9) 0%, rgba(8, 8, 20, 0.95) 100%)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '11px', color: 'var(--accent-light)', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 800 }}>
              THE ROYAL TREASURY
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '34px', color: '#FFF', marginTop: '6px', fontWeight: 900 }}>
              Two Realms of Sovereign Gold & Fortune
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '680px', margin: '8px auto 0', fontFamily: 'var(--font-lore)' }}>
              No currency barriers. No forced conversion losses. Pledge in the sacred coin of your homeland—Naira (₦) or US Dollars ($)—and claim your winnings with instant, unhindered cashouts directly to your accounts.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
            }}
          >
            {/* NGN Rail Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(0, 135, 81, 0.15) 0%, rgba(10, 25, 20, 0.8) 100%)',
                border: '1px solid rgba(0, 230, 118, 0.4)',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 8px 30px rgba(0, 135, 81, 0.15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                <span style={{ fontSize: '32px' }}>🇳🇬</span>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#FFF', fontWeight: 900 }}>
                    The Naira Vault (₦ NGN)
                  </h4>
                  <div style={{ fontSize: '12px', color: '#00E676', fontWeight: 700 }}>
                    Sovereign Wealth of the Motherland
                  </div>
                </div>
              </div>
              <ul style={{ listStyle: 'none', fontSize: '13px', color: '#D8D7F0', lineHeight: '2' }}>
                <li>⚡ Instant tribute via Debit Cards, Direct Bank Transfer & USSD</li>
                <li>⚡ Sacred offerings from as low as ₦10 (Pilgrim) up to ₦2,500+ (Supreme)</li>
                <li>⚡ Lightning-fast automated withdrawals credited to your Nigerian bank in seconds</li>
                <li>⚡ Dedicated African realm jackpots with massive growing progressive pools</li>
              </ul>
            </div>

            {/* USD Rail Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.12) 0%, rgba(25, 25, 30, 0.8) 100%)',
                border: '1px solid rgba(255, 215, 0, 0.4)',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 8px 30px rgba(255, 215, 0, 0.12)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                <span style={{ fontSize: '32px' }}>🇺🇸</span>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#FFF', fontWeight: 900 }}>
                    The Sovereign Dollar ($ USD)
                  </h4>
                  <div style={{ fontSize: '12px', color: '#FFD700', fontWeight: 700 }}>
                    Imperial Treasury of the Seven Seas
                  </div>
                </div>
              </div>
              <ul style={{ listStyle: 'none', fontSize: '13px', color: '#D8D7F0', lineHeight: '2' }}>
                <li>⚡ Worldwide instant tribute via Visa, Mastercard, Apple Pay & Google Pay</li>
                <li>⚡ Sacred offerings from $0.10 (Pilgrim) up to $25.00+ for high-roller summoners</li>
                <li>⚡ Global dollar jackpots paying out directly with zero foreign exchange fees</li>
                <li>⚡ Seamless international cashouts for players across the UK, US, Europe & Diaspora</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL PRE-REGISTRATION CTA BANNER ── */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          className="ornate-card divine-pulse"
          style={{
            padding: '56px 36px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(200, 134, 10, 0.28) 0%, rgba(20, 20, 50, 0.85) 100%)',
            border: '2px solid #FFD700',
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4.5vw, 46px)', color: '#FFF', fontWeight: 900, marginBottom: '14px' }}>
            The Heavens Tremble. Awaken Your Deity.
          </h2>
          <p style={{ maxWidth: '640px', margin: '0 auto 32px', fontSize: '16px', color: '#E0E0FF', lineHeight: '1.65', fontFamily: 'var(--font-lore)' }}>
            Join legions of mortal champions gathering for the Beta Awakening. Reserve your sacred sanctum today and receive a guaranteed <strong style={{ color: '#FFD700' }}>{bonusLabel} Welcome Offering</strong> upon entry.
          </p>

          <button
            className="btn-gold"
            onClick={() => {
              sound.playThunder();
              sound.playChime(1000);
              setIsModalOpen(true);
            }}
            style={{ padding: '18px 40px', fontSize: '16px' }}
          >
            <Sparkles size={20} />
            ENTER THE SANCTUM & CLAIM {bonusLabel} BONUS
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          marginTop: 'auto',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(7, 7, 20, 0.98)',
          padding: '44px 20px 24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
            paddingBottom: '28px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 900, color: '#FFF', letterSpacing: '1px' }}>
              PANTHEON GACHA
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              "Every continent. Every culture. One spinning world."
            </div>
          </div>

          <div style={{ display: 'flex', gap: '28px', fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>
            <a href="#globe" onClick={() => sound.playChime(600)} style={{ color: 'inherit', textDecoration: 'none' }}>The Globe</a>
            <a href="#atlas" onClick={() => sound.playChime(700)} style={{ color: 'inherit', textDecoration: 'none' }}>Grimoire</a>
            <a href="#payments" onClick={() => sound.playChime(800)} style={{ color: 'inherit', textDecoration: 'none' }}>Dual Currency</a>
            <a href="#simulator" onClick={() => sound.playChime(900)} style={{ color: 'inherit', textDecoration: 'none' }}>Altar Demo</a>
          </div>
        </div>

        {/* Responsible Gambling Notice */}
        <div
          style={{
            maxWidth: '1240px',
            margin: '22px auto 0',
            fontSize: '11px',
            color: 'var(--text-dim)',
            lineHeight: 1.6,
            textAlign: 'center',
          }}
        >
          <p>
            ⚠️ <strong>18+ ONLY.</strong> Pantheon Gacha promotes responsible gaming. Play within your limits. Winnings are subject to provincial/national tax laws (10% statutory WHT on Nigerian wins &gt; ₦10,000). Licensed in accordance with National Lottery Regulatory Commission (NLRC) standards.
          </p>
          <p style={{ marginTop: '6px' }}>
            © 2026 KorpaBee Global Entertainment. All cultural traditions, deity names, and sacred folklore are treated with authentic historical fidelity and respect.
          </p>
        </div>
      </footer>

      {/* ── WAITLIST / CLAIM OFFERING MODAL ── */}
      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultCurrency={currency}
      />
    </div>
  );
}

export default App;
