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
import { AuthService } from '../modules/auth/auth.service';
import { UsersService } from '../modules/users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  isWorking(): string {
    return `App is Working 
       ${process.env.APP_NAME} (${process.env.APP_ENV}) ${process.env.APP_VERSION} 
        ${new Date().toDateString()} ${new Date().toTimeString()}.
        Please check the API documentation at "/api-docs" OR "/api-docs-json"
       `;
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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // no code needed because Passport.js handles the redirect
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
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
