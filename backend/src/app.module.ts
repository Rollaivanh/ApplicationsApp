import { Module } from '@nestjs/common';
import { PostulacionesModule } from './postulaciones/postulaciones.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [PostulacionesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
