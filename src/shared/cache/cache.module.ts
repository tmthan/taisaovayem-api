import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { CacheService } from './service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory(configService: ConfigService) {
        return {
          store: redisStore,
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          ttl: configService.get('REDIS_DEFAULT_TTL'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [CacheService, ConfigService],
  exports: [CacheService],
})
export class RedisCacheModule {}
