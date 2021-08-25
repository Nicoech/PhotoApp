import { isJsonObject } from '@angular-devkit/core';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Member } from '../_models/member';
import { Photo } from '../_models/photo';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  constructor(private http: HttpClient , private route: Router, private router: ActivatedRoute
    ,private memberService: MembersService, public accountService: AccountService) { }

  user: any = [];
  member: any = {};
  photo: Photo;
  images: any = [];

  currentUser$: Observable<User>;

  ngOnInit(): void {
    this.loadMember();
  }


  loadMember(){
    this.memberService.getMember(this.router.snapshot.paramMap.get('username')).subscribe(member =>{
      
      if(member == null){
        this.route.navigateByUrl("not-found");
      } else {
        this.member = member;
        this.loadPhoto();
      }
    })
  }

  loadPhoto(){

    this.memberService.getPhotoProfile(this.member.id).subscribe(photo =>{
        
      this.photo = photo;   
      for (let i = 0; i < this.member.photos.length ; i++) {
      
        this.images = 'data:'+ this.member.photos[i].imageType+';base64,'+ this.member.photos[i].imageData;
      
        return this.images;
      }


    });
  } 


}
