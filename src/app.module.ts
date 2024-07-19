import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongodbModule } from './config/mongodb.module';
import { CheckHeaderMiddleware } from './core/platform-key-middleware/check-header.middleware';
import { UsersModule } from './modules/users/users.module';
import { TokenModule } from './modules/token/token.module';
import { PassportModule } from '@nestjs/passport';
import { ControllersModule } from './controllers/controllers.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtConfigModule } from './config/jwt-config.module';
import { WpIntegrationModule } from './modules/wp-integration/wp-integration.module';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { RabbitMqConfigModule } from './config/rabbitmq-config.module';

@Module({
  imports: [
    MongodbModule,
    UsersModule,
    PassportModule,
    TokenModule,
    ControllersModule,
    JwtConfigModule,
    RabbitMqConfigModule,

    AuthModule,
    ControllersModule,
    WpIntegrationModule,
    UserProfileModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
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
