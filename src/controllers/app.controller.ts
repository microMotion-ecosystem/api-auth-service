import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../modules/auth/auth.service';
import { UsersService } from '../modules/users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { MessagePattern } from "@nestjs/microservices";

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
      this.authService.login({ userName: req.user.email });
    }

    // res.redirect('http://localhost:3000/login/success/' + jwt);
    // else res.redirect('http://localhost:3000/login/failure');
  }

  @MessagePattern('hello-message')
  getHelloMessage(data: string) {
    console.log('Received message:', data);
    // Handle the message
  }
}
