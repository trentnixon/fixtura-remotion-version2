/**
 * Creates a memoized version of a function that caches results based on arguments
 * @param fn The function to memoize
 * @returns Memoized function
 */
export function memoize<T extends (...args: unknown[]) => unknown>(
  fn: T,
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>();

  return (...args: Parameters<T>): ReturnType<T> => {
    // Create a cache key from the arguments
    const key = JSON.stringify(args);

    // Return cached result if available
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }

    // Calculate result, cache it, and return
    const result = fn(...args);
    cache.set(key, result as ReturnType<T>);
    return result as ReturnType<T>;
  };
}

/**
 * Creates a memoized function with a limited cache size
 * @param fn The function to memoize
 * @param maxSize Maximum cache size
 * @returns Memoized function with limited cache
 */
export function memoizeWithLimit<T extends (...args: unknown[]) => unknown>(
  fn: T,
  maxSize: number = 100,
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>();
  const keyTimestamps = new Map<string, number>();

  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      // Update timestamp for this key
      keyTimestamps.set(key, Date.now());
      return cache.get(key) as ReturnType<T>;
    }

    // If cache is full, remove oldest entry
    if (cache.size >= maxSize) {
      let oldestKey = "";
      let oldestTime = Infinity;

      for (const [k, time] of keyTimestamps.entries()) {
        if (time < oldestTime) {
          oldestKey = k;
          oldestTime = time;
        }
      }

      if (oldestKey) {
        cache.delete(oldestKey);
        keyTimestamps.delete(oldestKey);
      }
    }

    // Add new result to cache
    const result = fn(...args);
    cache.set(key, result as ReturnType<T>);
    keyTimestamps.set(key, Date.now());

    return result as ReturnType<T>;
  };
}

/**
 * Memoizes color computations that are particularly expensive
 * @param colorFn Color computation function
 * @returns Memoized color function
 */
export function memoizeColorFunction<
  T extends (...args: unknown[]) => string | string[],
>(colorFn: T): T {
  return memoize(colorFn) as unknown as T;
}

/**
 * Factory function to create cached color processors
 * @returns Object with memoized color functions
 */
export function createCachedColorProcessors() {
  // Create an empty cache that will be filled as needed
  const cache: Record<string, unknown> = {};

  return {
    /**
     * Gets a cached result if available, or computes and caches it
     * @param key Cache key
     * @param computeFn Function to compute the value if not cached
     * @returns Cached or computed value
     */
    getOrCompute<T>(key: string, computeFn: () => T): T {
      if (cache[key] === undefined) {
        cache[key] = computeFn();
      }
      return cache[key] as T;
    },

    /**
     * Clears the entire cache
     */
    clearCache(): void {
      Object.keys(cache).forEach((key) => {
        delete cache[key];
      });
    },

    /**
     * Removes specific keys from the cache
     * @param keys Keys to remove
     */
    invalidate(...keys: string[]): void {
      keys.forEach((key) => {
        delete cache[key];
      });
    },
  };
}
