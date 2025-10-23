import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { EntrevistasService } from './entrevistas.service';
import { CreateEntrevistaDto } from './dto/create-entrevista.dto';
import { UpdateEntrevistaDto } from './dto/update-entrevista.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Entrevistas')
@Controller('entrevistas')
export class EntrevistasController {
  constructor(private readonly entrevistasService: EntrevistasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva entrevista asociada a una postulación' })
  async create(@Body() dto: CreateEntrevistaDto) {
    return await this.entrevistasService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las entrevistas' })
  async findAll() {
    return await this.entrevistasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una entrevista por su ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.entrevistasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una entrevista' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEntrevistaDto,
  ) {
    return await this.entrevistasService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una entrevista' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.entrevistasService.remove(id);
  }
}
