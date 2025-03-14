import {
  Controller,
  Post,
  Body,
  Injectable,
  UseGuards,
  Patch,
} from '@nestjs/common';
import {
  LoginRequest,
  RegisterRequest,
  UserResponse,
  AccessTokenRequest,
  ChangePasswordRequest,
  UpdateInfoRequest,
} from '../dtos';
import { AuthGuard } from '../guards';
import { UserService } from '../services';

@Injectable()
@Controller({ path: 'auth' })
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('register')
  register(@Body() user: RegisterRequest): Promise<UserResponse> {
    return this.userService.register(user);
  }

  @Post('login')
  login(@Body() user: LoginRequest): Promise<UserResponse> {
    return this.userService.login(user);
  }

  @Post('access-token')
  getAccessToken(@Body() token: AccessTokenRequest) {
    return this.userService.getAccessToken(token.refreshToken);
  }

  @UseGuards(AuthGuard)
  @Post('change-password')
  @UseGuards(AuthGuard)
  changePassword(@Body() { password }: ChangePasswordRequest) {
    return this.userService.changePassword(password);
  }

  @UseGuards(AuthGuard)
  @Patch('update-info')
  @UseGuards(AuthGuard)
  updateInfo(@Body() user: UpdateInfoRequest) {
    return this.userService.updateInfo(user);
  }
}
