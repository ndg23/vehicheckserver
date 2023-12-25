import { Test, TestingModule } from '@nestjs/testing';
import { VerbalisationController } from './verbalisation.controller';
import { VerbalisationService } from './verbalisation.service';

describe('VerbalisationController', () => {
  let controller: VerbalisationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerbalisationController],
      providers: [VerbalisationService],
    }).compile();

    controller = module.get<VerbalisationController>(VerbalisationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
