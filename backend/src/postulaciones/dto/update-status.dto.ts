import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusDto {
  @ApiProperty({
    example: 'Entrevista',
    description: 'Nuevo estado de la postulación',
  })
  @IsString()
  status: string;
}
