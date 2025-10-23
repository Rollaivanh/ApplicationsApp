import { Test, TestingModule } from '@nestjs/testing';
import { EntrevistasController } from './entrevistas.controller';
import { EntrevistasService } from './entrevistas.service';

describe('EntrevistasController', () => {
  let controller: EntrevistasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntrevistasController],
      providers: [EntrevistasService],
    }).compile();

    controller = module.get<EntrevistasController>(EntrevistasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
