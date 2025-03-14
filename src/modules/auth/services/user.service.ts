import {
  Inject,
  Injectable,
  NotFoundException,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import {
  LoginRequest,
  RegisterRequest,
  UpdateInfoRequest,
  UserResponse,
} from '../dtos';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { User } from '../entities';
import { CacheService } from 'src/shared/cache';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { createError } from 'src/shared/helpers';
import { REQUEST } from '@nestjs/core';
import { AppRequest } from 'src/shared/types';
import { UserRole, UserStatus } from '../types';

@Injectable({
  scope: Scope.REQUEST,
})
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(REQUEST)
    private readonly request: AppRequest,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly cacheService: CacheService,
  ) {}

  private generateToken(user: User) {
    const jwtPrivateKey = this.configService.get<string>('JWT_PRIVATE_KEY');
    const token = this.jwtService.sign(
      { id: user.id },
      {
        secret: jwtPrivateKey,
      },
    );
    const refreshToken = this.jwtService.sign(
      { id: user.id },
      {
        secret: jwtPrivateKey,
        expiresIn: '30d',
      },
    );

    void this.cacheService.setObject(token, user, 1000 * 60 * 15);
    void this.cacheService.setObject(
      refreshToken,
      user,
      1000 * 60 * 60 * 24 * 30,
    );
    return { token, refreshToken };
  }

  async getAccessToken(refreshToken: string) {
    const userInfo = await this.cacheService.getObject<User>(refreshToken);
    if (!userInfo) {
      throw new UnauthorizedException();
    }

    const accessToken = this.jwtService.sign(
      { id: userInfo.id },
      {
        secret: this.configService.get<string>('JWT_PRIVATE_KEY'),
      },
    );

    return {
      email: userInfo.email,
      name: userInfo.name,
      accessToken,
      refreshToken,
    };
  }

  async register(data: RegisterRequest): Promise<UserResponse> {
    const findExistEmail = await this.usersRepository.findOneBy({
      email: data.email,
    });
    if (findExistEmail) {
      throw createError({
        error: 'email_exists',
        status: 400,
        message: 'Email đã tồn tại',
      });
    }
    const passwordHashed = await argon2.hash(data.password);
    const user = await this.usersRepository.save({
      ...data,
      status: UserStatus.Active,
      role: UserRole.Member,
      password: passwordHashed,
    });
    const { refreshToken, token } = this.generateToken(user);
    return {
      email: user.email,
      name: user.name,
      accessToken: token,
      refreshToken: refreshToken,
    };
  }

  async login({ email, password }: LoginRequest) {
    const user = await this.usersRepository.findOneBy({
      email,
    });
    if (user && (await argon2.verify(user.password, password))) {
      const { token, refreshToken } = this.generateToken(user);
      const reponse: UserResponse = {
        email: user.email,
        name: user.name,
        accessToken: token,
        refreshToken: refreshToken,
      };
      return reponse;
    }
    throw new UnauthorizedException();
  }

  async changePassword(password: string) {
    const passwordHashed = await argon2.hash(password);
    const user = await this.usersRepository.findOneBy({
      id: this.request.userId,
    });
    if (!user) {
      throw new NotFoundException();
    }
    user.password = passwordHashed;
    return this.usersRepository.save(user);
  }

  async updateInfo(info: UpdateInfoRequest) {
    const user = await this.usersRepository.findOneBy({
      id: this.request.userId,
    });
    return this.usersRepository.save({
      ...user,
      ...info,
    });
  }
}
