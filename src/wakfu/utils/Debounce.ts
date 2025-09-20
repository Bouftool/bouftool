// biome-ignore lint/suspicious/noExplicitAny: Generic class
export class Debounce<Args extends any[], Return> {
  private timeoutDuration: number;
  private timeout: NodeJS.Timeout | null = null;
  private promise: Promise<Return> | null = null;
  private resolve: ((value: Return) => void) | null = null;
  private callback: (...args: Args) => Return;

  constructor(callback: (...args: Args) => Return, timeout: number = 500) {
    this.callback = callback;
    this.timeoutDuration = timeout;
  }

  public call(...args: Args) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (!this.promise) {
      this.promise = new Promise((resolve) => {
        this.resolve = resolve;
      });
    }
    this.timeout = setTimeout(async () => {
      const value = await this.callback(...args);
      this.timeout = null;
      if (this.resolve) {
        this.resolve(value);
        this.promise = null;
        this.resolve = null;
      }
    }, this.timeoutDuration);
    return this.promise;
  }
}
