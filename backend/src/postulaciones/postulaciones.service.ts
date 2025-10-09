import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreatePostulacioneDto } from './dto/create-postulacione.dto';
import { UpdatePostulacioneDto } from './dto/update-postulacione.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostulacionesService {
  constructor(private prismaService: PrismaService) {}

  async create(createPostulacioneDto: CreatePostulacioneDto) {
    try {
      return await this.prismaService.postulation.create({
        data: createPostulacioneDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Postulacion with name ${createPostulacioneDto.empresa} alredy exist `,
          );
        }
      }
    }
  }

  findAll() {
    return this.prismaService.postulation.findMany();
  }

  async findOne(id: number) {
    const postulationFound = await this.prismaService.postulation.findUnique({
      where: {
        id: id,
      },
    });

    if (!postulationFound) {
      throw new NotFoundException(`Postulacion with id ${id} not found `);
    }
    return postulationFound;
  }

  async update(id: number, updatePostulacioneDto: UpdatePostulacioneDto) {
    const postulationFound = await this.prismaService.postulation.update({
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
    const deletePostulation = await this.prismaService.postulation.delete({
      where: {
        id: id,
      },
    });

    if (!deletePostulation) {
      throw new NotFoundException(`Postulation with id ${id} not found `);
    }
    return deletePostulation;
  }
}
