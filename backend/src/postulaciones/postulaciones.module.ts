import { Module } from '@nestjs/common';
import { PostulacionesService } from './postulaciones.service';
import { PostulacionesController } from './postulaciones.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PostulacionesController],
  providers: [PostulacionesService, PrismaService],
})
export class PostulacionesModule {}
