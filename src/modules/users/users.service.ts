import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '../../models/user.interface';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserProfileService } from '../user-profile/user-profile.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private userProfile: UserProfileService,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email }).lean().exec();
    console.log('user1', user); // Log the result for inspection
    return user;
  }

  async findOneBy(field: string, value: string): Promise<User | undefined> {
    const query = {};
    query[field] = value;
    return this.userModel.findOne(query).exec();
  }

  async create(user: User): Promise<any> {
    console.log('user', user);
    // create user profile
    const profile = await this.userProfile.create({
      email: user.email,
      fullName: user.fullName,
    });
    if (!profile) {
      throw new ConflictException('User profile creation failed');
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new this.userModel({
      ...user,
      password: hashedPassword,
      userProfileId: profile._id,
      createdAt: new Date(),
      strategyType: 'local',
    });
    const newUserSaved = await newUser.save().catch(async (error) => {
      await this.userProfile.hardRemove(profile._id.toString());
      // if duplicate key error handel here
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      console.log('error', error);
      throw error;
    });
    return { newUserSaved, profile };
  }

  /*  async createUser(username: string, password: string): Promise<User> {
      const newUser = new this.userModel({ username, password });
      return newUser.save();
    }*/

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
