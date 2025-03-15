import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../modules/auth/entities';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Post, Tag } from 'src/modules/post/entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USERNAME'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DATABASE'),
          entities: [User, Post, Tag],
          migrations: ['src/database/migration/*{.ts,.js}'],
          // synchronize: false,
          synchronize: true,
          // migrationsRun: configService.get<string>('RUN_MIGRATIONS') === 'true',
          migrationsRun: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class PostgresModule {}
