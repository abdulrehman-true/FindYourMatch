import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from './services/account-service.service';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'Find Your Match';
  constructor(private accountService: AccountServiceService)
  {}

  setCurrentUser()
    {
      const userString = localStorage.getItem('key');
      if(!userString) return;
      const user: User = JSON.parse(userString);
      this.accountService.setCurrentUser(user); 

    }

  ngOnInit(): void 
  {
    this.setCurrentUser();

  }





}
