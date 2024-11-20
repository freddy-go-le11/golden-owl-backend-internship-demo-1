import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDTO, UserRegisterDTO } from 'common/dto';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() userLoginDTO: UserLoginDTO) {
    if (!userLoginDTO.email || !userLoginDTO.password) {
      throw new BadRequestException('Email and password are required');
    }

    return this.authService.login(userLoginDTO);
  }

  @Post('register')
  async register(@Body() userRegisterDTP: UserRegisterDTO) {
    if (
      !userRegisterDTP.email ||
      !userRegisterDTP.password ||
      !userRegisterDTP.name
    ) {
      throw new BadRequestException('Email, password, and name are required');
    }

    return this.authService.register(userRegisterDTP);
  }
}
