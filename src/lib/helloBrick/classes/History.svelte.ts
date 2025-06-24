export class History<T> {
  private data: T[];

  constructor(initialArray: T[] = []) {
    this.data = $state([...initialArray]);
  }

  add(value: T): void {
    this.data = [value, ...this.data];
  }

  peakPrev(): T | undefined {
    if (this.data.length === 0) return undefined;
    return this.data[0];
  }

  prev(): T | undefined {
    return this.data.shift();
  }

  // Optional: getter for length
  get length(): number {
    return this.data.length;
  }
}
