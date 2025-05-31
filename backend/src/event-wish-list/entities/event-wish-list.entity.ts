import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { Exclude } from 'class-transformer';
import { WishList } from 'src/wish-list/entities/wish-list.entity';

@Entity('event_wish_list')
export class EventWishList {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'selected_quantity', default: 1 })
    @IsOptional()
    @IsNumber()
    selectedQuantity: number;

    @Column({ name: 'wish_list_id' })
    @IsNotEmpty()
    wishListId: string;

    @Exclude()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Exclude()
    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt?: Date;

    @ManyToOne(() => WishList, wishList => wishList.eventWishLists)
    @JoinColumn({ name: 'wish_list_id' })
    wishList: WishList;
}
