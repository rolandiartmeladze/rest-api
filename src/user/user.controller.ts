import { Controller, Get, Param, Post, Body} from '@nestjs/common';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.schema';

@Controller('users')
export class UserController { 
  constructor(private readonly userService: UserService) {}


    //from mongoose base 

    @Get('info')
    getInfoFromBase(): Observable<User[]> {
      return this.userService.infoFromBase();
    }
  




  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @Get()
  async getAllUser(){
    const response = await this.userService.getUserData().toPromise();
    return response;
  }

  @Get(':/id')
  getUserById(@Param('id') id: string): Observable<any> {
    return this.userService.getUserData().pipe(
      map((response: any) => {
        const user = response.data.find((user:any) => user.id === parseInt(id, 10));
        return user || { message: 'Not found'};
      })
    )
  }





  // @Get()
  // // @Render('index')  
  // async getHomePage() {
  //   const response = await this.userService.getUserData().toPromise();
  //   return response;
     
  // }

  // @Get('users')
  // async getHomePageAPI() {
  //   const response = await this.userService.getUserData().toPromise();
  //   return response.data;
  // }


  
  // @Get('/user/:id')
  // // @Render('user-details')
  // findone(@Param('id') id: string): Observable<any> {
  //   return this.userService.getUserData().pipe(
  //     map((response: any) => { 
  //       const user = response.data.find((user: any) => user.id === parseInt(id, 10));
  //       return user || { message: 'User not found' };
  //     }),
  //   );
  // }





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
