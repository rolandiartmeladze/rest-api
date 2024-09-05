import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './create-user.dto';
import { HttpService } from '@nestjs/axios';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Express } from 'express';
import axios from 'axios';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>, 
    private readonly httpService: HttpService,
  ) {}


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





  // async create(createUserDto: CreateUserDto, file?: Express.Multer.File): Promise<User> {
  //   let avatarBase64 = '';
  
  //   if (file && file.buffer) {
  //     avatarBase64 = file.buffer.toString('base64');
  //   } else if (createUserDto.avatarPath) {
  //     avatarBase64 = createUserDto.avatarPath;
  //   } else {
  //     throw new Error('Avatar file or avatarPath is required.');
  //   }
  
  //   if (!createUserDto.id) {
  //     const count = await this.userModel.countDocuments();
  //     createUserDto.id = (count + 1).toString(); 
  //   }
  
  //   const createdUser = new this.userModel({
  //     ...createUserDto,
  //     avatarPath: avatarBase64,
  //   });
  
  //   return createdUser.save();
  // }
    
  


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


  async createTestUser(user: any): Promise<void> {
    const createUserDto: CreateUserDto = {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      avatarPath: user.avatar,
    };

    try {
      const createdUser = await this.create(createUserDto);
      console.log('Test user created successfully:', createdUser);
    } catch (error) {
      console.error('Failed to create test user:', error);
    }
  }

  getUserData(): Observable<any> {
    return this.httpService.get('https://reqres.in/api/users').pipe(
      map(response => response.data)
    );
  }


  async createUsersInfoInBase(): Promise<string> {
    const API = await this.getUserData().toPromise();
    const result = API.data;

    for (const user of result) {
      await this.createTestUser(user);
    }

    return `<h1>From API Url Back Info And Inset DB</h1>  <a href="../"> show result from Base </a>`;
  }


  infoFromBase(): Observable<User[]> {
    return from(this.userModel.find().exec());
  }
}
