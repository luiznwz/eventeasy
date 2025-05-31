import { EntitySubscriberInterface, EventSubscriber, SoftRemoveEvent } from 'typeorm';
import { EventEntity } from 'src/events/entities/event.entity';
import { Guest } from 'src/guests/entities/guest.entity';
import { WishList } from 'src/wish-list/entities/wish-list.entity';
import { EventWishList } from 'src/event-wish-list/entities/event-wish-list.entity';

@EventSubscriber()
export class EventEventSubscriber implements EntitySubscriberInterface<EventEntity> {
    listenTo() {
        return EventEntity;
    }

    async afterSoftRemove(event: SoftRemoveEvent<EventEntity>): Promise<void> {
        let eventId: string | undefined;

        if (event.entity) {
            eventId = event.entity.id;
        } else if (event.entityId) {
            eventId = typeof event.entityId === 'string' ? event.entityId : event.entityId.id;
        }

        if (!eventId) return;

        const manager = event.manager;

        await manager.getRepository(Guest).softDelete({ eventId });

        await manager.getRepository(WishList).softDelete({ eventId });

        const wishLists = await manager.getRepository(WishList).find({ where: { eventId } });

        for (const wishList of wishLists) {
            await manager.getRepository(EventWishList).softDelete({ wishListId: wishList.id });
        }
    }
}
