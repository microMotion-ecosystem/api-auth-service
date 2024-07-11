import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserSchema } from './user.schema'; // Assuming User is the model

import { MongooseModule } from '@nestjs/mongoose';
import { UserProfileModule } from '../user-profile/user-profile.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UserProfileModule,
  ],

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
