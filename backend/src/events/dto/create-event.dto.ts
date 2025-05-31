import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { EventType, EventStatus } from '../entities/event.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
    @ApiProperty({
        description: 'Title of the event',
        example: 'Annual Conference',
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Date of the event in ISO format',
        example: '2025-04-01T10:00:00.000Z',
    })
    @IsNotEmpty()
    @IsDateString()
    date: string;

    @ApiProperty({
        description: 'Location of the event',
        example: 'New York City',
    })
    @IsNotEmpty()
    @IsString()
    location: string;

    @ApiProperty({
        description: 'Optional description of the event',
        example: 'A conference about technology trends',
        required: false,
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        description: 'Type of the event (in-person or online)',
        enum: EventType,
        example: EventType.IN_PERSON,
    })
    @IsNotEmpty()
    @IsEnum(EventType)
    type: EventType;

    @ApiProperty({
        description: 'Status of the event (active, completed or cancelled)',
        enum: EventStatus,
        example: EventStatus.ACTIVE,
    })
    @IsNotEmpty()
    @IsEnum(EventStatus)
    status: EventStatus;

    @ApiProperty({
        description: 'Maximum capacity for the event',
        example: 100,
    })
    @IsNotEmpty()
    @IsNumber()
    capacity: number;

    @ApiProperty({
        description: 'Image URL of the event',
        example: 'http://example.com/event.jpg',
    })
    @IsNotEmpty()
    @IsString()
    imageUrl: string;

    @ApiProperty({
        description: 'Indicates if the event is public',
        example: true,
    })
    @IsNotEmpty()
    @IsBoolean()
    isPublic: boolean;
}
