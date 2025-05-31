import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WishListService } from './wish-list.service';
import { CreateWishListDto } from './dto/create-wish-list.dto';
import { UpdateWishListDto } from './dto/update-wish-list.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('wish-list')
export class WishListController {
  constructor(private readonly wishListService: WishListService) { }

  @Post()
  create(@Body() createWishListDto: CreateWishListDto) {
    return this.wishListService.create(createWishListDto);
  }

  @Get('event/:eventId')
  findAllByEvent(@Param('eventId') eventId: string) {
    return this.wishListService.findAllByEvent(eventId);
  }

  @Get(':id')
  findOneWishListItem(@Param('id') id: string) {
    return this.wishListService.findOneWishListItem(id);
  }
  @Patch(':id')
  updateWishList(@Param('id') id: string, @Body() updateWishListDto: UpdateWishListDto) {
    return this.wishListService.update(id, updateWishListDto);
  }

  @Delete(':id')
  removeWishList(@Param('id') id: string) {
    return this.wishListService.remove(id);
  }
}
