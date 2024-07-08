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
import { WpIntegrationController } from './models/wp-integration/wp-integration.controller';
import { WpIntegrationService } from './models/wp-integration/wp-integration.service';
import { AuthService } from './models/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from './models/users/users.module';

@Module({
  imports: [MongodbModule, HttpModule, UsersModule],
  controllers: [AppController, WpIntegrationController],
  providers: [
    AppService,
    AuthService,
    JwtStrategy,
    WpIntegrationService,
    JwtServic,
  , // Add UsersService here
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckHeaderMiddleware /* , otherMiddleWare */)
      .forRoutes(
        { path: "*", method: RequestMethod.ALL } /* OR AppController */
      );
    /*  // to implement other middleware:
         consumer
              .apply(NewMiddleware)
              .forRoutes({ path: 'demo', method: RequestMethod.GET });*/
  }
}
