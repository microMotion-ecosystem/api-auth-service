import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from '../modules/auth/auth.module';
import { UsersModule } from '../modules/users/users.module';
import { WpIntegrationController } from './wp-integration.controller';
import { WpIntegrationModule } from '../modules/wp-integration/wp-integration.module';
import { UsersController } from './users.controller';
import { UserProfileController } from './user-profile.controller';
import { UserProfileModule } from '../modules/user-profile/user-profile.module';

@Module({
  imports: [AuthModule, UsersModule, WpIntegrationModule, UserProfileModule],
  controllers: [
    AppController,
    WpIntegrationController,
    UsersController,
    UserProfileController,
  ],
  providers: [],
})
export class ControllersModule {}
