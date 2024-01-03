import { Module } from '@nestjs/common';
import { UsersServiceImp } from './users.service';
import { IUserService } from './interfaces/user.service.interface';
import { UsersRepository } from './repositories/users.repository';
import { UsersRepositoryMongo } from './repositories/users.repository.mongo';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { User } from './domain/user.domain';

@Module({
  
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), 
  ],

  providers: [
    {
      provide: IUserService,
      useClass: UsersServiceImp
    },
    {
      provide: UsersRepository,
      useClass: UsersRepositoryMongo
    }
  ],

  exports: [IUserService, UsersRepository]
})

export class UsersModule { }
