import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

// --- Autenticación y usuarios ---
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';

// --- Postulaciones y entrevistas ---
import { PostulacionesModule } from './postulaciones/postulaciones.module';
import { EntrevistasModule } from './entrevistas/entrevistas.module';

// --- Métricas y notificaciones ---
import { MetricsModule } from './metrics/metrics.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';

// --- Integraciones externas ---
import { RetellModule } from './retell/retell.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    // --- Base de datos ---
    PrismaModule,

    // --- Autenticación y usuarios ---
    AuthModule,
    UsersModule,
    ProfilesModule,

    // --- Postulaciones y entrevistas ---
    PostulacionesModule,
    EntrevistasModule,

    // --- Métricas y notificaciones ---
    MetricsModule,
    NotificacionesModule,

    // --- Integraciones externas ---
    RetellModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
