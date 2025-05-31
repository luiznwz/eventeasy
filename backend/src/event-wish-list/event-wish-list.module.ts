import { Module } from '@nestjs/common';
import { EventWishListService } from './event-wish-list.service';
import { EventWishListController } from './event-wish-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishList } from 'src/wish-list/entities/wish-list.entity';
import { EventWishList } from './entities/event-wish-list.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WishList,
      EventWishList
    ]),
  ],
  controllers: [EventWishListController],
  providers: [EventWishListService],
})
export class EventWishListModule { }
