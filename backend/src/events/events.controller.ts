import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Logger, Headers } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { EventEntity } from './entities/event.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Token } from 'src/commom/decorators/token.decorator';

@ApiBearerAuth()
@Controller('events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(private readonly eventsService: EventsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() createEventDto: CreateEventDto,
    @Token() token: string,
  ) {
    const event = await this.eventsService.create(createEventDto, token);

    this.logger.log(`Event created with id: ${event.id}`);

    return event;
  }

  @Get('public')
  async findAll(): Promise<EventEntity[]> {

    this.logger.log(`Fetching all events`);

    const events = await this.eventsService.findAll();

    this.logger.log(`Total events fetched: ${events.length}`);
    
    return events;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-events/:id')
  async getUserEvents(@Param('id') id: string): Promise<EventEntity[]> {
    console.log('User from request:', id);
    this.logger.log(`User ${id} requested their events`);
    const events = await this.eventsService.findEventsByUser(id);
    this.logger.log(`Found ${events.length} events for user ${id}`);
    return events;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EventEntity> {
    this.logger.log(`Fetching event with id: ${id}`);
    const event = await this.eventsService.findOne(id);
    this.logger.log(`Event fetched: ${JSON.stringify(event)}`);
    return event;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto): Promise<EventEntity> {
    this.logger.log(`Updating event ${id} with data: ${JSON.stringify(updateEventDto)}`);
    const updatedEvent = await this.eventsService.update(id, updateEventDto);
    this.logger.log(`Event ${id} updated successfully`);
    return updatedEvent;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    this.logger.log(`Deleting event with id: ${id}`);
    await this.eventsService.remove(id);
    this.logger.log(`Event ${id} deleted successfully`);
  }
}
