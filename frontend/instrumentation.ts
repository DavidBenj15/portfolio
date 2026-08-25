export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Node.js 22 experimental Web Storage can create a broken localStorage global
    // (when --localstorage-file is provided without a valid path). Libraries like
    // HeroUI access localStorage during SSR, causing TypeError crashes. Provide a
    // safe in-memory shim so SSR renders succeed; real browser localStorage takes
    // over on the client.
    if (
      typeof globalThis.localStorage === 'undefined' ||
      typeof globalThis.localStorage.getItem !== 'function'
    ) {
      const store: Record<string, string> = {};
      Object.defineProperty(globalThis, 'localStorage', {
        value: {
          getItem: (key: string) => store[key] ?? null,
          setItem: (key: string, value: string) => { store[key] = value; },
          removeItem: (key: string) => { delete store[key]; },
          clear: () => { Object.keys(store).forEach(k => delete store[k]); },
          key: (i: number) => Object.keys(store)[i] ?? null,
          get length() { return Object.keys(store).length; },
        },
        writable: true,
        configurable: true,
      });
    }
  }
}
