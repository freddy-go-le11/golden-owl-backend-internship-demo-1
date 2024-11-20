import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserLoginDTO } from '../../common/dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login({ email, password }: UserLoginDTO) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new UnauthorizedException('User not found');

    const isPasswordValid = password === user.password;
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    return user;
  }

  async register(_user: Pick<User, 'name' | 'email' | 'password'>) {
    const existsUser = await this.userRepository.findOneBy({
      email: _user.email,
    });

    if (existsUser) throw new ConflictException('User already exists');

    const user = await this.userRepository.save(_user);
    return user;
  }
}
