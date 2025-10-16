export class SeededRandom {
  private seed: number;

  constructor(seed?: number) {
    this.seed = seed ?? Date.now();
  }

  public getSeed(): number {
    return this.seed;
  }

  /**
   * algorithme Mulberry32
   */
  public random(): number {
    this.seed += 0x6d2b79f5;
    let t = this.seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  public randomInt(min: number, max: number): number {
    return Math.floor(this.random() * (max - min)) + min;
  }

  public randomChoice<T>(array: T[]): T {
    return array[this.randomInt(0, array.length)];
  }

  /**
   * Fisher-Yates shuffle
   */
  public shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = this.randomInt(0, i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}
