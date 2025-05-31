import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWishListDto {
    @ApiPropertyOptional({
        description: 'Quantity of items desired',
        example: 1,
        default: 1,
    })
    @IsOptional()
    @IsNumber()
    quantity?: number = 1;

    @ApiPropertyOptional({
        description: 'Priority of the item',
        example: 'High',
    })
    @IsOptional()
    @IsString()
    priority?: string;

    @ApiProperty({
        description: 'ID of the event',
        example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    })
    @IsNotEmpty()
    @IsString()
    eventId: string;

    @ApiProperty({
        description: 'ID of the catalog item',
        example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    })
    @IsNotEmpty()
    @IsString()
    catalogId: string;
}
