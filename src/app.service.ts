import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}

  async getApiData(): Promise<any> {
    const userData = await this.userService.getUserData().toPromise();
    return {
      title: 'API Data',
      description: 'Fetch API Nest.JS Project and Show result in index.pug File ',
      users: userData.data, 
      items: ['Item 1', 'Item 2', 'Item 3'],
    };
  }
}
