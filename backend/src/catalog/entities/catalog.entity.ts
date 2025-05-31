import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity('catalogs')
export class Catalog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    description?: string;

    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    category?: string;

    @Exclude()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Exclude()
    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt?: Date;
}
