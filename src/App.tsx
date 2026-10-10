import { useState, useEffect } from 'react';
import { CONTINENTS, type ContinentData } from './data/continents';
import { GlobePreview } from './components/GlobePreview';
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
  Scale,
  Smartphone,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

export function App() {
  const [selectedContinent, setSelectedContinent] = useState<ContinentData>(CONTINENTS[0]);
  const [isSimulatingSpin, setIsSimulatingSpin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    // Automatically initialize mythic ambient drone on first user interaction
    sound.setupAutoAmbient();
  }, []);

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
        className="announcement-ticker"
        style={{
          background: 'linear-gradient(90deg, #101026 0%, #C8860A 50%, #101026 100%)',
          textAlign: 'center',
          fontWeight: 700,
          color: '#FFF',
          letterSpacing: '0.8px',
          position: 'relative',
          zIndex: 101,
          boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
        }}
      >
        <Sparkles size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: '#FFD700' }} />
        GLOBAL EARLY ACCESS: Pre-register for iOS & Android to receive an exclusive <strong style={{ color: '#FFD700' }}>Founder's Mythic Starter Pack</strong> at launch!
      </div>

      {/* ── HEADER / NAVIGATION ── */}
      <header
        className="ornate-card site-header"
        style={{
          position: 'sticky',
          top: '12px',
          zIndex: 100,
        }}
      >
        {/* Brand Logo with Glowing Emblem */}
        <div className="header-brand" style={{ display: 'flex', alignItems: 'center' }}>
          <div
            className="header-logo-icon"
            style={{
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFD700 0%, #C8860A 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#070714',
              boxShadow: '0 0 20px rgba(255, 215, 0, 0.6), inset 0 1px 0 #FFF',
              flexShrink: 0,
            }}
          >
            <Globe2 className="brand-globe-icon" />
          </div>
          <div className="header-brand-text">
            <div
              className="header-brand-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                letterSpacing: '1.2px',
                color: '#FFF',
                lineHeight: 1.1,
              }}
            >
              PANTHEON GACHA
            </div>
            <div
              className="header-brand-subtitle"
              style={{
                fontSize: '10px',
                color: 'var(--accent-light)',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
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
          <a href="#stats" onClick={() => sound.playChime(650)} style={{ color: '#F0EFFF', textDecoration: 'none' }}>
            Live Activity
          </a>
          <a href="#simulator" onClick={() => sound.playChime(700)} style={{ color: '#F0EFFF', textDecoration: 'none' }}>
            Offering Altar
          </a>
          <a href="#atlas" onClick={() => sound.playChime(750)} style={{ color: '#F0EFFF', textDecoration: 'none' }}>
            Grimoire Atlas
          </a>
          <a href="#download" onClick={() => sound.playChime(800)} style={{ color: '#F0EFFF', textDecoration: 'none' }}>
            Mobile App
          </a>
        </nav>

        {/* Right Controls: Audio Ambient Switch & Pre-Register CTA */}
        <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Ambient Music Toggle */}
          <button
            onClick={handleToggleAudio}
            title={isAudioPlaying ? 'Mute Celestial Drone' : 'Enable Celestial Ambient Drone'}
            className="header-audio-btn"
            style={{
              background: isAudioPlaying ? 'rgba(200, 134, 10, 0.3)' : 'rgba(25, 25, 55, 0.6)',
              border: isAudioPlaying ? '1px solid #FFD700' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              color: isAudioPlaying ? '#FFD700' : 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s',
              boxShadow: isAudioPlaying ? '0 0 12px rgba(255, 215, 0, 0.4)' : 'none',
              flexShrink: 0,
            }}
          >
            {isAudioPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            className="btn-gold header-cta-btn"
            onClick={() => {
              sound.playChime(900);
              setIsModalOpen(true);
            }}
          >
            PRE-REGISTER
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
          Across six primordial continents, cosmic immortals stir from ancient slumber. Ṣàngó strikes burning thunder across the Yoruba sky, Zeus hurls crackling bolts from Olympus, Amaterasu illuminates the cosmic dawn, and Quetzalcoatl commands emerald storms. Spin the living 3D oracle globe, summon ancestral deities from authentic world cultures, and command the heavens on iOS & Android.
        </p>

        {/* Hero Action CTAs */}
        <div className="hero-cta-group" style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '28px' }}>
          <button
            className="btn-gold hero-cta-btn"
            onClick={() => {
              sound.playThunder();
              sound.playChime(1000);
              setIsModalOpen(true);
            }}
            style={{ fontSize: '15px' }}
          >
            <Sparkles size={19} />
            PRE-REGISTER FOR EARLY ACCESS
          </button>
          <a
            href="#globe"
            onClick={() => sound.playChime(700)}
            className="btn-secondary hero-cta-btn"
            style={{ textDecoration: 'none' }}
          >
            <Compass size={19} />
            EXPLORE THE LIVING GLOBE
          </a>
        </div>

        {/* Mobile Platform Availability Pill Row */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '18px',
            fontSize: '12px',
            color: 'var(--text-muted)',
            marginBottom: '46px',
            background: 'rgba(20, 20, 48, 0.6)',
            padding: '8px 20px',
            borderRadius: '24px',
            border: '1px solid rgba(200, 134, 10, 0.25)',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFF' }}>
            <span style={{ fontSize: '15px' }}>🍏</span> Apple App Store
          </span>
          <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFF' }}>
            <span style={{ fontSize: '15px' }}>🤖</span> Google Play Store
          </span>
          <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
          <span style={{ color: '#FFD700', fontWeight: 700 }}>Free Download at Launch</span>
        </div>

        {/* Divine Power Badges HUD */}
        <div className="ornate-card hero-metrics-hud">
          <div className="hud-item" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="hud-icon" style={{ color: '#FFD700', flexShrink: 0 }}><Zap size={28} /></div>
            <div>
              <div className="hud-title" style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#FFF' }}>250+ Immortals</div>
              <div className="hud-desc" style={{ color: 'var(--text-muted)' }}>Authentic Global Pantheon</div>
            </div>
          </div>

          <div className="hud-item" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="hud-icon" style={{ color: '#00E676', flexShrink: 0 }}><Smartphone size={28} /></div>
            <div>
              <div className="hud-title" style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#FFF' }}>iOS & Android</div>
              <div className="hud-desc" style={{ color: 'var(--text-muted)' }}>Mobile App Store Edition</div>
            </div>
          </div>

          <div className="hud-item" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="hud-icon" style={{ color: '#80A4FF', flexShrink: 0 }}><Globe2 size={28} /></div>
            <div>
              <div className="hud-title" style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#FFF' }}>6 Continents</div>
              <div className="hud-desc" style={{ color: 'var(--text-muted)' }}>Living 3D Interactive World</div>
            </div>
          </div>

          <div className="hud-item" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="hud-icon" style={{ color: '#00CED1', flexShrink: 0 }}><Scale size={28} /></div>
            <div>
              <div className="hud-title" style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#FFF' }}>Scales of Fate</div>
              <div className="hud-desc" style={{ color: 'var(--text-muted)' }}>Cryptographically Sealed Odds</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3D CENTERPIECE: THE LIVING GLOBE ── */}
      <section
        id="globe"
        className="landing-section"
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
          <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', color: '#FFF', marginTop: '6px', fontWeight: 900 }}>
            The Living Oracle Globe
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '680px', margin: '8px auto 0', fontFamily: 'var(--font-lore)' }}>
            Rotate the sphere to summon your ancestral realm. When your offering is pledged, divine lightning strikes down from the stars upon your deity's sacred coordinates, unearthing your celestial fortune.
          </p>
        </div>

        {/* Live Global Activity & Summoner Feed Bar */}
        <div id="stats" style={{ marginBottom: '22px' }}>
          <JackpotTicker continentName={selectedContinent.name} />
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
          className="ornate-card continent-showcase-card"
          style={{
            marginTop: '22px',
            borderLeft: `6px solid ${selectedContinent.color}`,
            background: 'linear-gradient(135deg, rgba(16, 16, 40, 0.95) 0%, rgba(8, 8, 20, 0.98) 100%)',
          }}
        >
          <div className="showcase-identity" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="showcase-god-avatar" style={{ position: 'relative', flexShrink: 0 }}>
              <img
                src={selectedContinent.godImage}
                alt={selectedContinent.featuredGod}
                className="showcase-god-img"
                style={{
                  borderRadius: '16px',
                  border: '2px solid #FFD700',
                  boxShadow: `0 0 25px ${selectedContinent.color}70`,
                  objectFit: 'cover',
                }}
              />
              <span
                className="showcase-god-badge"
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  right: '-6px',
                  background: '#070714',
                  borderRadius: '50%',
                  padding: '2px 4px',
                  border: '1px solid #FFD700',
                }}
              >
                {selectedContinent.emoji}
              </span>
            </div>

            <div className="showcase-text">
              <div className="showcase-realm-label" style={{ fontSize: '11px', color: selectedContinent.color, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
                ACTIVE REALM: {selectedContinent.name}
              </div>
              <div className="showcase-god-name" style={{ fontFamily: 'var(--font-display)', color: '#FFF', fontWeight: 900 }}>
                {selectedContinent.featuredGod}
              </div>
              <div className="showcase-tagline" style={{ color: '#FFD700', fontWeight: 700 }}>
                {selectedContinent.tagline}
              </div>
              <p className="showcase-lore" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-lore)' }}>
                {selectedContinent.lore}
              </p>
            </div>
          </div>

          <div className="showcase-action">
            <div className="showcase-count-box">
              <div className="showcase-count" style={{ fontFamily: 'var(--font-mono)', fontWeight: 900, color: '#FFD700' }}>
                {selectedContinent.deityCount} IMMORTALS
              </div>
              <div className="showcase-count-label" style={{ color: 'var(--text-dim)', letterSpacing: '0.5px' }}>Summonable Pantheon Realm</div>
            </div>
            <button
              className="btn-gold showcase-summon-btn"
              onClick={() => {
                sound.playThunder();
                const sim = document.getElementById('simulator');
                sim?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Flame size={15} />
              INVOKE SHRINE OF {selectedContinent.name.toUpperCase()}
            </button>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE OFFERING SHRINE SIMULATOR ── */}
      <section
        id="simulator"
        className="landing-section"
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
          selectedContinent={selectedContinent}
          onSimulateSpin={setIsSimulatingSpin}
        />
      </section>

      {/* ── PANTHEON GRIMOIRE & DEITY ATLAS ── */}
      <section
        id="atlas"
        className="landing-section"
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
          <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', color: '#FFF', marginTop: '6px', fontWeight: 900 }}>
            The Pantheon Grimoire Atlas
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '620px', margin: '8px auto 0', fontFamily: 'var(--font-lore)' }}>
            Inspect world gods by continent and rarity tier. Learn their domain powers, authentic cultural origins, and celestial blessing resonance.
          </p>
        </div>

        <PantheonAtlas />
      </section>

      {/* ── MOBILE APP DOWNLOAD & PLATFORM SHOWCASE ── */}
      <section
        id="download"
        className="landing-section"
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
          className="ornate-card treasury-container-card"
          style={{
            border: '2px solid var(--border-gold)',
            background: 'linear-gradient(135deg, rgba(16, 16, 40, 0.9) 0%, rgba(8, 8, 20, 0.95) 100%)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <div style={{ fontSize: '11px', color: 'var(--accent-light)', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 800 }}>
              OFFICIAL APP STORE RELEASES
            </div>
            <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', color: '#FFF', marginTop: '6px', fontWeight: 900 }}>
              Experience Pantheon Gacha on iOS & Android
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '720px', margin: '10px auto 0', fontFamily: 'var(--font-lore)', lineHeight: '1.65' }}>
              Summon the gods anywhere, anytime. Designed from the ground up for modern smartphones with silky-smooth 60 FPS 3D globe navigation, tactile haptic feedback, and seamless cross-platform progression.
            </p>
          </div>

          <div
            className="treasury-grid"
            style={{
              display: 'grid',
              gap: '28px',
              marginBottom: '40px',
            }}
          >
            {/* Apple App Store Card */}
            <div
              className="treasury-rail-card app-download-card"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(15, 20, 40, 0.85) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '18px',
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, #1A1A2E 0%, #0D0D1A 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFF',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
                      flexShrink: 0,
                    }}
                  >
                    {/* Official Apple Logo SVG */}
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.84.94-2.91-.91.04-2.02.61-2.67 1.38-.57.66-.99 1.76-.86 2.81 1.02.08 2.06-.51 2.59-1.28z" />
                    </svg>
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '21px', color: '#FFF', fontWeight: 900 }}>
                      Apple App Store
                    </h4>
                    <div style={{ fontSize: '12px', color: '#80A4FF', fontWeight: 700 }}>
                      Available for iPhone & iPad (iOS 16+)
                    </div>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', fontSize: '13px', color: '#D8D7F0', lineHeight: '2.1', marginBottom: '24px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#80A4FF" style={{ flexShrink: 0 }} />
                    Metal-accelerated 3D WebGL engine running at fluid 60 FPS
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#80A4FF" style={{ flexShrink: 0 }} />
                    Tactile Taptic Engine vibrations on thunder strikes & deity reveals
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#80A4FF" style={{ flexShrink: 0 }} />
                    Seamless iCloud cross-save sync between iPhone, iPad, and Mac
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#80A4FF" style={{ flexShrink: 0 }} />
                    Pre-order reward: Exclusive Celestial Astrolabe Avatar Frame
                  </li>
                </ul>
              </div>

              <button
                className="btn-gold"
                onClick={() => {
                  sound.playChime(950);
                  setIsModalOpen(true);
                }}
                style={{ width: '100%', padding: '14px', fontSize: '14px' }}
              >
                PRE-REGISTER ON APP STORE
              </button>
            </div>

            {/* Google Play Store Card */}
            <div
              className="treasury-rail-card app-download-card"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 168, 107, 0.08) 0%, rgba(10, 25, 20, 0.85) 100%)',
                border: '1px solid rgba(0, 230, 118, 0.35)',
                borderRadius: '18px',
                boxShadow: '0 12px 35px rgba(0, 135, 81, 0.15), inset 0 1px 0 rgba(0, 230, 118, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, #0A2418 0%, #05140D 100%)',
                      border: '1px solid rgba(0, 230, 118, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#00E676',
                      boxShadow: '0 4px 15px rgba(0, 135, 81, 0.4)',
                      flexShrink: 0,
                    }}
                  >
                    {/* Official Google Play Logo SVG */}
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a2.037 2.037 0 0 1-.22-.924V2.738c0-.337.079-.652.219-.924zm11.233 11.233l2.25 2.25-11.45 6.55 9.2-8.8zm0-2.094L5.642 2.153l11.45 6.55-2.25 2.25zm1.536 1.047l3.655 2.09c.895.512.895 1.348 0 1.86l-3.655 2.09-2.072-2.07 2.072-1.97z" />
                    </svg>
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '21px', color: '#FFF', fontWeight: 900 }}>
                      Google Play Store
                    </h4>
                    <div style={{ fontSize: '12px', color: '#00E676', fontWeight: 700 }}>
                      Available for Android Devices (Android 10+)
                    </div>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', fontSize: '13px', color: '#D8D7F0', lineHeight: '2.1', marginBottom: '24px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#00E676" style={{ flexShrink: 0 }} />
                    Vulkan 3D graphic optimization with rich particle lightning effects
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#00E676" style={{ flexShrink: 0 }} />
                    Pinch-to-zoom interactive planetary gestures tuned for touchscreens
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#00E676" style={{ flexShrink: 0 }} />
                    Google Play Games cloud synchronisation & 50+ mythic achievements
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#00E676" style={{ flexShrink: 0 }} />
                    Pre-register reward: Exclusive Ancient Golden Ankh Relic
                  </li>
                </ul>
              </div>

              <button
                className="btn-gold"
                onClick={() => {
                  sound.playChime(950);
                  setIsModalOpen(true);
                }}
                style={{ width: '100%', padding: '14px', fontSize: '14px' }}
              >
                PRE-REGISTER ON GOOGLE PLAY
              </button>
            </div>
          </div>

          {/* 4 Mobile Feature Pillars */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: '32px',
            }}
          >
            <div style={{ textAlign: 'left', padding: '12px' }}>
              <div style={{ color: '#FFD700', marginBottom: '6px' }}><Zap size={22} /></div>
              <div style={{ fontWeight: 800, color: '#FFF', fontSize: '14px', marginBottom: '4px' }}>Native 60 FPS Engine</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>Optimized battery-efficient WebGL rendering engine for smooth orbital globe navigation.</div>
            </div>

            <div style={{ textAlign: 'left', padding: '12px' }}>
              <div style={{ color: '#00E676', marginBottom: '6px' }}><Smartphone size={22} /></div>
              <div style={{ fontWeight: 800, color: '#FFF', fontSize: '14px', marginBottom: '4px' }}>Haptic Sensory Feedback</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>Tactile physical rumbles timed to thunder booms, divine strikes, and holographic reveals.</div>
            </div>

            <div style={{ textAlign: 'left', padding: '12px' }}>
              <div style={{ color: '#80A4FF', marginBottom: '6px' }}><Globe2 size={22} /></div>
              <div style={{ fontWeight: 800, color: '#FFF', fontSize: '14px', marginBottom: '4px' }}>Cross-Platform Cloud Sync</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>Switch seamlessly between iPhone, Android phone, and tablet without losing deity collection progress.</div>
            </div>

            <div style={{ textAlign: 'left', padding: '12px' }}>
              <div style={{ color: '#00CED1', marginBottom: '6px' }}><ShieldCheck size={22} /></div>
              <div style={{ fontWeight: 800, color: '#FFF', fontSize: '14px', marginBottom: '4px' }}>Offline Lore Grimoire</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>Read authentic deity mythologies, cultural lineages, and sacred origins even without data.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL PRE-REGISTRATION CTA BANNER ── */}
      <section
        className="landing-section"
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
          className="ornate-card divine-pulse cta-banner-card"
          style={{
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(200, 134, 10, 0.28) 0%, rgba(20, 20, 50, 0.85) 100%)',
            border: '2px solid #FFD700',
          }}
        >
          <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', color: '#FFF', fontWeight: 900, marginBottom: '14px' }}>
            The Heavens Tremble. Awaken Your Deity.
          </h2>
          <p style={{ maxWidth: '640px', margin: '0 auto 32px', fontSize: '16px', color: '#E0E0FF', lineHeight: '1.65', fontFamily: 'var(--font-lore)' }}>
            Join legions of mortal champions gathering for the Beta Awakening on the App Store & Google Play. Reserve your sacred sanctum today to claim the exclusive <strong style={{ color: '#FFD700' }}>Founder's Mythic Starter Pack</strong> upon entry.
          </p>

          <button
            className="btn-gold cta-banner-btn"
            onClick={() => {
              sound.playThunder();
              sound.playChime(1000);
              setIsModalOpen(true);
            }}
          >
            <Sparkles size={20} />
            PRE-REGISTER FOR EARLY BETA ACCESS
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="footer-container"
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
          className="footer-inner"
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

          <div className="footer-links" style={{ display: 'flex', gap: '28px', fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>
            <a href="#globe" onClick={() => sound.playChime(600)} style={{ color: 'inherit', textDecoration: 'none' }}>The Globe</a>
            <a href="#atlas" onClick={() => sound.playChime(700)} style={{ color: 'inherit', textDecoration: 'none' }}>Grimoire</a>
            <a href="#download" onClick={() => sound.playChime(800)} style={{ color: 'inherit', textDecoration: 'none' }}>Mobile App</a>
            <a href="#simulator" onClick={() => sound.playChime(900)} style={{ color: 'inherit', textDecoration: 'none' }}>Altar Demo</a>
          </div>
        </div>

        {/* Mobile Game Store & Folklore Respect Notice */}
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
            Pantheon Gacha is an epic mythical mobile adventure game. Available soon for free download on the Apple App Store and Google Play Store. Rated 12+ for fantasy themes. Internet connection required for online features.
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
      />
    </div>
  );
}

export default App;
