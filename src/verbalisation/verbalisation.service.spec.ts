import { Test, TestingModule } from '@nestjs/testing';
import { VerbalisationService } from './verbalisation.service';

describe('VerbalisationService', () => {
  let service: VerbalisationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerbalisationService],
    }).compile();

    service = module.get<VerbalisationService>(VerbalisationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
