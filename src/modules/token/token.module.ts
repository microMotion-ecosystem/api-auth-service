import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { User } from '../users/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenSchema } from './token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }]),
  ],
  providers: [
    TokenService,
    {
      provide: 'USER_MODEL',
      useFactory: () => User,
    },
  ],
  exports: [TokenService],
})
export class TokenModule {}
