import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // @Render('index') // Make sure 'index' is the name of your Pug template file
  // getHomePage() {
  //   // Returning an object to be passed to the Pug template
  //   return { title: 'Home Page', description: 'Welcome to NestJS!' };
  // }

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
