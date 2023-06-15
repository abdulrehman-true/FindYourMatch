import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../services/account-service.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  constructor(public accountService: AccountServiceService)
  {

  }

  model: any = {};

  ngOnInit(): void {
    
  }

  login(){
    this.accountService.login(this.model).subscribe({
      next : respose => {
        console.log(respose);
      },
      error: error => console.log(error)     
    })
  }

  logout()
  {
    this.accountService.logout();
  }

}
