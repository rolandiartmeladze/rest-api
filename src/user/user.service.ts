import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './create-user.dto';
import { HttpService } from '@nestjs/axios';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>, 
    private readonly httpService: HttpService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto.id) {
      const count = await this.userModel.countDocuments();
      createUserDto = { ...createUserDto, id: (count + 1).toString() };
    }

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async createTestUser(user:any) {
    const createUserDto: CreateUserDto ={
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
      console.error("not working", error)
  }


  }




  getUserData(): Observable<any> {
    return this.httpService.get('https://reqres.in/api/users').pipe(
      map(response => response.data)
    );
  }

   infoFromBase(): Observable<User[]> {
    const result = this.userModel.find().exec();
    return from(result);
  }
}
