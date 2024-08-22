import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}
  getUserData() {
    return this.httpService.get('https://reqres.in/api/users').pipe(
      map(response => response.data)
    );
  }
}


