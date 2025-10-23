import NodeCache from "node-cache";

export const cache = new NodeCache({
    stdTTL: 3600,
    // possibly look into mirroring cache with db
    // and only mutating specific data - if extra performance seems necessary
    // useClones: false 
});


export function getCache<T = any>(key: string): T | undefined {
  return cache.get(key);
}

export function setCache(key: string, value: any) {
  cache.set(key, value);
}

export function invalidateCache(key: string) {
  cache.del(key);
}

export function flushCache() {
  cache.flushAll();
}