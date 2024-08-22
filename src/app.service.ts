import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ApiResponse {
  data: User[];
  support: {
    url: string;
    text: string;
  };
}

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getExternalData(): Observable<ApiResponse> {
    return this.httpService.get<ApiResponse>('https://reqres.in/api/users/').pipe(
      map(response => response.data)
    );
  }

  async getHello(): Promise<string> {
    console.log('working');

    // Fetch data from the API
    const apiResponse = await this.getExternalData().toPromise();
    
    // Ensure data is not undefined
    const data = apiResponse?.data || [];
    const support = apiResponse?.support || { text: '', url: '' };

    // Construct HTML with data
    const usersList = data.map(user => `

       <div key=${user.avatar}>
                <p>
                  <strong>${user.first_name} ${user.last_name}</strong>
                </p>
                <p>{(${user.email})}</p>
                <img  src="${user.avatar}" alt="${user.first_name} ${user.last_name}" key={user.avatar} />
              </div>
     `).join('');

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>ReqRes users!</title>
      
    </head>
    <body>
      <h1>Hello ReqRes users!</h1>
      <div className="flex">
        ${usersList}
      </div>
      `;}}