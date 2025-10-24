import { Test, TestingModule } from '@nestjs/testing';
import { ElevenLabsService } from './eleven-labs.service';

describe('ElevenLabsService', () => {
  let service: ElevenLabsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElevenLabsService],
    }).compile();

    service = module.get<ElevenLabsService>(ElevenLabsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
