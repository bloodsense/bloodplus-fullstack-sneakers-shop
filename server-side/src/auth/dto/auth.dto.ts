import { IsOptional, IsString, IsEmail, MinLength } from 'class-validator';

export class AuthDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsString({
    message: 'Обязательно укажите почту',
  })
  @IsEmail()
  email: string;

  @MinLength(8, {
    message: 'Пароль должен содержать не менее 8 символов',
  })
  @IsString({
    message: 'Обязательно укажите пароль',
  })
  password: string;
}
