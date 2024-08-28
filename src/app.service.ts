import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { CreateUserDto } from './user/create-user.dto';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}


  // async onModuleInit() {
  //   try {
  //     const isConnected = await this.checkDatabaseConnection();
  //       if (isConnected) {
  //         console.log("working");
  //       } else{
  //         console.log('not working');
  //       }
  //   } catch (error) {
  //     console.error('not working', error);
      
  //   }
  // }

 async checkDatabaseConnection(): Promise<boolean> {
    try {
      const result = await this.userService.infoFromBase().toPromise();
      if (result && result.length >= 0) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Database connection check failed:', error);
      return false;
    }
  }
  
  
  async createTestUser() {
    const createUserDto: CreateUserDto ={
      firstName: "test",
      lastName: "user",
      email: "test.user@gmail.com",
      avatarPath: "/path/to/avatar.jpg",
    };

      try {
        const createdUser = await this.userService.create(createUserDto);
        console.log('Test user created successfully:', createdUser);

  } catch (error) {
      console.error("not working", error)
  }


  }



 getUserData(): Observable<any> {
    return this.userService.getUserData().pipe(
        map (data => {
            console.log(data);
            return data;
          }
            )
        )
  }




}
