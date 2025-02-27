import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}

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

  getUserData(): Observable<any> {
    return this.userService.getUserData().pipe(
      map((data) => {
        console.log(data);
        return data;
      }),
    );
  }
}
