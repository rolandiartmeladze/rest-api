import { Controller, Get, Render, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
// import { promises } from 'dns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService
    ) {}

  @Get()
  @Render('index')
  getHomePage() {
     return this.appService.getUserData().pipe().toPromise();
  }

  @Get("user/:id")
  @Render('user-details')
  getUserById(@Param('id') id: string): Observable<any> {
    return this.userService.getUserData().pipe(
      map((response: any) => {
        const user = response.data.find((user:any) => user.id === parseInt(id, 10));
        return user || { message: 'Not found'};
      })
    )
  }

  @Get('Base')

  async baseResult(): Promise<string> {
    const API = await this.appService.getUserData().pipe().toPromise();

    const result = API.data;

    console.log();
    const isConnected = await this.appService.checkDatabaseConnection();
    if (isConnected) {
     for (const user of result){
      await this.appService.createTestUser(user);
     }
      return `Database is connected and working.`;
    } else {
      return 'Database is not connected or an error occurred.';
    }
  }
}