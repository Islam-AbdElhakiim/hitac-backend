import { Test, TestingModule } from '@nestjs/testing';
import { SupplyOrdersService } from './supply-orders.service';

describe('SupplyOrdersService', () => {
  let service: SupplyOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplyOrdersService],
    }).compile();

    service = module.get<SupplyOrdersService>(SupplyOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
