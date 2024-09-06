import { 
  Injectable, 
  // BadRequestException, 
  NotFoundException 
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './create-user.dto';
import { HttpService } from '@nestjs/axios';
import { Observable, from, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Express } from 'express';
import axios from 'axios';
// import { isValidObjectId } from 'mongoose';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>, 
    private readonly httpService: HttpService,
  ) {}

  // this funcfion back users info from API Url: 
  getUserData(): Observable<any> {
    return this.httpService.get('https://reqres.in/api/users').pipe(
      map(response => response.data)
    );
  }

  // convert User avatra From url image > base64 format in base avatarPeth
  private async convertImageToBase64(url: string): Promise<string> {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(response.data, 'binary');
      return `${imageBuffer.toString('base64')}`;
    } catch (error) {
      console.error('Failed to convert image to Base64:', error);
      throw new Error('Failed to convert image to Base64');
    }
  }


  // create new user in base from teplate conwert image file in base64 generate unicue id and inset info in base
  async create(createUserDto: CreateUserDto, file?: Express.Multer.File): Promise<User> {
    let avatarBase64 = '';

    if (file) {
      avatarBase64 = file.buffer.toString('base64');
    } else if (createUserDto.avatarPath) {
      avatarBase64 = await this.convertImageToBase64(createUserDto.avatarPath);
    } else {
      throw new Error('Avatar file or avatarPath is required.');
    }

    if (!createUserDto.id) {
      const count = await this.userModel.countDocuments();
      createUserDto.id = (count + 1).toString();
    }

    const createdUser = new this.userModel({
      ...createUserDto,
      avatarPath: avatarBase64,
    });

    return createdUser.save();
  }

  // creat new user in base from api or inset info
  async createTestUser(user: any): Promise<void> {
    const createUserDto: CreateUserDto = {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      avatarPath: user.avatar,
    };
  
    try {
      await this.create(createUserDto);
    } catch (error) {
      console.error('Failed to create test user:', error);
    }
  }

  // when first send request ./api/users  creace user from api in base 
  async createUsersInfoInBase(): Promise<string> {
    try {
      const API = await firstValueFrom(this.getUserData()); 
      const result = API.data;
    
      await Promise.all(result.map(async (user: User) => { 
        await this.createTestUser(user); 
      }));
  
      const users = await firstValueFrom(this.infoFromBase());

      const userHtmlList = users.map((user: User) => `
        <tr>
            <td><samp>${user.id}</samp></td>
            <td><samp>${user?.firstName} ${user?.lastName}</samp></td>
            <td><samp>${user.email}</samp></td>
        </tr>
        `).join('');
  
      return `
        <h1>From API URL Back Info And creace users in base mongoose </h1> 
        <h2> Back Home <h2>
        <a href='/'> Clilk Hear </a>
        <hr>
      <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            ${userHtmlList}
        </tbody>
      </table>
      `;
    } catch (error) {
      console.error('Failed to create users from API:', error);
      return `<h1>Error occurred while inserting users</h1>`;
    }
  }
  
  
  // back users list from base in  Get ./api
  infoFromBase(): Observable<User[]> {
    return from(this.userModel.find().exec());
  }


  // reset info from base users collection
  async deleteAllUsers(): Promise<void> {
    try {
      await this.userModel.deleteMany({});
      console.log('All users deleted successfully.');
    } catch (error) {
      console.error('Error deleting all users:', error);
    }
  }

  // delete selected user
  async deleteUserById(id: string): Promise<{ message: string }> {
    const deletedUser = await this.userModel.findOneAndDelete({ id }).exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return { message: `User with ID ${id} deleted successfully` };
  }

  // update user can update info from template in base
  async updateUserById(id: string, updateData: Partial<UserDocument>): Promise<{ message: string }> {
    const updatedUser = await this.userModel.findOneAndUpdate({ id }, updateData, { new: true }).exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { message: `User with ID ${id} updated successfully` };
  }
}  
