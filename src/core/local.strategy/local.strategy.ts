import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../models/user.interface';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super();
  }

  async validate(userNameOrEmail: string, password: string): Promise<User> {
    const user = await this.usersService.validateUser(
      userNameOrEmail,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
