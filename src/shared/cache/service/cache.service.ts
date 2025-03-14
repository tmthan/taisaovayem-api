import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private configService: ConfigService,
  ) {}

  set(key: string, value: string, ttl?: number) {
    return this.cache.set(key, value, ttl);
  }

  get(key: string) {
    return this.cache.get(key);
  }

  setObject<T>(key: string, value: T, ttl?: number) {
    return this.cache.set(key, JSON.stringify(value), ttl);
  }

  getObject<T>(key: string) {
    return this.cache
      .get(key)
      .then((result: string | undefined) =>
        result ? (JSON.parse(result) as T) : undefined,
      );
  }

  delete(key: string) {
    return this.cache.del(key);
  }
}
