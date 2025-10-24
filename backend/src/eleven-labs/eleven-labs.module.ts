import { Module } from '@nestjs/common';
import { ElevenLabsService } from './eleven-labs.service';
import { ElevenLabsController } from './eleven-labs.controller';

@Module({
  controllers: [ElevenLabsController],
  providers: [ElevenLabsService],
})
export class ElevenLabsModule {}
