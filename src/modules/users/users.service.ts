import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './user.interface';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

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

  async create(user: User): Promise<User> {
    console.log('user', user);
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new this.userModel({
      ...user,
      password: hashedPassword,
    });
    return newUser.save().catch((error) => {
      // if duplicate key error handel here
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      console.log('error', error);
      throw error;
    });
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
