import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorInterceptor } from '../_interceptors/error.interceptor';
import { AccountService } from '../_services/account.service';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  filePath: string;
  myForm: FormGroup;

  model: any = {};
  validationErrors: string[] = [];

  constructor(public accountService: AccountService, public router: Router
    , public toast: ToastrService, public formBuilder: FormBuilder) {

        this.myForm = this.formBuilder.group({
          img: [null],
          filename: ['']
        })
  }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe(response =>{
      this.router.navigate(['/']);
      this.toast.success('Welcome to photoApp!');
      this.cancel();
    }, error =>{

      for(let i = 0; i < error.length;i++){

        this.toast.error('Error(' + i + ')', error[i]);
      } 

    });
  }
 
  cancel(){
    this.cancelRegister.emit(false);
  }

  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];

    this.myForm.patchValue({
      img: file
    });

    this.myForm.get('img').updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

}
