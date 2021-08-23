import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayConfig } from '@creativeacer/ngx-image-display';
import { Member } from '../_models/member';
import { Photo } from '../_models/photo';
import { MembersService } from '../_services/members.service';
import { faDrumSteelpan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-my-photos',
  templateUrl: './my-photos.component.html',
  styleUrls: ['./my-photos.component.css']
})

export class MyPhotosComponent implements OnInit {

  usernameSearch: string;
  validationErrors: string[] = [];
  faSearch = faDrumSteelpan;

  member: Member;
  photo: Photo;

  displayconfig: DisplayConfig;
  
  images: any = [];

  constructor(public _DomSanitizationService: DomSanitizer,private http: HttpClient,private memberService: MembersService, private router: ActivatedRoute, private route: Router) {}

  ngOnInit(): void {

    this.loadMember();

    this.displayconfig = {
      imageminwidth: '250px',
      containerwidth: '500px',
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
      }
    })
  }

  loadPhoto(){

    this.memberService.getPhotos(this.member.id).subscribe(() =>{ 

      for (let i = 0; i < this.member.photos.length ; i++) {

        if(this.member.photos[i].isMain == false){

           this.images.push('data:'+ this.member.photos[i].imageType+';base64,'+ this.member.photos[i].imageData);
          
        }
   
      }
      return this.images;

    });
  } 

  
  eliminar(idPhoto: number){
    alert("desea eliminar la foto: " + idPhoto);
  }
}
