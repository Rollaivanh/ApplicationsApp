// export class CreatePostulacioneDto {}

import { Postulacion } from '@prisma/client';

export type CreatePostulacioneDto = Omit<
  Postulacion,
  'id' | 'updatedAt' | 'createdAt'
>;
