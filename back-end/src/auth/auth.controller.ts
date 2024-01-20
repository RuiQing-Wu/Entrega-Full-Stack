import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
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
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiParam,
} from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from './auth.service';
import { Public } from '../decorators/public.decorator';
import { Role } from 'src/users/users.service';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IllegalArgumentError } from 'src/base/argumentError';
import { EntityNotFoundError } from 'src/base/entityNotFounError';
import { RepositoryError } from 'src/base/repositoryError';
import { ConflictError } from 'src/base/conflictError';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiBody({
    schema: {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: {
          type: 'string',
          example: 'juan',
        },
        password: {
          type: 'string',
          example: '1234',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiOkResponse({ description: 'Iniciamos sesión' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    try {
      return this.authService.signIn(signInDto.username, signInDto.password);
    } catch (error) {
      if (error instanceof IllegalArgumentError)
        throw new BadRequestException(error.message);

      if (error instanceof EntityNotFoundError)
        throw new NotFoundException(error.message);

      if (error instanceof RepositoryError)
        throw new InternalServerErrorException(error.message);
    }
  }

  @Public()
  @ApiOperation({ summary: 'Registrar usuario' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Datos a crear',
    required: true,
  })
  @ApiCreatedResponse({ description: 'Usuario registrado' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({ description: 'Ya existe un usuario con este nombre' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.signUp(createUserDto);
    } catch (error) {
      if (error instanceof ConflictError)
        throw new ConflictException(error.message);

      if (error instanceof RepositoryError)
        throw new InternalServerErrorException(error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener perfil de usuario' })
  @ApiOkResponse({ description: 'Obtenemos perfil del usuario' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Roles(Role.User, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  async getProfile(@Request() req) {
    try {
      return await this.authService.getProfile(req.user.username);
    } catch (error) {
      if (error instanceof IllegalArgumentError)
        throw new BadRequestException(error.message);

      if (error instanceof EntityNotFoundError)
        throw new NotFoundException(error.message);

      if (error instanceof RepositoryError)
        throw new InternalServerErrorException(error.message);
    }
  }
}
