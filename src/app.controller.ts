import { Controller, Get, Post, Render, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
// import { promises } from 'dns';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService
    ) {}

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

  // @Get("user/:id")
  // @Render('user-details')
  // getUserById(@Param('id') id: string): Observable<any> {
  //   return this.userService.getUserData().pipe(
  //     map((response: any) => {
  //       const user = response.data.find((user:any) => user.id === parseInt(id, 10));
  //       return user || { message: 'Not found'};
  //     })
  //   )
  // }

  // @Get('Base')

  // async baseResult(): Promise<string> {
  //   const API = await this.appService.getUserData().pipe().toPromise();
  //   const result = API.data;
  //   const isConnected = await this.appService.checkDatabaseConnection();
  //   if (isConnected) {
  //    for (const user of result){
  //     await this.appService.createTestUser(user);
  //    }
  //     return `Database is connected and working.`;
  //   } else {
  //     return 'Database is not connected or an error occurred.';
  //   }
  // }


  // @Get('users')
  // async createUsersInfoInBase(): Promise<string> {
  //   const API = await this.appService.getUserData().pipe().toPromise();
  //   const result = API.data;
  //   for (const user of result){
  //     await this.appService.createTestUser(user);
  //    }
  //    return `Database is connected and working.`;
  // }

  // @Get("api")



}