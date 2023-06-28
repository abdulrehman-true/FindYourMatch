import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/Member';
import { User } from 'src/app/_models/User';
import { AccountServiceService } from 'src/app/services/account-service.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined;

  member: Member | undefined;
  user: User | null = null;

  constructor(private accountService: AccountServiceService, private memberService: MembersService,
    private toastr: ToastrService){
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
  }
  ngOnInit(): void {
    this.loadMember();
  }


  loadMember(){
    if(!this.user) return;
    this.memberService.getMember(this.user.userName).subscribe({
      next: member => this.member = member
    })
  }

  UpdateMember(){
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: ()=> {
        this.toastr.success('Profile updated successfully');
        this.editForm?.reset(this.member);
      }
    })
    

  }


}
