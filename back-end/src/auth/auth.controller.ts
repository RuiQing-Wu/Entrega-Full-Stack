import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from './auth.service';
import { Public } from '../decorators/public.decorator';
import { Role } from 'src/users/users.service';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @Public()
    @Post('register')
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.authService.signUp(createUserDto);
    }

    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}