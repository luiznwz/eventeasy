import { Module } from '@nestjs/common';
import { WishListService } from './wish-list.service';
import { WishListController } from './wish-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishList } from './entities/wish-list.entity';
import { Catalog } from 'src/catalog/entities/catalog.entity';
import { EventEntity } from 'src/events/entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WishList,
      Catalog,
      EventEntity
    ])
  ],
  controllers: [WishListController],
  providers: [WishListService],
})
export class WishListModule { }
