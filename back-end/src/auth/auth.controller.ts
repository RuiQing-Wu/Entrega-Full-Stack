import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from './auth.service';
import { Public } from '../decorators/public.decorator';
import { Role } from 'src/users/users.service';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @ApiBody({
    schema: {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: {
          type: 'string',
          example: 'user1',
        },
        password: {
          type: 'string',
          example: '123456',
        }
      },  
    },
  })
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiOkResponse({ description: 'OK' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    console.log(signInDto.username, signInDto.password);
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @ApiOperation({ summary: 'Registrar usuario' })
  @ApiCreatedResponse({ description: 'Usuario registrado' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signUp(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener perfil de usuario' })
  @ApiOkResponse({ description: 'OK' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @Roles(Role.User, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  async getProfile(@Request() req) {
    console.log('profile ', req.user.username);
    return await this.authService.getProfile(req.user.username);
  }
}
