import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(private readonly http: HttpService) {}

  getUserData(): Observable<any> {
    return this.http.get('https://reqres.in/api/users').pipe(
      map(response => response.data)
    );
  }

  async getApiData(id: string | null = null): Promise<any> {
    const userData = await this.getUserData().toPromise();
  
    if (id) {
      const filteredUser = userData.data.find((user: any) => user.id === parseInt(id));
      return {
        title: 'User Details',
        item: filteredUser || { message: 'User not found' },
      };
    }

    return {
      title: 'API Data',
      description: 'Fetch API Nest.JS Project and Show result in index.pug File',
      users: userData.data,
    };
  }

  getHome(): Observable<any | null> {
    return this.getUserData().pipe(
      map(data => ({
        users: data.data 
      })),
    );
  }

}