import { isJsonObject } from '@angular-devkit/core';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../_models/member';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  constructor(private http: HttpClient , private currentUser: MembersService, private route: Router, private router: ActivatedRoute) { }

  user: any = [];
  member: Member;

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.currentUser.getMember(this.router.snapshot.paramMap.get('username')).subscribe(member => {
      if(member){
        this.user = member;
      };
    });
  }

}
