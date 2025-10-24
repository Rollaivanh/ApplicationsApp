import { PartialType } from '@nestjs/swagger';
import { CreateElevenLabDto } from './create-eleven-lab.dto';

export class UpdateElevenLabDto extends PartialType(CreateElevenLabDto) {}
