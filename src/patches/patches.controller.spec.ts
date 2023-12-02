import { Test, TestingModule } from '@nestjs/testing';
import { PatchesController } from './patches.controller';
import { PatchesService } from './patches.service';

describe('PatchesController', () => {
  let controller: PatchesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatchesController],
      providers: [PatchesService],
    }).compile();

    controller = module.get<PatchesController>(PatchesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
