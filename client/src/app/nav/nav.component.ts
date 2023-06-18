import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../services/account-service.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/User';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  constructor(public accountService: AccountServiceService, private router: Router,
    private toaster: ToastrService)
  {

  }

  model: any = {};

  ngOnInit(): void {
    
  }

  login(){
    this.accountService.login(this.model).subscribe({
      next : () => this.router.navigateByUrl('/members'),
      error: error => this.toaster.error(error.error),
    })
  }

  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
