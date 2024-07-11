import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUserProfileDto } from '../../dto/user-profile/create-user-profile.dto';
import { UpdateUserProfileDto } from '../../dto/user-profile/update-user-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserProfile } from '../../models/userProfile.interface';
import { Helper } from '../../helpers/helper';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel('UserProfile') private userProfileModel: Model<UserProfile>,
  ) {}

  async create(createUserProfileDto: CreateUserProfileDto) {
    const additionalData = Helper.toLowerCaseKeys(
      createUserProfileDto.additionalData,
    );

    // i want to remove additionalData from the object createUserProfileDto
    delete createUserProfileDto.additionalData;

    try {
      const newUserProfile = new this.userProfileModel({
        ...createUserProfileDto,
        ...additionalData,
        createdAt: new Date(),
      });
      return await newUserProfile.save();
    } catch (error) {
      // if duplicate key error handel here
      if (error.code === 11000) {
        throw new ConflictException('User Profile already exists');
      }
      console.log('error', error);
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 10, withDeleted = false) {
    // i want to add pagination
    const query = withDeleted ? {} : { deletedAt: null };
    const skip = (page - 1) * limit;
    return await this.userProfileModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
  }

  async findOne(_id: string) {
    return await this.userProfileModel
      .findOne({ _id, deletedAt: null })
      .lean()
      .exec();
  }

  async findOneBy(
    field: string,
    value: string,
  ): Promise<UserProfile | undefined> {
    const query = {};
    query[field] = value;
    return this.userProfileModel.findOne(query).exec();
  }

  async filter(
    filterCriteria: any,
    page: number = 1,
    limit: number = 10,
    withDeleted = false,
  ) {
    const query: any = { ...filterCriteria };

    if (!withDeleted) {
      query.deletedAt = null;
    }
    if (filterCriteria.deletedAt) {
      query.deletedAt = filterCriteria.deletedAt;
    }

    // Validate createdAtFrom and createdAtTo
    if (
      filterCriteria.createdAtFrom &&
      isNaN(Date.parse(filterCriteria.createdAtFrom))
    ) {
      throw new BadRequestException('Invalid createdAtFrom date');
    }

    if (
      filterCriteria.createdAtTo &&
      isNaN(Date.parse(filterCriteria.createdAtTo))
    ) {
      throw new BadRequestException('Invalid createdAtTo date');
    }

    if (filterCriteria.createdAtFrom && filterCriteria.createdAtTo) {
      const from = new Date(filterCriteria.createdAtFrom);
      const to = new Date(filterCriteria.createdAtTo);
      if (from > to) {
        throw new BadRequestException(
          'createdAtFrom cannot be later than createdAtTo',
        );
      }
    }

    if (filterCriteria.createdAtFrom) {
      query.createdAt = { $gte: new Date(filterCriteria.createdAtFrom) };
    }

    if (filterCriteria.createdAtTo) {
      query.createdAt = query.createdAt || {};
      query.createdAt.$lte = new Date(filterCriteria.createdAtTo);
    }
    const skip = (page - 1) * limit;

    return await this.userProfileModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
  }

  async update(id: string, updateUserProfileDto: UpdateUserProfileDto) {
    const additionalData: any = updateUserProfileDto.additionalData;
    // i want to remove additionalData from the object createUserProfileDto
    delete updateUserProfileDto.additionalData;

    // save Metadata from deletion,
    // you can update metadata like "metadata.any = 'any'"
    delete additionalData.metadata;
    // save email from deletion or update
    delete updateUserProfileDto.email;

    const updatedUserProfile = await this.userProfileModel.findByIdAndUpdate(
      id,
      { ...updateUserProfileDto, ...additionalData, updatedAt: new Date() },
      {
        new: true,
        omitUndefined: true,
      },
    );
    return updatedUserProfile;
  }

  async remove(_id: string) {
    const userProfile = await this.userProfileModel.findOne({ _id });
    if (!userProfile) {
      throw new Error('User profile not found');
    }

    if (userProfile.deletedAt !== null) {
      throw new Error('User profile has been already soft deleted');
    }

    const deletedUserProfile = await this.userProfileModel.findByIdAndUpdate(
      _id,
      { deletedAt: new Date() },
      {
        new: true,
      },
    );
    return deletedUserProfile;
  }

  hardRemove(_id: string) {
    return this.userProfileModel.deleteOne({ _id });
  }
}
