import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDTO, UserRegisterDTO } from 'common/dto';
import { instanceToPlain } from 'class-transformer';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  // TODO: Implement login and register methods only return accessToken
  @Post('login')
  async login(@Body() userLoginDTO: UserLoginDTO) {
    return instanceToPlain(this.authService.login(userLoginDTO));
  }

  @Post('register')
  async register(@Body() userRegisterDTP: UserRegisterDTO) {
    return instanceToPlain(this.authService.register(userRegisterDTP));
  }
}
