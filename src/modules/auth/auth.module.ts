import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { UserService } from './services';
import { ConfigModule } from '@nestjs/config';
import { RedisCacheModule } from 'src/shared/cache';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    RedisCacheModule,
    ConfigModule,
    JwtModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [UserService],
  // exports: [TypeOrmModule],
})
export class AuthModule {}
