import { TipoEntrevista } from '@prisma/client';
import { IsDateString, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEntrevistaDto {
  @ApiProperty({ example: 'RRHH', enum: TipoEntrevista })
  @IsEnum(TipoEntrevista)
  tipo?: TipoEntrevista = TipoEntrevista.OTRA;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsOptional()
  @IsString()
  entrevistador?: string;

  @ApiProperty({ example: '2025-10-22T14:00:00Z' })
  @IsOptional()
  @IsDateString()
  fecha?: string;

  @ApiProperty({ example: 'Primera entrevista técnica' })
  @IsOptional()
  @IsString()
  notas?: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsInt()
  numero?: number;

  @ApiProperty({ example: 5, description: 'ID de la postulación asociada' })
  @IsInt()
  postulacionId: number;
}
