// export class CreatePostulacioneDto {}

import { Postulation } from '@prisma/client';

export type CreatePostulacioneDto = Omit<Postulation, 'id' | 'updatedAt'>;
