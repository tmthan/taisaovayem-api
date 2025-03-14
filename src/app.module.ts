import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisCacheModule } from './shared/cache';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from './database/postgres.module';
import { AuthModule } from './modules/auth';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PostgresModule,
    RedisCacheModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
