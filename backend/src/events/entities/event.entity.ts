import { Guest } from 'src/guests/entities/guest.entity';
import { User } from 'src/user/entities/user.entity';
import { Exclude } from 'class-transformer';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { WishList } from 'src/wish-list/entities/wish-list.entity';

export enum EventType {
    IN_PERSON = 'in-person',
    ONLINE = 'online',
}

export enum EventStatus {
    ACTIVE = 'active',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

@Entity('events')
export class EventEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ type: 'timestamp', comment: 'Event date and time' })
    date: Date;

    @Column({ comment: 'Event location' })
    location: string;

    @Column({ type: 'text', nullable: true, comment: 'Event description' })
    description: string;

    @Column({
        type: 'enum',
        enum: EventType,
        comment: 'Type of event: in-person or online',
    })
    type: EventType;

    @Column()
    capacity: number;

    @Column({
        type: 'enum',
        enum: EventStatus,
        comment: 'Event status: active, completed or cancelled',
    })
    status: EventStatus;

    @Column({ name: 'image_url', comment: 'URL of the event image' })
    imageUrl: string;

    @Column({ name: 'is_public', comment: 'Indicates if the event is public' })
    isPublic: boolean;

    @Column({ type: 'uuid', name: 'user_id' })
    userId: string;

    @Exclude()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Exclude()
    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt?: Date;

    @ManyToOne(() => User, user => user.events)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Guest, guest => guest.event)
    guests: Guest[];

    @OneToMany(() => WishList, wishList => wishList.event)
    wishLists: WishList[];
}
