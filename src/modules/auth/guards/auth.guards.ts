import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { CacheService } from 'src/shared/cache';
import { AppRequest } from '../../../shared/types';
import { User } from '../entities';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private cacheService: CacheService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<AppRequest>();
    const { authorization: authorizationHeader } = request.headers;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer '))
      throw new UnauthorizedException();

    const [, accessToken] = authorizationHeader.split(' ');
    const userInfo = await this.cacheService.getObject<User>(accessToken);
    if (!userInfo) throw new UnauthorizedException();
    request.userId = userInfo.id;
    return true;
  }
}
