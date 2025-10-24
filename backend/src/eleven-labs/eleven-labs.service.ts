import { Injectable } from '@nestjs/common';
import { CreateElevenLabDto } from './dto/create-eleven-lab.dto';
import { UpdateElevenLabDto } from './dto/update-eleven-lab.dto';

@Injectable()
export class ElevenLabsService {
  create(createElevenLabDto: CreateElevenLabDto) {
    return 'This action adds a new elevenLab';
  }

  findAll() {
    return `This action returns all elevenLabs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} elevenLab`;
  }

  update(id: number, updateElevenLabDto: UpdateElevenLabDto) {
    return `This action updates a #${id} elevenLab`;
  }

  remove(id: number) {
    return `This action removes a #${id} elevenLab`;
  }
}
