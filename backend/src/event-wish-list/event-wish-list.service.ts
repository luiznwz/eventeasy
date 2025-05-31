import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventWishListDto } from './dto/create-event-wish-list.dto';
import { UpdateEventWishListDto } from './dto/update-event-wish-list.dto';
import { EventWishList } from './entities/event-wish-list.entity';
import { WishList } from 'src/wish-list/entities/wish-list.entity';

@Injectable()
export class EventWishListService {
  constructor(
    @InjectRepository(EventWishList)
    private readonly eventWishListRepository: Repository<EventWishList>,

    @InjectRepository(WishList)
    private readonly wishListRepository: Repository<WishList>,
  ) { }

  async create(createEventWishListDto: CreateEventWishListDto): Promise<EventWishList> {
    try {
      const wishList = await this.wishListRepository.findOne({ where: { id: createEventWishListDto.wishListId } });
      if (!wishList) {
        throw new NotFoundException(`Wish list item with id ${createEventWishListDto.wishListId} not found`);
      }

      const eventWishListItem = this.eventWishListRepository.create(createEventWishListDto);
      return await this.eventWishListRepository.save(eventWishListItem);
    } catch (error) {
      throw new InternalServerErrorException('Error creating event wish list item');
    }
  }

  async findByList(wishListId: string) {
    try {
      const wishListData = await this.wishListRepository.findOne({
        where: { id: wishListId },
        relations: ['eventWishLists'],
      });

      if (!wishListData) {
        throw new NotFoundException(`Wish list with id ${wishListId} not found`);
      }

      return wishListData;
    } catch (error) {
      console.error('findByList error:', error);
      throw new InternalServerErrorException('Error retrieving wish list items');
    }
  }


  async update(id: string, updateEventWishListDto: UpdateEventWishListDto): Promise<EventWishList> {
    try {
      const eventWishListItem = await this.eventWishListRepository.findOne({ where: { id } });
      if (!eventWishListItem) {
        throw new NotFoundException(`Event wish list item with id ${id} not found`);
      }

      if (updateEventWishListDto.wishListId) {
        const wishList = await this.wishListRepository.findOne({ where: { id: updateEventWishListDto.wishListId } });
        if (!wishList) {
          throw new NotFoundException(`Wish list item with id ${updateEventWishListDto.wishListId} not found`);
        }
      }

      const updatedItem = this.eventWishListRepository.merge(eventWishListItem, updateEventWishListDto);
      return await this.eventWishListRepository.save(updatedItem);
    } catch (error) {
      throw new InternalServerErrorException('Error updating event wish list item');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const eventWishListItem = await this.eventWishListRepository.findOne({ where: { id } });
      
      if (!eventWishListItem) {
        throw new NotFoundException(`Event wish list item with id ${id} not found`);
      }

      await this.eventWishListRepository.softDelete(eventWishListItem);
    } catch (error) {
      throw new InternalServerErrorException('Error deleting event wish list item');
    }
  }

}
