import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Member } from '../_models/member';
import { Photo } from '../_models/photo';
import { MembersService } from '../_services/members.service';
import { ImageData, DisplayConfig, SameSizeConfig, ImageEffect, BaseImage } from '@creativeacer/ngx-image-display';

@Component({
  selector: 'app-member-photos',
  templateUrl: './member-photos.component.html',
  styleUrls: ['./member-photos.component.css']
})
export class MemberPhotosComponent implements OnInit {

  usernameSearch: string;
  validationErrors: string[] = [];
  
  member: Member;
  photo: Photo;

  displayconfig: DisplayConfig;
  images: any = [];


  constructor(private http: HttpClient,private memberService: MembersService, private router: ActivatedRoute, private route: Router) {}

  ngOnInit(): void {

    this.loadMember();

    this.displayconfig = {
      imageminwidth: '250px',
      containerwidth: '80%',
      containerheight: '500px',
      fullScreenView: true // Set to false to hide the top right full screen option
    };

    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    
  }

  loadMember(){
    this.memberService.getMember(this.router.snapshot.paramMap.get('username')).subscribe(member =>{
      
      if(member == null){
        this.route.navigateByUrl("not-found");
      } else {
        this.member = member;
        this.loadPhoto();
        this.loadProfilePhoto();
      }
    })
  }

  loadPhoto(){

    this.memberService.getPhotos(this.member.id).subscribe(photo =>{
        
      this.photo = photo;   

      for (let i = 0; i < this.member.photos.length ; i++) {

        if(this.member.photos[i].isMain == false){

          this.images.push('data:'+ this.member.photos[i].imageType+';base64,'+ this.member.photos[i].imageData);
          
        }
   
      }
      return this.images;

    });
  } 

  loadProfilePhoto(){

    this.memberService.getPhotoProfile(this.member.id).subscribe(photo =>{
        
      this.photo = photo;   
      for (let i = 0; i < this.member.photos.length ; i++) {
      
        this.images = 'data:'+ this.member.photos[i].imageType+';base64,'+ this.member.photos[i].imageData;
      
        return this.images;
      }


    });
  } 
}


