import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { MongodbModule } from './config/mongodb.module';
import { HttpModule } from '@nestjs/axios';
import { CheckHeaderMiddleware } from './core/platform-key-middleware/check-header.middleware';
import { JwtStrategy } from './core/jwt-auth-guard/jwt.strategy';
import { WpIntegrationController } from './modules/wp-integration/wp-integration.controller';
import { WpIntegrationService } from './modules/wp-integration/wp-integration.service';
import { AuthService } from './modules/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from './modules/users/users.module';
import { TokenModule } from './modules/token/token.module';
import { GoogleStrategy } from './core/google.strategy/google.strategy';
import { LocalStrategy } from './core/local.strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongodbModule,
    HttpModule,
    UsersModule,
    PassportModule,
    TokenModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use an environment variable for the secret in production
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
    }),
  ],
  controllers: [AppController, WpIntegrationController],
  providers: [
    AppService,
    AuthService,
    JwtStrategy,
    WpIntegrationService,
    JwtService,
    GoogleStrategy,
    LocalStrategy,
  ], // Add UsersService here
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckHeaderMiddleware /* , otherMiddleWare */)
      .forRoutes(
        { path: '*', method: RequestMethod.ALL } /* OR AppController */,
      );
    /*  // to implement other middleware:
         consumer
              .apply(NewMiddleware)
              .forRoutes({ path: 'demo', method: RequestMethod.GET });*/
  }
}
