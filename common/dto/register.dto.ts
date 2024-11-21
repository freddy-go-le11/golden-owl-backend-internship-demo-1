import { IsNotEmpty } from 'class-validator';

export class UserRegisterDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
