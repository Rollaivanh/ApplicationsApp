import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostulacionesService } from './postulaciones.service';
import type { CreatePostulacioneDto } from './dto/create-postulacione.dto';
import type { UpdatePostulacioneDto } from './dto/update-postulacione.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Postulations')
@Controller('postulations')
export class PostulacionesController {
  constructor(private readonly postulacionesService: PostulacionesService) {}

  @Post()
  @ApiOperation({ summary: 'New Postulation' })
  create(@Body() createPostulacioneDto: CreatePostulacioneDto) {
    return this.postulacionesService.create(createPostulacioneDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Return all postulations' })
  findAll() {
    return this.postulacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postulacionesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostulacioneDto: UpdatePostulacioneDto,
  ) {
    return this.postulacionesService.update(+id, updatePostulacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postulacionesService.remove(+id);
  }
}
