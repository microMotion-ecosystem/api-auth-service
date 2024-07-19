import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { TokenService } from '../token/token.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private tokenService: TokenService,
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {
    console.log('AppService constructor');
    this.client.emit<any>('hello-message', 'ay haga');
  }

  // async findOneBy(field: string, value: string): Promise<any> {
  //   const user = await this.usersService.findOneBy(field, value);
  //   if (user) {
  //     return user;
  //   }
  //   return null;
  // }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id.toString() };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });
    await this.tokenService.create(user._id, token);
    return {
      access_token: token,
    };
  }

  async revokeToken(token: string) {
    await this.tokenService.revokeToken(token);
  }

  // Method to check if a token is valid
  async isTokenValid(token: string): Promise<boolean> {
    const tokenEntity = await this.tokenService.findOne(token);
    return !!tokenEntity;
  }
}
