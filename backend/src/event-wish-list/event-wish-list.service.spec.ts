import { Test, TestingModule } from '@nestjs/testing';
import { EventWishListService } from './event-wish-list.service';

describe('EventWishListService', () => {
  let service: EventWishListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventWishListService],
    }).compile();

    service = module.get<EventWishListService>(EventWishListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
