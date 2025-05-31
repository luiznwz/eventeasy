import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { EventEntity } from 'src/events/entities/event.entity';
import { Guest } from 'src/guests/entities/guest.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255, unique: true })
    @IsEmail()
    email: string;

    @Column()
    @Exclude()
    @IsNotEmpty()
    password: string;

    @Exclude()
    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Exclude()
    @DeleteDateColumn({ name: "deleted_at", nullable: true })
    deletedAt?: Date;

    @OneToMany(() => EventEntity, event => event.user)
    events: EventEntity[];

    @OneToMany(() => Guest, guest => guest.user)
    guests: Guest[];
}
