import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

  @IsString()
  @IsNotEmpty({message: 'Name is required'})
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['Admin', 'Intern', 'Engineer'],{message: 'Role must be one of the following: Admin, Intern, Engineer'})
  role: 'Admin' | 'Intern' | 'Engineer';
}