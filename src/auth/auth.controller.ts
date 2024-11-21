import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDTO, UserRegisterDTO } from 'common/dto';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() userLoginDTO: UserLoginDTO) {
    return this.authService.login(userLoginDTO);
  }

  @Post('register')
  async register(@Body() userRegisterDTP: UserRegisterDTO) {
    return this.authService.register(userRegisterDTP);
  }
}
