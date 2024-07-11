import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserProfileService } from '../modules/user-profile/user-profile.service';
import { CreateUserProfileDto } from '../dto/user-profile/create-user-profile.dto';
import { UpdateUserProfileDto } from '../dto/user-profile/update-user-profile.dto';
import mongoose from 'mongoose';

@Controller('api/user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post()
  async create(@Body() createUserProfileDto: CreateUserProfileDto) {
    return await this.userProfileService.create(createUserProfileDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    try {
      return await this.userProfileService.findAll(page, limit);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new NotFoundException('Error fetching user profiles');
    }
  }

  @Get('filter')
  async filter(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() filterCriteria: any,
  ) {
    delete filterCriteria.page;
    delete filterCriteria.limit;
    console.log('page,limit ', page, limit);
    try {
      return await this.userProfileService.filter(filterCriteria, page, limit);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new NotFoundException('Error filtering user profiles');
    }
  }

  @Get('show-deleted')
  async findAllWithDeleted(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    try {
      return await this.userProfileService.findAll(page, limit, true);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new NotFoundException('Error fetching user profiles');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.userProfileService.findOne(id);
    } catch (error) {
      if (
        error instanceof mongoose.Error.CastError &&
        error.kind === 'ObjectId'
      ) {
        throw new BadRequestException('Invalid ID format');
      }

      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new NotFoundException(`User profile with id ${id} not found`);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    return await this.userProfileService.update(id, updateUserProfileDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.userProfileService.remove(id);
    } catch (error) {
      if (
        error instanceof mongoose.Error.CastError &&
        error.kind === 'ObjectId'
      ) {
        throw new BadRequestException('Invalid ID format');
      }

      if (error instanceof BadRequestException) {
        throw error;
      }
      if (error.message) {
        throw new NotFoundException(error.message);
      }
      throw new NotFoundException(`User profile with id ${id} not found`);
    }
  }

  @Delete(':id/hard')
  async hardRemove(@Param('id') id: string) {
    const userProfile = await this.userProfileService.findOne(id);
    let response: any = 'No user profile found to delete.';
    if (userProfile) {
      response = await this.userProfileService.hardRemove(id);
    }
    return response;
  }
}
