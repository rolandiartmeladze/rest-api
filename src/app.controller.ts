import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')  
  async getHomePage() {
    return this.appService.getHome().toPromise(); 
  }
  
  
  @Get('/users/:id')
  findOne(@Param('id') id: string): Observable<any> {
    return this.appService.getUserData().pipe(
      map(response => {
        const user = response.data.find((user: any) => user.id === parseInt(id));
        return user || { message: 'User not found' };
      }),
    );
  }
}
