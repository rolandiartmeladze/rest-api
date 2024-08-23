import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller()
export class UserController { 
  constructor(private readonly userService: UserService) {}

  @Get('users/:id')
  findOne(@Param('id') id: string): Observable<any> {
    return this.userService.getUserData().pipe(
      map(response => {
        const user = response.data.find((user: any) => user.id === parseInt(id));
        return user || { message: 'User not found' };
      })
    );
  }

  @Get('users')
  // @Render('index')
  async getUserData() {
    const userData = await this.userService.getUserData().toPromise();
    return { 
      title: 'User List',
      users: userData.data 
    };
  }
}
