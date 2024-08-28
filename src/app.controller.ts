import { Controller, Get } from '@nestjs/common';
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
  getHomePage() {
    return this.appService.getUserData().pipe().toPromise();
  }


  @Get('Base')

  async baseResult(): Promise<string> {
    const isConnected = await this.appService.checkDatabaseConnection();
    if (isConnected) {
      const message = await this.appService.createTestUser();
      return `Database is connected and working. ${message}`;
    } else {
      return 'Database is not connected or an error occurred.';
    }
  }



  // @Get()
  // // @Render('index')  
  // async getHomePage() {
  //   const response = await this.appService.getUserData().toPromise();
  //   return response;
     
  // }

  // @Get('users')
  // async getHomePageAPI() {
  //   const response = await this.appService.getUserData().toPromise();
  //   return response.data;
  // }


  
  // @Get('/user/:id')
  // // @Render('user-details')
  // findone(@Param('id') id: string): Observable<any> {
  //   return this.appService.getUserData().pipe(
  //     map((response: any) => { 
  //       const user = response.data.find((user: any) => user.id === parseInt(id, 10));
  //       return user || { message: 'User not found' };
  //     }),
  //   );
  // }



}
