import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Member } from '../_models/member';
import { AccountService } from '../_services/account.service';



@Component({
  selector: 'app-upload-photos',
  templateUrl: './upload-photos.component.html',
  styleUrls: ['./upload-photos.component.css']
})
export class UploadPhotosComponent implements OnInit {
  
  constructor(private http: HttpClient,private route: Router ,private router: ActivatedRoute, 
              private accountService: AccountService,private toastr: ToastrService) { }

  baseUrl = 'https://localhost:5001/api/';  

  selectedfile: File = null;

  member: Member;

  photo: object = {}


  ngOnInit(): void {
   
  }

  onFileSelected(event){
   
      this.selectedfile = event.target.files[0];
      
      console.log(this.selectedfile);      
  }


  onUpload(){

    this.accountService.getMember(this.router.snapshot.paramMap.get('username')).subscribe(member => {

        this.member = member;
      

        const formData = new FormData();
        formData.append("formFile",this.selectedfile);
        formData.append("fileName",this.selectedfile);

        this.http.post(this.baseUrl + 'users/upload/'+ member.username, formData).subscribe(photo => {
            
            //en caso de que devuelta falso muestro mensaje sino guardo
            if(this.checkHasFile(formData) == false){
              this.toastr.warning('Upload a photo , the field is empty');
            } else {
              photo = this.photo;
              //console.log(photo);
              this.toastr.success('Photo upload succesfull!');
             
            }
      
          
        });
    });
  }

  //Chequeo que se haya cargado una foto 
  checkHasFile(file) {

    let flag;
    for (var value of file.values()) {
      if((value.name == undefined)){
        flag = false;
      }else{
        flag = true;
      }
    }
    return flag;
  }

}
