import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}


  async getApiData(id: string | null = null): Promise<any> {
    const userData = await this.userService.getUserData().toPromise();
    
    let filteredUser = null;
    if (id) {
      filteredUser = userData.data.find((user: any) => user.id === parseInt(id));
    }

    return {
      title: 'API Data',
      description: 'Fetch API Nest.JS Project and Show result in index.pug File',
      users: userData.data, 

    };
  }
}