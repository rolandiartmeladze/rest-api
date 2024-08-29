import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.schema';

@Controller('users')
export class UserController { 
  constructor(private readonly userService: UserService) {}


  @Get('info')
  getInfoFromBase(): Observable<User[]> {
    const result = this.userService.infoFromBase();
    return result;
  }

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @Get()
  async getAllUser(){
    const response = await this.userService.getUserData().toPromise();
    return response.data;
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): Observable<any> {
    return this.userService.getUserData().pipe(
      map((response: any) => {
        const user = response.data.find((user:any) => user.id === parseInt(id, 10));
        return user || { message: 'Not found'};
      })
    )
  }

  // @Get('init')
  // getUserData(): Observable<any> {
  //   return this.userService.getUserData().pipe(
  //     map(async (data: any) => {
  //       console.log(data);
  //       await Promise.all(data.map((userInfo: any) => this.createTestUser(userInfo)));
  //       return data;
  //     })
  //   );
  // }

  // async createTestUser(info: any) {
  //   const createUserDto: CreateUserDto = {
  //     firstName: info.first_name,
  //     lastName: info.last_name,
  //     email: info.email,
  //     avatarPath: info.avatar,
  //   };

  //   try {
  //     const createdUser = await this.userService.create(createUserDto);
  //     console.log('Test user created successfully:', createdUser);
  //   } catch (error) {
  //     console.error("Error creating test user:", error);
  //   }
  // }
}

