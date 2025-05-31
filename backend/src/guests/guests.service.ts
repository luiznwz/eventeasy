import { Injectable, NotFoundException, InternalServerErrorException, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guest } from './entities/guest.entity';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';

@Injectable()
export class GuestsService {
  private readonly logger = new Logger(GuestsService.name);

  constructor(
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
  ) { }

  async create(createGuestDto: CreateGuestDto): Promise<Guest> {
    try {
      if (createGuestDto.userId) {
        const userEvent = await this.findByUserAndEvent(createGuestDto.userId, createGuestDto.eventId);

        if (userEvent) {
          throw new BadRequestException('This user is already registered for the event');
        }
      }

      const guest = this.guestRepository.create(createGuestDto);

      const savedGuest = await this.guestRepository.save(guest);

      this.logger.log(`Guest created: ${savedGuest.id}`);

      return savedGuest;
    } catch (error) {
      this.logger.error('Error creating guest', error.stack);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error creating guest');
    }
  }

  async findAll(): Promise<Guest[]> {
    try {
      const guests = await this.guestRepository.find({ relations: ['event', 'user'] });

      this.logger.log(`Fetched ${guests.length} guests`);

      return guests;
    } catch (error) {
      this.logger.error('Error fetching guests', error.stack);

      throw new InternalServerErrorException('Error fetching guests');
    }
  }

  async findAllByEvent(id: string): Promise<{ total: number; message: string, guests: Guest[] }> {
    try {
      const guests = await this.guestRepository.find({
        where: { eventId: id },
      });

      const total = guests.length;

      this.logger.log(`Fetched ${total} guests for event ${id}`);

      return {
        total,
        message: `Found ${total} guests for event ${id}.`,
        guests
      };
    } catch (error) {
      this.logger.error(`Error fetching guests for event ${id}`, error.stack);

      throw new InternalServerErrorException(`Error fetching guests for event ${id}`);
    }
  }


  async findOne(id: string): Promise<Guest> {
    try {
      const guest = await this.guestRepository.findOne({ where: { id }, relations: ['event', 'user'] });
      if (!guest) {
        this.logger.warn(`Guest with id ${id} not found`);
        throw new NotFoundException(`Guest with id ${id} not found`);
      }
      this.logger.log(`Fetched guest with id ${id}`);
      return guest;
    } catch (error) {
      this.logger.error(`Error fetching guest with id ${id}`, error.stack);
      throw new InternalServerErrorException('Error fetching guest');
    }
  }

  async update(id: string, updateGuestDto: UpdateGuestDto): Promise<Guest> {
    try {
      const result = await this.guestRepository.update(id, updateGuestDto);
      if (result.affected === 0) {
        this.logger.warn(`Guest with id ${id} not found for update`);
        throw new NotFoundException(`Guest with id ${id} not found`);
      }
      const updatedGuest = await this.findOne(id);
      this.logger.log(`Guest with id ${id} updated successfully`);
      return updatedGuest;
    } catch (error) {
      this.logger.error(`Error updating guest with id ${id}`, error.stack);
      throw new InternalServerErrorException('Error updating guest');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const guest = await this.guestRepository.findOne({ where: { id } });

      if (!guest) {
        this.logger.warn(`Guest with id ${id} not found for deletion`);

        throw new NotFoundException(`Guest with id ${id} not found`);
      }

      await this.guestRepository.softDelete(guest);

      this.logger.log(`Guest with id ${id} deleted successfully`);
    } catch (error) {
      this.logger.error(`Error deleting guest with id ${id}`, error.stack);
      throw new InternalServerErrorException('Error deleting guest');
    }
  }

  async findByUserAndEvent(userId: string, eventId: string): Promise<Guest | null> {
    try {
      const guest = await this.guestRepository.findOne({ where: { userId, eventId } });
      return guest;
    } catch (error) {
      this.logger.error('Error finding guest by user and event', error.stack);
      throw new InternalServerErrorException('Error finding guest by user and event');
    }
  }
}
