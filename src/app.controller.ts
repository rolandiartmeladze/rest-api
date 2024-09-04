import { Controller, Get, Render, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
// import { promises } from 'dns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user/user.schema';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService
    ) {}


    
  @Get('API_DATA')
  async getUsersFromApi(): Promise<string> {
    return this.userService.getUserData().pipe().toPromise();
  }


  @Get()
  @Render('index')
  async getHomePage() {
    const API_result = await this.appService.getUserData().toPromise();
    const fromBase = await this.userService.infoFromBase().toPromise();
    console.log(API_result);
    console.log(fromBase);
     return {
      title: 'Result Fron API in index.pug',
      description: 'Project basic endpoints and navigate',
      users: API_result, 
      base: fromBase,
     }
  }

  @Get('users/:id')
  async userApi(@Param('id') id: string): Promise<any> {
    const result = await this.userService.getUserData().toPromise();
    console.log(result);

    const user = result.data.find((user: any) => user.id === parseInt(id, 10));

    if (user) {
      return `
        <h1>User Details From API_URL</h1>
        <p><strong>ID:</strong> ${user.id}</p>
        <p><strong>Name:</strong> ${user.first_name} ${user.last_name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <img src="${user.avatar}" alt="Avatar of ${user.first_name}" />
        <h1><a href="/">Back Home</a></h1>
      `;
    } else {
      return `
        <h1>User Not Found</h1>
        <h1><a href="/">Back Home</a></h1>
      `;
    }
  }


}