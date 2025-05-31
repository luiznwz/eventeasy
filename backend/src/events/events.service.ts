import { Injectable, InternalServerErrorException, NotFoundException, Logger } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity, EventStatus } from './entities/event.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    private readonly authService: AuthService,
  ) { }

  async create(createEventDto: CreateEventDto, token: string): Promise<EventEntity> {
    const user = await this.authService.validateToken(token);

    try {
      const event = this.eventRepository.create({
        ...createEventDto,
        userId: user.id,
      });

      const savedEvent = await this.eventRepository.save(event);

      this.logger.log(`Event created`);

      return savedEvent;
    } catch (error) {
      this.logger.error('Error creating event', error.stack);
      throw new InternalServerErrorException('Error creating event');
    }
  }

  async findAll(): Promise<EventEntity[]> {
    try {
      const events = await this.eventRepository.find({ where: { isPublic: true } });

      this.logger.log(`Fetched ${events.length} events`);
      const updatedEvents = await this.updateExpiredEvents(events);

      return updatedEvents;
    } catch (error) {
      this.logger.error('Error fetching events', error.stack);
      throw new InternalServerErrorException('Error fetching events');
    }
  }


  async findEventsByUser(id: string): Promise<EventEntity[]> {
    try {
      const events = await this.eventRepository.find({
        where: { userId: id },
        relations: ['user'],
      }); this.logger.log(`Fetched ${events.length} events for user ${id}`);
      const updatedEvents = await this.updateExpiredEvents(events);

      return updatedEvents;
    } catch (error) {
      this.logger.error(`Error fetching events for user ${id}, error.stack`);
      throw new InternalServerErrorException('Error fetching user events');
    }
  }

  async findOne(id: string): Promise<EventEntity> {
    try {
      const event = await this.eventRepository.findOne({ where: { id }, relations: ['user'] });
      if (!event) {
        this.logger.warn(`Event with id ${id} not found`);
        throw new NotFoundException(`Event with id ${id} not found`);
      }
      this.logger.log(`Event with id ${id} fetched successfully`);
      const updatedEvents = await this.updateExpiredEvents([event]);

      return { ...updatedEvents[0], userId: event.user.id };
    } catch (error) {
      this.logger.error(`Error fetching event with id ${id}`, error.stack);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error fetching event');
    }
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<EventEntity> {
    try {
      const result = await this.eventRepository.update(id, updateEventDto);
      if (result.affected === 0) {
        this.logger.warn(`Event with id ${id} not found for update`);
        throw new NotFoundException(`Event with id ${id} not found`);
      }
      const updatedEvent = await this.findOne(id);
      this.logger.log(`Event ${id} updated successfully`);
      return updatedEvent;
    } catch (error) {
      this.logger.error(`Error updating event with id ${id}`, error.stack);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error updating event');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const event = await this.eventRepository.findOne({ where: { id } });

      if (!event) {
        throw new NotFoundException(`Event with id ${id} not found`);
      }

      await this.eventRepository.softRemove(event);

      this.logger.log(`Event ${id} deleted successfully`);
    } catch (error) {
      this.logger.error(`Error deleting event with id ${id}`, error.stack);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error deleting event');
    }
  }

  private async updateExpiredEvents(events: EventEntity[]): Promise<EventEntity[]> {
    const now = new Date();

    const updatedEvents = events.map(event => {
      if (event.date < now && event.status !== EventStatus.COMPLETED) {
        event.status = EventStatus.COMPLETED;
      }
      return event;
    });

    await this.eventRepository.save(updatedEvents);
    return updatedEvents;
  }

}

