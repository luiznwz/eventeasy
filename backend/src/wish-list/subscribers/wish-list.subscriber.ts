import { EventSubscriber, EntitySubscriberInterface, SoftRemoveEvent } from 'typeorm';
import { WishList } from 'src/wish-list/entities/wish-list.entity';
import { EventWishList } from 'src/event-wish-list/entities/event-wish-list.entity';

@EventSubscriber()
export class WishListSubscriber implements EntitySubscriberInterface<WishList> {
  listenTo() {
    return WishList;
  }

  async afterSoftRemove(event: SoftRemoveEvent<WishList>): Promise<void> {
    let wishListId: string | undefined;
    
    if (event.entity) {
      wishListId = event.entity.id;
    } else if (event.entityId) {
      wishListId = typeof event.entityId === 'string' ? event.entityId : event.entityId.id;
    }
    if (!wishListId) return;

    const manager = event.manager;

    await manager.getRepository(EventWishList).softDelete({ wishListId });
  }
}
