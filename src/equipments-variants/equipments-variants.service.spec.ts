import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentsVariantsService } from './equipments-variants.service';

describe('EquipmentsVariantsService', () => {
  let service: EquipmentsVariantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipmentsVariantsService],
    }).compile();

    service = module.get<EquipmentsVariantsService>(EquipmentsVariantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
