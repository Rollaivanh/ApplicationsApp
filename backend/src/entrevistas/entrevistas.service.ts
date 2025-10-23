import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEntrevistaDto } from './dto/create-entrevista.dto';
import { UpdateEntrevistaDto } from './dto/update-entrevista.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EntrevistasService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEntrevistaDto) {
    try {
      return await this.prisma.entrevista.create({
        data: {
          tipo: dto.tipo,
          entrevistador: dto.entrevistador,
          fecha: dto.fecha ? new Date(dto.fecha) : null,
          notas: dto.notas,
          numero: dto.numero,
          postulacion: { connect: { id: dto.postulacionId } },
        },
      });
    } catch (error) {
      console.error('🔥 Error en create:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.entrevista.findMany({
      include: { postulacion: true },
      orderBy: { fecha: 'desc' },
    });
  }

  async findOne(id: number) {
    const entrevista = await this.prisma.entrevista.findUnique({
      where: { id },
      include: { postulacion: true },
    });
    if (!entrevista)
      throw new NotFoundException(`Entrevista con id ${id} no encontrada`);
    return entrevista;
  }

  async update(id: number, dto: UpdateEntrevistaDto) {
    try {
      return await this.prisma.entrevista.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Entrevista con id ${id} no encontrada`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.entrevista.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Entrevista con id ${id} no encontrada`);
      }
      throw error;
    }
  }
}
