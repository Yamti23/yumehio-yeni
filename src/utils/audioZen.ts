/**
 * Native Web Audio Zen Harmonics
 * Generates resonant Japanese singing bowl frequencies (432Hz & 528Hz harmonics)
 * Zero external audio files or dependencies.
 */

class ZenAudioEngine {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = true;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.initContext();
      this.playZenBowl(432, 2.5);
    }
    return this.isMuted;
  }

  public playZenBowl(freq: number = 432, duration: number = 3.5) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const fundamental = freq;
      const harmonics = [1, 2.01, 2.99, 4.02];
      const gains = [0.25, 0.12, 0.06, 0.03];

      harmonics.forEach((harmonic, idx) => {
        const osc = this.ctx!.createOscillator();
        const gainNode = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(fundamental * harmonic, now);

        // Soft attack, long exponential decay (bell / singing bowl)
        gainNode.gain.setValueAtTime(0.0001, now);
        gainNode.gain.exponentialRampToValueAtTime(gains[idx], now + 0.08);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gainNode);
        gainNode.connect(this.ctx!.destination);

        osc.start(now);
        osc.stop(now + duration);
      });
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public playInhaleSound() {
    this.playZenBowl(396, 4.0);
  }

  public playExhaleSound() {
    this.playZenBowl(528, 5.0);
  }
}

export const zenAudio = new ZenAudioEngine();
