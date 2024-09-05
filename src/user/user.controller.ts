import { 
  Controller, 
  Get, 
  Param, 
  Post, 
  Body, 
  Render, 
  UploadedFile, 
  UseInterceptors 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.schema';

@Controller('api')
export class UserController { 
  constructor(private readonly userService: UserService) {}

  // GET request ./api =>  Back Result From base 
  @Get()
  async getAllUser(){
    return this.userService.infoFromBase().toPromise();
  }

  // Render in createNew.pug element
  @Get('createNew')
  @Render('createNew')
  createUserForm() {
    return {}; 
  }

  // this POST ./api/creat  |> request reate new User in base fom createNew Form template
  @Post('create')
  @UseInterceptors(FileInterceptor('avatar'))
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<User> {
    return this.userService.create(createUserDto, file);
  }


  //this GET reques if in base not data create new users element from API Url.
  @Get('users')
  async createUsersInfoInBase(): Promise<string> {
    return this.userService.createUsersInfoInBase();
  }

  // this GTE request Bac filtred user By id from bataBase
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

  @Get('reset')
  async deleteAllUsers() {
    await this.userService.deleteAllUsers();
    return { message: 'All users deleted successfully.' };
  }

}