import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import * as process from 'node:process';


@Injectable()
export class WpIntegrationService {
  constructor(private httpService: HttpService) {}

  importUsers() {
    // Use the WordPress REST API to import users
    return this.httpService
      .get(process.env.WORDPRESS_URL + '/wp-json/wp/v2/users')
      .pipe(map((response) => response.data));
  }

  exportUser(user) {
    // Use the WordPress REST API to create a new user
    return this.httpService
      .post(process.env.WORDPRESS_URL + '/wp-json/wp/v2/users', user)
      .pipe(map((response) => response.data));
  }


}
