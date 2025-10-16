import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreatePostulacioneDto } from './dto/create-postulacione.dto';
import { UpdatePostulacioneDto } from './dto/update-postulacione.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, EstadoPostulacion } from '@prisma/client';

@Injectable()
export class PostulacionesService {
  constructor(private prismaService: PrismaService) {}

  async create(createPostulacioneDto: CreatePostulacioneDto) {
    try {
      return await this.prismaService.postulacion.create({
        data: createPostulacioneDto,
      });
    } catch (error) {
      console.error('🔥 Prisma error:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Postulación con empresa "${createPostulacioneDto.empresa}" ya existe.`,
          );
        }
      }

      throw new InternalServerErrorException(error.message);
    }
  }
  async findAll() {
    try {
      return await this.prismaService.postulacion.findMany();
    } catch (error) {
      console.error('🔥 Error en findAll:', error);
      throw error;
    }
  }

  async findOne(id: number) {
    const postulationFound = await this.prismaService.postulacion.findUnique({
      where: {
        id: id,
      },
    });

    if (!postulationFound) {
      throw new NotFoundException(`Postulacion with id ${id} not found`);
    }
    return postulationFound;
  }

  async update(id: number, updatePostulacioneDto: UpdatePostulacioneDto) {
    const postulationFound = await this.prismaService.postulacion.update({
      where: {
        id,
      },
      data: updatePostulacioneDto,
    });
    if (!postulationFound) {
      throw new NotFoundException(`Postulation with id ${id} Not Found`);
    }
    return postulationFound;
  }

  async remove(id: number) {
    const deletePostulation = await this.prismaService.postulacion.delete({
      where: {
        id: id,
      },
    });

    if (!deletePostulation) {
      throw new NotFoundException(`Postulation with id ${id} not found`);
    }
    return deletePostulation;
  }

  // ✅ AGREGADO: MÉTRICAS PARA DASHBOARD
  async getMetrics() {
    const total = await this.prismaService.postulacion.count();

    const estados = Object.values(EstadoPostulacion);

    const porEstado = await Promise.all(
      estados.map(async (estado) => {
        const count = await this.prismaService.postulacion.count({
          where: { estado: estado },
        });
        return { [estado]: count };
      }),
    );

    const agrupadas = await Promise.all(
      estados.map(async (estado) => {
        const list = await this.prismaService.postulacion.findMany({
          where: { estado: estado },
          orderBy: { creadaEn: 'desc' },
        });
        return { [estado]: list };
      }),
    );

    return {
      total,
      porEstado: Object.assign({}, ...porEstado),
      agrupadas: Object.assign({}, ...agrupadas),
    };
  }
}
