import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient,public accountService: AccountService ) { }

  registerMode = false;
  
  users: any = {};

  public images: any = [
      {path: '/assets/img/1.jpg'},
      {path: '/assets/img/2.jpg'},
      {path: '/assets/img/3.jpg'},
      {path: '/assets/img/4.jpg'},
      {path: '/assets/img/5.jpg'},
      {path: '/assets/img/6.jpg'},
  ];

  ngOnInit(): void {
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }
}
