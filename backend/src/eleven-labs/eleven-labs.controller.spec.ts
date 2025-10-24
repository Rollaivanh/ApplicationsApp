import { Test, TestingModule } from '@nestjs/testing';
import { ElevenLabsController } from './eleven-labs.controller';
import { ElevenLabsService } from './eleven-labs.service';

describe('ElevenLabsController', () => {
  let controller: ElevenLabsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElevenLabsController],
      providers: [ElevenLabsService],
    }).compile();

    controller = module.get<ElevenLabsController>(ElevenLabsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
