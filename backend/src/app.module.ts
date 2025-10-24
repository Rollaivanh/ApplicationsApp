import { Module } from '@nestjs/common';

// --- Database ---
import { PrismaModule } from '../prisma/prisma.module';

// --- Authentication & Users ---
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';

// --- Applications & Interviews ---
import { ApplicationsModule } from './applications/applications.module';
import { InterviewsModule } from './interviews/interviews.module';

// --- Metrics & Notifications ---
import { MetricsModule } from './metrics/metrics.module';
import { NotificationsModule } from './notifications/notifications.module';

// --- External Integrations ---
import { ElevenLabsModule } from './eleven-labs/eleven-labs.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    // --- Database ---
    PrismaModule,

    // --- Authentication & Users ---
    AuthModule,
    UsersModule,
    ProfilesModule,

    // --- Applications & Interviews ---
    ApplicationsModule,
    InterviewsModule,

    // --- Metrics & Notifications ---
    MetricsModule,
    NotificationsModule,

    // --- External Integrations ---
    ElevenLabsModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
