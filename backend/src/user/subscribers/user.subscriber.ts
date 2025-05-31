import { EventSubscriber, EntitySubscriberInterface, SoftRemoveEvent } from 'typeorm';
import { User } from '../entities/user.entity';
import { EventEntity } from 'src/events/entities/event.entity';
import { Guest } from 'src/guests/entities/guest.entity';
// Importe outras entidades relacionadas, se necessário

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    /**
     * Indica que esse subscriber observa a entidade User.
     */
    listenTo() {
        return User;
    }

    /**
     * Método chamado após o soft delete de um usuário.
     */
    async afterSoftRemove(event: SoftRemoveEvent<User>): Promise<void> {
        if (!event.entity) {
            return;
        }

        const userId = event.entity.id;

        const manager = event.manager;

        await manager.getRepository(EventEntity).softDelete({ userId });

        await manager.getRepository(Guest).softDelete({ userId });
    }
}
