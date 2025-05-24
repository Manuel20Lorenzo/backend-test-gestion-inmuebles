import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto, LoginUserDto } from '../dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto: CreateUserDto) {
        console.log('createUserDto:', createUserDto)
        return this.usersService.create(createUserDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.CREATED)
    login(@Body() loginUserDto: LoginUserDto) {
        console.log('loginUserDto:', loginUserDto)
        return this.usersService.login(loginUserDto);
    }

}
