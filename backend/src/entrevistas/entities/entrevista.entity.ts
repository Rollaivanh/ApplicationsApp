import { TipoEntrevista } from '@prisma/client';

export class EntrevistaEntity {
  id: number;
  tipo: TipoEntrevista;
  entrevistador?: string;
  fecha?: Date;
  notas?: string;
  numero?: number;
  postulacionId: number;
}
