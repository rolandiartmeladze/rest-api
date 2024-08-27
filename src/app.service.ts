import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}

 getUserData(): Observable<any> {
    return this.userService.getUserData().pipe(
        map (data => {
            console.log(data);
            return data;
          }
            )
        )
  }

  infoFromBackend():Observable<any> {
    return this.userService.infoFromBase();
  }
}
