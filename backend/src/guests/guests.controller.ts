import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger } from '@nestjs/common';
import { GuestsService } from './guests.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { AuthGuard } from '@nestjs/passport';
import { Guest } from './entities/guest.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('guests')
export class GuestsController {
  private readonly logger = new Logger(GuestsController.name);

  constructor(private readonly guestsService: GuestsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createGuestDto: CreateGuestDto): Promise<Guest> {

    return await this.guestsService.create(createGuestDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<Guest[]> {
    this.logger.log('Fetching all guests');

    return await this.guestsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('by-event/:id')
  async findAllByEvent(@Param('id') id: string): Promise<{ total: number; message: string, guests: Guest[] }> {
    return await this.guestsService.findAllByEvent(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Guest> {
    this.logger.log(`Fetching guest with id: ${id}`);

    return await this.guestsService.findOne(id);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGuestDto: UpdateGuestDto): Promise<Guest> {
    this.logger.log(`Updating guest with id: ${id} using data: ${JSON.stringify(updateGuestDto)}`);

    return await this.guestsService.update(id, updateGuestDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    this.logger.log(`Deleting guest with id: ${id}`);

    return await this.guestsService.remove(id);
  }
}
