import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { EventsModule } from './events/events.module';
import { GuestsModule } from './guests/guests.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CatalogModule } from './catalog/catalog.module';
import { WishListModule } from './wish-list/wish-list.module';
import { EventWishListModule } from './event-wish-list/event-wish-list.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short', // The configuration allows up to 3 requests per second.
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium', // The configuration allows up 20 requests every 10 seconds.
        ttl: 10000,
        limit: 20
      },
      {
        name: 'long', // The configuration allows up 100 requests per minute.
        ttl: 60000,
        limit: 100
      }
    ]),
    DatabaseModule,
    EventsModule,
    GuestsModule,
    AuthModule,
    UserModule,
    CatalogModule,
    WishListModule,
    EventWishListModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})

export class AppModule { }
