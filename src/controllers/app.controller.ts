import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Request,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from '../services/app.service';
import { AuthService } from '../modules/auth/auth.service';
import { UsersService } from '../modules/users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  isWorking(): string {
    return this.appService.isWorking();
  }

  @Post('api/login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('api/register')
  async createUser(@Body() user: any, @Res() response: Response) {
    try {
      const createdUser = await this.usersService.create(user);
      return response
        .status(HttpStatus.CREATED)
        .json({ message: 'User created successfully', user: createdUser });
    } catch (error) {
      return response
        .status(error?.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error', error: error.message });
    }
  }

  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req: any, @Res() res: any) {
    console.log('user', req.user);
    // handles the Google OAuth2 callback
    const jwt: string = req.user?.accessToken;
    if (jwt) {
      this.authService.login({ username: req.user.email });
    }

    // res.redirect('http://localhost:3000/login/success/' + jwt);
    // else res.redirect('http://localhost:3000/login/failure');
  }
}
