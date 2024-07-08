import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './user.schema'; // Assuming User is the model

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [
    UsersService,
    {
      provide: 'USER_MODEL',
      useFactory: () => User,
    },
  ],
})
export class UsersModule {}
