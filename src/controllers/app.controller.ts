import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from '../services/app.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../core/jwt-auth-guard/jwt-auth.guard';
import { AuthService } from '../models/auth/auth.service';
import { UsersService } from '../models/users/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private readonly usersService: UsersServic,
  ) {}

  @Get()
  @ApiBearerAuth('ac"access-token" // @ApiOperation({summary: 'Check if the API is working'})
  // @ApiResponse({status: 200, description: 'API is working correctly.'})
  isWorking(): string {
    return this.appService.isWorking();
  }

  @UseGuards(JwtAuthGuard)
  @Get("demo")
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Demo route" })
  @ApiResponse({ status: 200, description: "Returns a demo text." })
  demo(): string {
    return "demo";
  }

  /**
   * Logs in a user.
   *
   * @param {Object} req - The request object.
   * @param {Object} req.user - The user object.
   * @returns {Promise} - A promise resolving to the result of the login operation.
   */
  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post("register")
  async createUser(@Body() user: any) {
    console.log("user", user);
    const { username, password, email } = user;
    return await this.usersService.create({ username, password, email });
  }

  @Get("auth/google")
  @UseGuards(AuthGuard("google"))
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get("auth/google/callback")
  @UseGuards(AuthGuard("google"))
  googleLoginCallback(@Req() req: any, @Res() res: any) {
    console.log("user", req.user);
    // handles the Google OAuth2 callback
    const jwt: string = req.user?.accessToken;
    if (jwt) {
      this.authService.login({ username: req.user.email });
    }

    // res.redirect('http://localhost:3000/login/success/' + jwt);
    // else res.redirect('http://localhost:3000/login/failure');
  }
}
