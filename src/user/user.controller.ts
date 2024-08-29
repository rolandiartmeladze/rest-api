import { Controller, Get, Param, Post, Body, Render } from '@nestjs/common';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.schema';

@Controller('api')
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
    return response;
  }

  @Get('users')
  async createUsersInfoInBase(): Promise<string> {
    const API = await this.userService.getUserData().pipe().toPromise();
    const result = API.data;
    for (const user of result){
      await this.userService.createTestUser(user);
     }
     return `<h1>From API Url Back Info And Inset DB</h1>  <a href="../"> show result from Base </a>`;
  }

  @Get('user/:id')
  getUserById(@Param('id') id: string): Observable<any> {
    return this.userService.getUserData().pipe(
      map((response: any) => {
        const user = response.data.find((user:any) => user.id === parseInt(id, 10));
        return user || { message: 'Not found'};
      })
    )
  }


}

