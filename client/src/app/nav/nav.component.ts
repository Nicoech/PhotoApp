import { ThrowStmt } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faChild } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true }
    }
  ]
})

export class NavComponent implements OnInit {

  faSearch = faSearch;
  faSign = faSignInAlt;
  faChild = faChild;
  faPlus = faPlus;
  
  currentUser$: Observable<User>;

  validationErrors: string[] = [];

  usernameSearch: string;

  model: any = {};

  loggedIn: boolean;

  user: any = {};

  constructor(public accountService: AccountService, 
            public route: ActivatedRoute ,private router: Router, 
            private toastr: ToastrService) { }

  ngOnInit(): void {
    this.setCurrentUser();
  }



  login(){
    this.accountService.login(this.model).subscribe(response => {

      this.toastr.show("Login succesfull!");

      return response;

    }, error => {
      this.toastr.error(error.error);
    });
  }
  
  clicked: boolean = false;

  Clicked() {
    this.clicked = true;
  }

  logout(){
    this.accountService.logout()
    this.router.navigate(["/"])
    this.model.username = ''
    this.model.password = ''
    this.toastr.success('Logout Successfull')
  }

  setCurrentUser(){
    if(this.user != null){
      var user: User = JSON.parse(localStorage.getItem('user'));
      this.accountService.setCurrentUser(user);
    }
  }
  
  home(){
    var obj = JSON.parse(localStorage.getItem('user'));
    if(obj.username != null){
      this.router.navigate(['/']);
    }
  }

  myPhotos()
  { 
          var obj = JSON.parse(localStorage.getItem('user'));
          this.router.navigateByUrl('my_photos/' + obj.username);
  }

  photosByUser(username: string)
  { 
        if(username == "" || username == undefined){

            this.toastr.error('Type a username to search!');
            
        } else{

            this.router.navigateByUrl('photos/' + username.toLowerCase());
        }
          
  }

  uploadPhotos()
  { 
          var obj = JSON.parse(localStorage.getItem('user'));
          this.router.navigateByUrl('upload-photos/' + obj.username);
  }
  
}
