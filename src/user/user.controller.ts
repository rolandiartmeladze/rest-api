import { Controller, Get, Param, Post, Body, Render, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor  } from '@nestjs/platform-express';
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
  @UseInterceptors(FileInterceptor('avatar'))
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<User> {
    return this.userService.create(createUserDto, file);
  }
  

  // Render in createNew.pug element
  @Get('createNew')
  @Render('createNew')
  createUserForm() {
    return {}; 
  }


  @Get()
  async getAllUser(){
    const response = await this.userService.infoFromBase().toPromise();
    return response;
  }
  
  @Get('users')
  async createUsersInfoInBase(): Promise<string> {
    return this.userService.createUsersInfoInBase();
  }

  @Get('users/:id')
  @Render('user-details')
  userApi(@Param('id') id: string): Observable<User | { message: string }> {
    return this.userService.infoFromBase().pipe(
      map((users: User[]) => {
        const user = users.find((user: User) => user.id === id);
        console.log(user);
        return user || { message: 'Not found' };
      })
    );
  }
}