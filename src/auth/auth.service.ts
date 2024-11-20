import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserLoginDTO } from '../../common/dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login({ email, password }: UserLoginDTO) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new UnauthorizedException('User not found');

    const isPasswordValid = compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    return user;
  }

  async register(_user: Pick<User, 'name' | 'email' | 'password'>) {
    const existsUser = await this.userRepository.findOneBy({
      email: _user.email,
    });

    if (existsUser) throw new ConflictException('User already exists');

    const newPassword = await hash(_user.password, 10);
    const user = await this.userRepository.save({
      ..._user,
      password: newPassword,
    });
    return user;
  }
}
