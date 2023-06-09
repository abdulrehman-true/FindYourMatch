import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountServiceService } from '../services/account-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  // @Input() usersFromHomeComponent: any; // Means you're getting inpyt from a component in this variable
  @Output() cancelRegister = new EventEmitter(); // Because we want to emit something to the parent component, reverse of input 

  constructor(private accountService: AccountServiceService, private toastr: ToastrService)
  {

  }
  ngOnInit(): void {
  }

  model: any={};

  register()
  {
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: error => this.toastr.error(error.error)
    })
  }

  cancel()
  {
    this.cancelRegister.emit(false);
  }

}
