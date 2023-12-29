import { Module } from '@nestjs/common';
import { ComunidadModel } from './comunidades/entities/comunidades.model';
import { ComunidadModule } from './comunidades/comunidades.module';
//import { AuthModule } from './auth/auth.module';
//import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ComunidadModule,
    //AuthModule,
    //UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://isaac1227:developer@misum.hseaz2k.mongodb.net/comunidades?retryWrites=true&w=majority',
    ),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
