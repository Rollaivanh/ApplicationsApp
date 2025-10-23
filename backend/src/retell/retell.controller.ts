import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RetellService } from './retell.service';
import { CreateRetellDto } from './dto/create-retell.dto';
import { UpdateRetellDto } from './dto/update-retell.dto';

@Controller('retell')
export class RetellController {
  constructor(private readonly retellService: RetellService) {}

  @Post()
  create(@Body() createRetellDto: CreateRetellDto) {
    return this.retellService.create(createRetellDto);
  }

  @Get()
  findAll() {
    return this.retellService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.retellService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRetellDto: UpdateRetellDto) {
    return this.retellService.update(+id, updateRetellDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.retellService.remove(+id);
  }
}
