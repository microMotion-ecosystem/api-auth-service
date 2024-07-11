import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateUserProfileDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  mobile?: string;

  @IsEnum(['male', 'female'])
  gender?: string;

  @IsOptional()
  @IsDate()
  dob?: Date;

  // Additional properties will be validated separately

  // @IsOptional()
  // metadata: Record<string, any>;

  @IsOptional()
  additionalData?: Record<string, any>;
}
