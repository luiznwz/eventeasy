import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventWishListDto {
    @ApiPropertyOptional({
        description: 'Selected quantity for the wish list item',
        example: 2,
        default: 1,
    })
    @IsOptional()
    @IsNumber()
    selectedQuantity?: number = 1;

    @ApiProperty({
        description: 'ID of the wish list item',
        example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    })
    @IsNotEmpty()
    @IsString()
    wishListId: string;
}
