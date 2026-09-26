// Web Audio API ambient atmosphere synthesizer for WonderNest School
class SoundAtmosphereManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientGain: GainNode | null = null;
  private birdTimer: number | null = null;
  private isRunning: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    if (this.isMuted) {
      this.start();
      this.isMuted = false;
    } else {
      this.stop();
      this.isMuted = true;
    }
    return !this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public start() {
    try {
      this.initContext();
      if (!this.ctx) return;

      this.isRunning = true;
      this.isMuted = false;

      // Master ambient gain
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.06, this.ctx.currentTime + 3);
      this.ambientGain.connect(this.ctx.destination);

      // Warm background drone (gentle warm resonant morning hum)
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(130.81, this.ctx.currentTime); // C3
      const osc1Gain = this.ctx.createGain();
      osc1Gain.gain.value = 0.03;
      osc1.connect(osc1Gain);
      osc1Gain.connect(this.ambientGain);
      osc1.start();

      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(196.00, this.ctx.currentTime); // G3
      const osc2Gain = this.ctx.createGain();
      osc2Gain.gain.value = 0.015;
      osc2.connect(osc2Gain);
      osc2Gain.connect(this.ambientGain);
      osc2.start();

      // Schedule periodic gentle nature birdsong chirps
      this.scheduleBirdsong();
    } catch {
      // AudioContext policy handled gracefully
    }
  }

  private scheduleBirdsong() {
    if (!this.isRunning || !this.ctx || this.isMuted) return;

    const delay = Math.random() * 4000 + 3500;
    this.birdTimer = window.setTimeout(() => {
      this.playBirdChirp();
      this.scheduleBirdsong();
    }, delay);
  }

  private playBirdChirp() {
    if (!this.ctx || this.isMuted || !this.ambientGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      // Pitch envelope for realistic warble
      const baseFreq = 2200 + Math.random() * 800;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.95, now + 0.16);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.2, now + 0.24);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.02, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ambientGain);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // Audio safety
    }
  }

  public playChime() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 gentle windchime
      freqs.forEach((f, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.06);
        g.gain.setValueAtTime(0.001, now + i * 0.06);
        g.gain.linearRampToValueAtTime(0.035, now + i * 0.06 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 1.2);
        osc.connect(g);
        g.connect(this.ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 1.3);
      });
    } catch {
      // Audio safety
    }
  }

  public stop() {
    this.isRunning = false;
    this.isMuted = true;
    if (this.birdTimer) {
      clearTimeout(this.birdTimer);
      this.birdTimer = null;
    }
    if (this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      } catch {
        // Safe fail
      }
    }
  }
}

export const soundManager = new SoundAtmosphereManager();
