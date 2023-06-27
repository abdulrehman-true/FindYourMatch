import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/Member';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {


  constructor(private memberService: MembersService){}

  members: Member[] = [];

  ngOnInit(): void {
    this.loadAllMembers();
  }


  loadAllMembers(){
    this.memberService.getMembers().subscribe({
      next: members => this.members = members
    })
  }

}
