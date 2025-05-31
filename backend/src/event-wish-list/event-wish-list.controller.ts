import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EventWishListService } from './event-wish-list.service';
import { CreateEventWishListDto } from './dto/create-event-wish-list.dto';
import { UpdateEventWishListDto } from './dto/update-event-wish-list.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('event-wish-list')
export class EventWishListController {
  constructor(private readonly eventWishListService: EventWishListService) { }

  @Post()
  create(@Body() createEventWishListDto: CreateEventWishListDto) {
    return this.eventWishListService.create(createEventWishListDto);
  }

  @Get(':wish_list_id')
  findOne(@Param('wish_list_id') wishListId: string) {
    return this.eventWishListService.findByList(wishListId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventWishListDto: UpdateEventWishListDto) {
    return this.eventWishListService.update(id, updateEventWishListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventWishListService.remove(id);
  }
}
