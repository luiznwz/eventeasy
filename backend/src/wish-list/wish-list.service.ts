import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWishListDto } from './dto/create-wish-list.dto';
import { UpdateWishListDto } from './dto/update-wish-list.dto';
import { WishList } from './entities/wish-list.entity';
import { EventEntity } from 'src/events/entities/event.entity';
import { Catalog } from 'src/catalog/entities/catalog.entity';

@Injectable()
export class WishListService {
  constructor(
    @InjectRepository(WishList)
    private readonly wishListRepository: Repository<WishList>,

    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,

    @InjectRepository(Catalog)
    private readonly catalogRepository: Repository<Catalog>,
  ) { }

  async create(createWishListDto: CreateWishListDto): Promise<WishList> {
    try {
      const event = await this.eventRepository.findOne({ where: { id: createWishListDto.eventId } });
      if (!event) {
        throw new NotFoundException(`Event with id ${createWishListDto.eventId} not found`);
      }

      const catalog = await this.catalogRepository.findOne({ where: { id: createWishListDto.catalogId } });

      if (!catalog) {
        throw new NotFoundException(`Catalog item with id ${createWishListDto.catalogId} not found`);
      }

      const wishListItem = this.wishListRepository.create(createWishListDto);

      return await this.wishListRepository.save(wishListItem);
    } catch (error) {
      throw new InternalServerErrorException('Error creating wish list item');
    }
  }

  async findAllByEvent(eventId: string) {
    try {
      const event = await this.eventRepository.findOne({
        where: { id: eventId },
        relations: ['wishLists', 'wishLists.catalog'],
      });
      if (!event) {
        throw new NotFoundException(`Event with id ${eventId} not found`);
      }
      return event;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving wish list items for event');
    }
  }

  async findOneWishListItem(id: string): Promise<WishList> {
    try {
      const wishListItem = await this.wishListRepository.findOne({
        where: { id },
        relations: ['event', 'catalog'],
      });

      if (!wishListItem) {
        throw new NotFoundException(`Wish list item with id ${id} not found`);
      }

      return wishListItem;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving wish list item');
    }
  }

  async update(id: string, updateWishListDto: UpdateWishListDto): Promise<WishList> {
    try {
      const wishListItem = await this.wishListRepository.findOne({ where: { id } });

      if (!wishListItem) {
        throw new NotFoundException(`Wish list item with id ${id} not found`);
      }

      if (updateWishListDto.eventId) {
        const event = await this.eventRepository.findOne({ where: { id: updateWishListDto.eventId } });

        if (!event) {
          throw new NotFoundException(`Event with id ${updateWishListDto.eventId} not found`);
        }
      }

      if (updateWishListDto.catalogId) {
        const catalog = await this.catalogRepository.findOne({ where: { id: updateWishListDto.catalogId } });

        if (!catalog) {
          throw new NotFoundException(`Catalog item with id ${updateWishListDto.catalogId} not found`);
        }
      }

      const updatedWishListItem = this.wishListRepository.merge(wishListItem, updateWishListDto);

      return await this.wishListRepository.save(updatedWishListItem);
    } catch (error) {
      throw new InternalServerErrorException('Error updating wish list item');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const wishListItem = await this.wishListRepository.findOne({ where: { id } });
      
      if (!wishListItem) {
        throw new NotFoundException(`Wish list item with id ${id} not found`);
      }

      await this.wishListRepository.softRemove(wishListItem);
    } catch (error) {
      throw new InternalServerErrorException('Error removing wish list item');
    }
  }
}
