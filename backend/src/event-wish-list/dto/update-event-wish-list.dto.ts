import { PartialType } from '@nestjs/swagger';
import { CreateEventWishListDto } from './create-event-wish-list.dto';

export class UpdateEventWishListDto extends PartialType(CreateEventWishListDto) {}
