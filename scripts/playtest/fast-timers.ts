// Collapse the AI's animation delays so a full match runs instantly.
const realSetTimeout = globalThis.setTimeout;

(globalThis as any).setTimeout = (fn: (...args: any[]) => void, _ms?: number, ...args: any[]) =>
  realSetTimeout(fn, 0, ...args);

export {};
