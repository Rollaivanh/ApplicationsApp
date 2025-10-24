import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ElevenLabsService } from './eleven-labs.service';
import { CreateElevenLabDto } from './dto/create-eleven-lab.dto';
import { UpdateElevenLabDto } from './dto/update-eleven-lab.dto';

@Controller('eleven-labs')
export class ElevenLabsController {
  constructor(private readonly elevenLabsService: ElevenLabsService) {}

  @Post()
  create(@Body() createElevenLabDto: CreateElevenLabDto) {
    return this.elevenLabsService.create(createElevenLabDto);
  }

  @Get()
  findAll() {
    return this.elevenLabsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.elevenLabsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateElevenLabDto: UpdateElevenLabDto) {
    return this.elevenLabsService.update(+id, updateElevenLabDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.elevenLabsService.remove(+id);
  }
}
