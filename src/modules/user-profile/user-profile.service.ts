import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserProfileDto } from '../../dto/user-profile/create-user-profile.dto';
import { UpdateUserProfileDto } from '../../dto/user-profile/update-user-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserProfile } from '../../models/userProfile.interface';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel('UserProfile') private userProfileModel: Model<UserProfile>,
  ) {}

  async create(createUserProfileDto: CreateUserProfileDto) {
    const newUser = new this.userProfileModel({
      ...createUserProfileDto,
    });
    try {
      return await newUser.save();
    } catch (error) {
      // if duplicate key error handel here
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      console.log('error', error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all userProfile`;
  }

  async findOne(id: number) {
    return await this.userProfileModel.findOne({ _id: id }).lean().exec();
  }

  async findOneBy(
    field: string,
    value: string,
  ): Promise<UserProfile | undefined> {
    const query = {};
    query[field] = value;
    return this.userProfileModel.findOne(query).exec();
  }

  update(id: number, updateUserProfileDto: UpdateUserProfileDto) {
    return `This action updates a #${id} userProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} userProfile`;
  }
}
