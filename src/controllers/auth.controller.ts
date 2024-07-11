import {
  Body,
  Controller,
  Post,
  Res,
  Request,
  UseGuards,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { AuthService } from '../modules/auth/auth.service';
import { UsersService } from '../modules/users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CreateUserDto } from '../dto/auth/create-user.dto';
import { User } from '../modules/users/user.schema';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() user: CreateUserDto, @Res() response: Response) {
    try {
      const createdUser = await this.usersService.create({
        email: user.email,
        username: user.email,
        fullName: user.fullName,
        password: user.password,
        strategyType: 'local',
      });
      return response
        .status(HttpStatus.CREATED)
        .json({ message: 'User created successfully', user: createdUser });
    } catch (error) {
      return response
        .status(error?.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error', error: error.message });
    }
  }

  @Post('reset-password-send-otp')
  async resetPassword_sendOtp() {}

  @Get('reset-password-verify-otp')
  async resetPassword_verifyOtp_get() {}

  @Post('reset-password-verify-otp')
  async resetPassword_verifyOtp_post() {}

  @Post('sms2fa')
  async sms2fa_sendOtp() {}

  @Post('forget-password')
  async sms2fa_verifyOtp() {}

  @Post('forget-password')
  async forgetPassword() {}
}
