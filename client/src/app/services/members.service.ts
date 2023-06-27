import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Member } from '../_models/Member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getMembers(){
    return this.http.get<Member[]>(this.baseUrl + 'users')
  }


  getMember(username: string){
    return this.http.get<Member>(this.baseUrl + 'users/' + username)

  }

  // getOptionsForToken()
  // {
  //   const userSring = localStorage.getItem('user');
  //   if(!userSring) return;

  //   const user = JSON.parse(userSring);
  //   return{
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer '+ user.token
  //     })
  //   } // To get the authorization token and pass it in the request body
  // }




}
