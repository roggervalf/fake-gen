export class Unique<T, V> {
  private foundItems: Record<string, Set<T>>;
  private maxRetries: number;
  private maxTime: number;
  private startTime: number;
  private currentIterations: number;

  constructor(maxRetries = 20, maxTime = 10) {
    this.foundItems = {} as Record<string, Set<T>>;
    this.maxTime = maxTime;
    this.maxRetries = maxRetries;
    this.startTime = 0;
    this.currentIterations = 0;
  }

  execute(
    scope: string,
    method: (...args: unknown[]) => T,
    args: unknown[],
    model?: V
  ): T {
    this.startTime = new Date().getTime();
    this.currentIterations = 0;
    return this.getUniqueValue(scope, method, args, model);
  }

  clear(scope?: string): void {
    if (!scope) {
      this.foundItems = {};
    } else if (this.foundItems[scope] !== undefined) {
      this.foundItems[scope].clear();
    }
  }

  errorMessage(message: string): Error {
    throw new Error(
      `${message}\nMay not be able to generate any more unique values with current settings.
      \nTry adjusting maxTime or maxRetries parameters.`
    );
  }
  isValuePresent(value: T, scope: string): boolean {
    const scopedValues = this.foundItems[scope];
    if (scopedValues === undefined) {
      this.foundItems[scope] = new Set();
      return false;
    }
    return this.foundItems[scope].has(value);
  }
  getUniqueValue(
    scope: string,
    method: (...args: unknown[]) => T,
    args: unknown[],
    model?: V
  ): T {
    const now = new Date().getTime();
    if (now - this.startTime >= this.maxTime) {
      this.errorMessage(`Exceeded maxTime: ${this.maxTime}`);
    }
    if (this.currentIterations >= this.maxRetries) {
      this.errorMessage(`Exceeded maxRetries: ${this.maxRetries}`);
    }
    const value = method.apply(model || this, args);
    if (this.isValuePresent(value, scope) === false) {
      this.foundItems[scope].add(value);
      this.currentIterations = 0;
      return value;
    } else {
      this.currentIterations = this.currentIterations + 1;
      return this.getUniqueValue(scope, method, args, model);
    }
  }
}
