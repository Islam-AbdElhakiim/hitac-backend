import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentsTypesController } from './equipments-types.controller';
import { EquipmentsTypesService } from './equipments-types.service';

describe('EquipmentsTypesController', () => {
  let controller: EquipmentsTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentsTypesController],
      providers: [EquipmentsTypesService],
    }).compile();

    controller = module.get<EquipmentsTypesController>(EquipmentsTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
