import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

export const SERVICE = {
  USER_MODULE: 'user_created',
  COMUNIDAD_MODULE: 'comunidad_created',
  ACCION_MODULE : 'accion_created'
}

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost'],
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost'],
        },
      },
    ]),
  ],
})
export class NatsClientModule {}