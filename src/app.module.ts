import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {AppController} from './controllers/app.controller';
import {AppService} from './services/app.service';
import {MongodbModule} from './config/mongodb.module';
import {HttpModule} from "@nestjs/axios";
import {AuthApiService} from "./api-services/auth-api/auth-api.service";
import {CheckHeaderMiddleware} from "./core/platform-key-middleware/check-header.middleware";
import {JwtStrategy} from "./core/jwt-auth-guard/jwt.strategy";


@Module({
    imports: [
        MongodbModule,
        HttpModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        AuthApiService,
        JwtStrategy
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(CheckHeaderMiddleware /* , otherMiddleWare */)
            .forRoutes({path: '*', method: RequestMethod.ALL} /* OR AppController */);
      /*  // to implement other middleware:
       consumer
            .apply(NewMiddleware)
            .forRoutes({ path: 'demo', method: RequestMethod.GET });*/

    }

    //ayhaga kjahsdkjhasdhas
}
