import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';

import { LocalStrategy } from '../../core/local.strategy/local.strategy';
import { GoogleStrategy } from '../../core/google.strategy/google.strategy';
import { JwtConfigModule } from '../../config/jwt-config.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [UsersModule, PassportModule, JwtConfigModule, TokenModule],
  providers: [AuthService, LocalStrategy, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
