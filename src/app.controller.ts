import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')  
  async getHomePage() {
    const response = await this.appService.getUserData().toPromise();
    return response;
     
  }

  @Get('users')
  async getHomePageAPI() {
    const response = await this.appService.getUserData().toPromise();
    return response.data;
  }


  
  @Get('/user/:id')
  @Render('user-details')
  findone(@Param('id') id: string): Observable<any> {
    return this.appService.getUserData().pipe(
      map((response: any) => { 
        const user = response.data.find((user: any) => user.id === parseInt(id, 10));
        return user || { message: 'User not found' };
      }),
    );
  }



}
