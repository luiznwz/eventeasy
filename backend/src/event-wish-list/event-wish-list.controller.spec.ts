import { Test, TestingModule } from '@nestjs/testing';
import { EventWishListController } from './event-wish-list.controller';
import { EventWishListService } from './event-wish-list.service';

describe('EventWishListController', () => {
  let controller: EventWishListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventWishListController],
      providers: [EventWishListService],
    }).compile();

    controller = module.get<EventWishListController>(EventWishListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
