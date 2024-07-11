import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsObject,
} from 'class-validator';
import { UserProfile } from '../../models/userProfile.interface';
import { IsTwoWords } from '../../core/class-validator/isTwoWords.validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsTwoWords()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsObject()
  userProfileData: UserProfile;
}
