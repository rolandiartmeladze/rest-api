import { Controller, Post, Body} from '@nestjs/common';
import { UserService } from './user.service';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import { CreateUserDto } from './create-user.dto';

@Controller()
export class UserController { 
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Get('users/:id')
  // findOne(@Param('id') id: string): Observable<any> {
  //   return this.userService.getUserData().pipe(
  //     map(response => {
  //       const user = response.data.find((user: any) => user.id === parseInt(id, 10));
  //       return user || { message: 'User not found' };
  //     })
  //   );
  // }

  // @Get('users')
  // async getUserData() {
  //   // const userData = await this.userService.getUserData().toPromise();
  //   return await this.userService.getUserData().toPromise();
  // }
}
