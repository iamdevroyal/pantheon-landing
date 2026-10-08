// Web Audio API Synthesizer with Autolooped Mythic Drone & Thunder
class SoundManager {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  // Ambient Drone Nodes
  private oscRoot: OscillatorNode | null = null;
  private oscFifth: OscillatorNode | null = null;
  private oscShimmer: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  public isAmbientPlaying: boolean = false;
  private hasInitializedAutoplay: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Bind to first interaction to comply with browser autoplay policies
  public setupAutoAmbient() {
    if (this.hasInitializedAutoplay) return;

    const startOnInteraction = () => {
      if (!this.hasInitializedAutoplay && !this.isMuted) {
        this.hasInitializedAutoplay = true;
        this.startAmbientMusic();
      }
      window.removeEventListener('click', startOnInteraction);
      window.removeEventListener('touchstart', startOnInteraction);
      window.removeEventListener('scroll', startOnInteraction);
      window.removeEventListener('keydown', startOnInteraction);
    };

    window.addEventListener('click', startOnInteraction, { once: true });
    window.addEventListener('touchstart', startOnInteraction, { once: true });
    window.addEventListener('scroll', startOnInteraction, { once: true });
    window.addEventListener('keydown', startOnInteraction, { once: true });
  }

  // Divine Celestial Chime (Played on hover / selection / interaction)
  public playChime(freq = 880) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.2);
    } catch {}
  }

  // Deep Spatial Thunder Rumble (For lightning strikes & summons)
  public playThunderBoom() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(26, now + 2.2);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 2.4);
    } catch {}
  }

  public playThunder() {
    this.playThunderBoom();
  }

  // Coin Clink
  public playCoinFlip() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1320, now);
      osc.frequency.exponentialRampToValueAtTime(2640, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {}
  }

  // Start Autolooped Mythic Ambient Drone
  public startAmbientMusic() {
    if (this.isAmbientPlaying || this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Master ambient gain
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.05, now + 3.0); // Gentle 3-second fade in

      // 1. Root Bass Drone (D2 = 73.42 Hz)
      this.oscRoot = this.ctx.createOscillator();
      this.oscRoot.type = 'sine';
      this.oscRoot.frequency.setValueAtTime(73.42, now);

      // 2. Resonant Fifth (A2 = 110.00 Hz)
      this.oscFifth = this.ctx.createOscillator();
      this.oscFifth.type = 'sine';
      this.oscFifth.frequency.setValueAtTime(110.00, now);

      // 3. Shimmering High Harmonic (D4 = 293.66 Hz)
      this.oscShimmer = this.ctx.createOscillator();
      this.oscShimmer.type = 'sine';
      this.oscShimmer.frequency.setValueAtTime(293.66, now);

      // 4. LFO modulation for breathing pulse effect (0.15 Hz = 6.6s cycle)
      this.lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      this.lfo.type = 'sine';
      this.lfo.frequency.setValueAtTime(0.15, now);
      lfoGain.gain.setValueAtTime(0.015, now);

      this.lfo.connect(lfoGain);
      lfoGain.connect(this.ambientGain.gain);

      this.oscRoot.connect(this.ambientGain);
      this.oscFifth.connect(this.ambientGain);
      this.oscShimmer.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.oscRoot.start(now);
      this.oscFifth.start(now);
      this.oscShimmer.start(now);
      this.lfo.start(now);

      this.isAmbientPlaying = true;
    } catch {}
  }

  public stopAmbientMusic() {
    if (!this.isAmbientPlaying) return;
    try {
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.0);
        setTimeout(() => {
          this.oscRoot?.stop();
          this.oscFifth?.stop();
          this.oscShimmer?.stop();
          this.lfo?.stop();

          this.oscRoot?.disconnect();
          this.oscFifth?.disconnect();
          this.oscShimmer?.disconnect();
          this.lfo?.disconnect();
          this.ambientGain?.disconnect();

          this.oscRoot = null;
          this.oscFifth = null;
          this.oscShimmer = null;
          this.lfo = null;
          this.ambientGain = null;
        }, 1100);
      }
      this.isAmbientPlaying = false;
    } catch {}
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbientMusic();
    } else {
      this.startAmbientMusic();
    }
    return !this.isMuted;
  }
}

export const sound = new SoundManager();
