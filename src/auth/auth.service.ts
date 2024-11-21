import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { UserLoginDTO, UserRegisterDTO } from 'common/dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login({ email, password }: UserLoginDTO) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new UnauthorizedException('User not found');

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    return user;
  }

  async register(userRegisterDTO: UserRegisterDTO) {
    const existsUser = await this.userRepository.findOneBy({
      email: userRegisterDTO.email,
    });

    if (existsUser) throw new ConflictException('User already exists');

    const user = this.userRepository.create(userRegisterDTO);
    return this.userRepository.save(user);
  }
}
