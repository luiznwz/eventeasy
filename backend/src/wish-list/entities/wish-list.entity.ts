import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn
} from 'typeorm';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Catalog } from 'src/catalog/entities/catalog.entity';
import { EventEntity } from 'src/events/entities/event.entity';
import { EventWishList } from 'src/event-wish-list/entities/event-wish-list.entity';

@Entity('wish_list')
export class WishList {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: 1 })
    @IsOptional()
    @IsNumber()
    quantity: number;

    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    priority?: string;

    @Column({ name: 'event_id' })
    @IsNotEmpty()
    eventId: string;

    @Column({ name: 'catalog_id' })
    @IsNotEmpty()
    catalogId: string;

    @Exclude()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Exclude()
    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt?: Date;

    @ManyToOne(() => EventEntity, event => event.wishLists)
    @JoinColumn({ name: 'event_id' })
    @IsNotEmpty()
    event: EventEntity;

    @ManyToOne(() => Catalog)
    @JoinColumn({ name: 'catalog_id' })
    @IsNotEmpty()
    catalog: Catalog;

    @OneToMany(() => EventWishList, eventWishList => eventWishList.wishList)
    eventWishLists: EventWishList[];
}
