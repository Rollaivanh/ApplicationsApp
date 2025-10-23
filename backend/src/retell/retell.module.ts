import { Module } from '@nestjs/common';
import { RetellService } from './retell.service';
import { RetellController } from './retell.controller';

@Module({
  controllers: [RetellController],
  providers: [RetellService],
})
export class RetellModule {}
