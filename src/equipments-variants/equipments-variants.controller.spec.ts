import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentsVariantsController } from './equipments-variants.controller';
import { EquipmentsVariantsService } from './equipments-variants.service';

describe('EquipmentsVariantsController', () => {
  let controller: EquipmentsVariantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentsVariantsController],
      providers: [EquipmentsVariantsService],
    }).compile();

    controller = module.get<EquipmentsVariantsController>(EquipmentsVariantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
