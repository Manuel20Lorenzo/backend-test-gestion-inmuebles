import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(50, { message: 'El nombre debe tener máximo 50 caracteres' })
  name: string;

  @IsEmail({}, { message: 'Debe ser un correo válido' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(20, { message: 'La contraseña debe tener máximo 20 caracteres' })
  password: string;
}

export class LoginUserDto {
    @IsEmail({}, { message: 'El correo no es válido' })
    email: string;
  
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;
}