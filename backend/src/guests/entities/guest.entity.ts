import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Check,
    Unique,
} from 'typeorm';

import { EventEntity } from 'src/events/entities/event.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('guests')
@Unique('UQ_guest_user_event', ['userId', 'eventId'])
@Check(`("user_id" IS NOT NULL) OR ("name" IS NOT NULL AND "email" IS NOT NULL)`)
export class Guest {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 150, nullable: true })
    name: string;

    @Column({ length: 100, nullable: true })
    email: string;

    @Column({ type: 'uuid', nullable: true, name: 'user_id' })
    userId?: string;

    @Column({ type: 'uuid', name: 'event_id' })
    eventId: string;

    @Column({ type: 'boolean', name: 'is_attending', default: false })
    isAttending: boolean;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
    deletedAt?: Date;

    @ManyToOne(() => EventEntity, event => event.guests)
    @JoinColumn({ name: 'event_id' })
    event: EventEntity;

    @ManyToOne(() => User, user => user.guests, { nullable: true })
    @JoinColumn({ name: 'user_id' })
    user?: User;
}
