import { Module } from '@nestjs/common';
import { UsersServiceImpl } from './users.service';
import { IUserService } from './interfaces/user.service.interface';
import { UsersRepository } from './repositories/users.repository';
import { UsersRepositoryMongo } from './repositories/users.repository.mongo';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './users.controller';
import { User } from './domain/user.domain';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],

  providers: [
    {
      provide: IUserService,
      useClass: UsersServiceImpl,
    },
    {
      provide: UsersRepository,
      useClass: UsersRepositoryMongo,
    },
    
    UsersResolver
  ],

  controllers: [UserController],
  exports: [IUserService, UsersRepository],
})
export class UsersModule {}
