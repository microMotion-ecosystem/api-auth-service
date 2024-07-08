import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token } from './token.interface';

@Injectable()
export class TokenService {
  constructor(@InjectModel('Token') private tokenModel: Model<Token>) {}

  async create(userId: string, token: string): Promise<Token> {
    const newToken = new this.tokenModel({
      userId,
      token,
      createdAt: new Date(),
    });
    return newToken.save();
  }

  async findOne(token: string): Promise<Token | null> {
    return this.tokenModel.findOne({ token }).exec();
  }

  async revokeToken(
    token: string,
  ): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
    return this.tokenModel.deleteOne({ token }).exec();
  }
}
