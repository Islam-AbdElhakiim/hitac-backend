import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentsTypesService } from './equipments-types.service';

describe('EquipmentsTypesService', () => {
  let service: EquipmentsTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipmentsTypesService],
    }).compile();

    service = module.get<EquipmentsTypesService>(EquipmentsTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
