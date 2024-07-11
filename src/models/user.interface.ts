import { UserProfile } from './userProfile.interface';

export interface User {
  id?: string;
  userName: string;
  password?: string;
  email: string;
  fullName?: string;
  google?: any;

  [key: string]: any;

  userProfileId?: string;
  strategyType?: string;
  userProfileData?: UserProfile;
}
