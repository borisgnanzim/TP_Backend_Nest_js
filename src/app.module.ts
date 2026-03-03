import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

import { APP_GUARD } from '@nestjs/core'; 
import { ThrottlerGuard } from '@nestjs/throttler';
@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    DatabaseModule, 
    UsersModule, 
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { 
      provide: APP_GUARD, 
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
