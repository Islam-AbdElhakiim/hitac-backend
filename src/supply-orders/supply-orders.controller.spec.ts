import { Test, TestingModule } from '@nestjs/testing';
import { SupplyOrdersController } from './supply-orders.controller';
import { SupplyOrdersService } from './supply-orders.service';

describe('SupplyOrdersController', () => {
  let controller: SupplyOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplyOrdersController],
      providers: [SupplyOrdersService],
    }).compile();

    controller = module.get<SupplyOrdersController>(SupplyOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
