import { 
  Controller,
  Get,
  Patch,
  Param,
  Post,
  Body,
  Render,
  Delete,
  UploadedFile, 
  UseInterceptors 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateUserDto } from './create-user.dto';
import { User, UserDocument } from './user.schema';

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
  ): Promise<string> {
    await this.userService.create(createUserDto, file);
    const userHtml = `
    <h1>User Created Successfully</h1>
    <h2>Details</h2>
    <table border="1">
      <tr>
        <th>First Name</th>
        <td>${createUserDto.firstName}</td>
      </tr>
      <tr>
        <th>Last Name</th>
        <td>${createUserDto.lastName}</td>
      </tr>
      <tr>
        <th>Email</th>
        <td>${createUserDto.email}</td>
      </tr>
    </table>
    <hr>
    <a href='/'>Back to Home</a>
  `;

  return userHtml;
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

  // DELETE request ./api/users/:id/delete -> Delete user by Id
  @Delete('users/:id/delete')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUserById(id);
  }

  @Get('users/:id/update')
  updatedUser(@Param('id') id: string): Observable<string | { message: string }> {
    return this.userService.infoFromBase().pipe(
      map((users: User[]) => {
        const user = users.find((user: User) => user.id === id);
        const template = `
        <h1> You selected user id:${user?.id} updated </h1>
        <h3>Updated User id: ${user?.id}</h3>
        <div><label><b> First Name: <b></label><samp>${user?.firstName}</samp></div>
        <div><label><b> Last Name: <b/></label><samp>${user?.lastName}</samp></div>
        <div><label><b> Email: </b></label> <samp> ${user?.email}</samp> </div>
        <div><samp>
            ${user?.avatarPath ? `<img width="130px" src="data:image/jpeg;base64,${user.avatarPath}" alt="Avatar" />` : 'No avatar available'}
          </samp></div>        
        <hr>
        <br>
        <div> 
        <h2> Back Home <h2>
        <a href='/'> Clilk Hear </a>
        </div>
        `;
        return template ||  { message: 'User not found' };
      })
    );
  }



  @Patch('users/:id/update')
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: Partial<UserDocument>
  ) {
    return await this.userService.updateUserById(id, updateData);
  }


  // reset base user collection
  @Get('reset')
  async deleteAllUsers() {
    await this.userService.deleteAllUsers();
    const template = `
    <h1> reset complate.  all user from base is deleted </h1>
    <hr> 
    <br>
    <div> 
    <h2> Back Home <h2>
    <a href='/'> Clilk Hear </a>
    </div>
    `;
    return template;
  }

}