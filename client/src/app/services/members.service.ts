import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Member } from '../_models/Member';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  members: Member[] = [];
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getMembers(){
    if(this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl + 'users', this.getOptionsForToken()).pipe(
      map(members => {
        this.members = members;
        return members;
      })
    )
  }


  getMember(username: string){
    const member = this.members.find(x => x.userName == username);
    if(member) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username, this.getOptionsForToken())

  }

  updateMember(member: Member)
  {
    return this.http.put(this.baseUrl + 'users', member, this.getOptionsForToken()).pipe(
      map(()=> {
        const index = this.members.indexOf(member);
        this.members[index] = {...this.members[index], ...member}
      })
    )
  }

  getOptionsForToken()
  {
    const userSring = localStorage.getItem('user');
    if(!userSring) return;

    const user = JSON.parse(userSring);
    return{
      headers: new HttpHeaders({
        Authorization: 'Bearer '+ user.token
      })
    } // To get the authorization token and pass it in the request body
  }




}
