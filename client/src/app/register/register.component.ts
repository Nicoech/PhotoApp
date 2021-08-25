import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorInterceptor } from '../_interceptors/error.interceptor';
import { AccountService } from '../_services/account.service';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { file } from 'jszip';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  filePath: string;
  myForm: FormGroup;

  selectedfile: File = null;
  
  model: any = {};
  validationErrors: string[] = [];

  photo: object = {}

  baseUrl = 'https://localhost:5001/api/';

  constructor(public accountService: AccountService, public router: Router
    , public toast: ToastrService, public formBuilder: FormBuilder,private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  register(){
    
    const formData = new FormData();
    formData.append("formFile", this.selectedfile);
    formData.append("fileName",this.selectedfile);
  

      if(this.checkHasFile(formData) == false){

          this.toast.warning('Upload a photo , the field is empty');
    
      } else {
          
        this.accountService.register(this.model).subscribe(response =>{

          this.http.post(this.baseUrl + 'users/upload/'+ this.model.username, formData).subscribe(photo => {
              
              photo = this.photo;
              this.router.navigate(['/']);
              this.toast.success('Welcome to photoApp!');
              this.cancel();

          });


        }, error =>{

            for(let i = 0; i < error.length;i++){

                this.toast.error('Error(' + i + ')', error[i]);
            } 

        });
    }

   
  }
  
    onFileSelected(event){
      
      this.selectedfile = event.target.files[0];
      
      const reader = new FileReader();
      reader.onload = () => {
        this.filePath = reader.result as string;
      }
      reader.readAsDataURL(this.selectedfile);
      
    }

  cancel(){
    this.cancelRegister.emit(false);
  }

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
