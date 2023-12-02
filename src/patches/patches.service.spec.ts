import { Test, TestingModule } from '@nestjs/testing';
import { PatchesService } from './patches.service';

describe('PatchesService', () => {
  let service: PatchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchesService],
    }).compile();

    service = module.get<PatchesService>(PatchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
