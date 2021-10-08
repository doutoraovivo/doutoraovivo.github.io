"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TtlCache = void 0;
class TtlCache {
    constructor() {
        this.cache = {};
    }
    getOrAddAsync(key, fetch, ttl) {
        let cached = this.cache[key];
        const now = Date.now();
        if (cached) {
            if (cached.expires >= now) {
                return cached.promise;
            }
            else {
                delete this.cache[key];
            }
        }
        const fetchPromise = fetch();
        this.cache[key] = cached = {
            expires: Number.MAX_VALUE,
            promise: fetchPromise
        };
        fetchPromise.then(() => {
            cached.expires = now + ttl;
            this.cleanup(now);
        }, () => {
            cached.expires = now + ttl;
            this.cleanup(now);
        });
        return fetchPromise;
    }
    cleanup(now) {
        for (const key in this.cache) {
            if (this.cache[key].expires < now) {
                delete this.cache[key];
            }
        }
    }
}
exports.TtlCache = TtlCache;
//# sourceMappingURL=ttlCache.js.map