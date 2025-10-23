import { Module } from '@nestjs/common';
import { EntrevistasService } from './entrevistas.service';
import { EntrevistasController } from './entrevistas.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EntrevistasController],
  providers: [EntrevistasService, PrismaService],
})
export class EntrevistasModule {}
