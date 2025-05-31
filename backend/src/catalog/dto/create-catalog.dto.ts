import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCatalogDto {
    @ApiProperty({
        description: 'Name of the catalog item',
        example: 'Decorations',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiPropertyOptional({
        description: 'Detailed description of the catalog item',
        example: 'Various decoration items for events',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
        description: 'Category of the catalog item',
        example: 'Decoration',
    })
    @IsOptional()
    @IsString()
    category?: string;
}
