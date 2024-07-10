import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfile, UserProfileSchema } from './user-profile.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserProfile', schema: UserProfileSchema },
    ]),
  ],
  exports: [UserProfileService],
  providers: [
    UserProfileService,
    {
      provide: 'USER_PROFILE_MODEL',
      useFactory: () => UserProfile,
    },
  ],
})
export class UserProfileModule {}
