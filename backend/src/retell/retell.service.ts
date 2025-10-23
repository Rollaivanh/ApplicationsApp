import { Injectable } from '@nestjs/common';
import { CreateRetellDto } from './dto/create-retell.dto';
import { UpdateRetellDto } from './dto/update-retell.dto';

@Injectable()
export class RetellService {
  create(createRetellDto: CreateRetellDto) {
    return 'This action adds a new retell';
  }

  findAll() {
    return `This action returns all retell`;
  }

  findOne(id: number) {
    return `This action returns a #${id} retell`;
  }

  update(id: number, updateRetellDto: UpdateRetellDto) {
    return `This action updates a #${id} retell`;
  }

  remove(id: number) {
    return `This action removes a #${id} retell`;
  }
}
